// Copyright 2011 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

#ifndef V8_GLOBAL_HANDLES_H_
#define V8_GLOBAL_HANDLES_H_

#include <type_traits>

#include "include/v8.h"
#include "include/v8-profiler.h"

#include "src/handles.h"
#include "src/list.h"
#include "src/utils.h"

namespace v8 {
namespace internal {

class HeapStats;
class RootVisitor;

#ifdef V8_5_DOT_7_PATCH
// Data structures for tracking object groups and implicit references.

// An object group is treated like a single JS object: if one of object in
// the group is alive, all objects in the same group are considered alive.
// An object group is used to simulate object relationship in a DOM tree.

// An implicit references group consists of two parts: a parent object and a
// list of children objects.  If the parent is alive, all the children are alive
// too.

struct ObjectGroup {
  explicit ObjectGroup(size_t length)
      : info(NULL), length(length) {
    DCHECK(length > 0);
    objects = new Object**[length];
  }
  ~ObjectGroup();

  v8::RetainedObjectInfo* info;
  Object*** objects;
  size_t length;
};


struct ImplicitRefGroup {
  ImplicitRefGroup(HeapObject** parent, size_t length)
      : parent(parent), length(length) {
    DCHECK(length > 0);
    children = new Object**[length];
  }
  ~ImplicitRefGroup();

  HeapObject** parent;
  Object*** children;
  size_t length;
};


// For internal bookkeeping.
struct ObjectGroupConnection {
  ObjectGroupConnection(UniqueId id, Object** object)
      : id(id), object(object) {}

  bool operator==(const ObjectGroupConnection& other) const {
    return id == other.id;
  }

  bool operator<(const ObjectGroupConnection& other) const {
    return id < other.id;
  }

  UniqueId id;
  Object** object;
};


struct ObjectGroupRetainerInfo {
  ObjectGroupRetainerInfo(UniqueId id, RetainedObjectInfo* info)
      : id(id), info(info) {}

  bool operator==(const ObjectGroupRetainerInfo& other) const {
    return id == other.id;
  }

  bool operator<(const ObjectGroupRetainerInfo& other) const {
    return id < other.id;
  }

  UniqueId id;
  RetainedObjectInfo* info;
};
#endif

// Structure for tracking global handles.
// A single list keeps all the allocated global handles.
// Destroyed handles stay in the list but is added to the free list.
// At GC the destroyed global handles are removed from the free list
// and deallocated.

enum WeaknessType {
  // Embedder gets a handle to the dying object.
  FINALIZER_WEAK,
  // In the following cases, the embedder gets the parameter they passed in
  // earlier, and 0 or 2 first embedder fields. Note that the internal
  // fields must contain aligned non-V8 pointers.  Getting pointers to V8
  // objects through this interface would be GC unsafe so in that case the
  // embedder gets a null pointer instead.
  PHANTOM_WEAK,
  PHANTOM_WEAK_2_EMBEDDER_FIELDS,
  // The handle is automatically reset by the garbage collector when
  // the object is no longer reachable.
  PHANTOM_WEAK_RESET_HANDLE
};

class GlobalHandles {
 public:
  ~GlobalHandles();

  // Creates a new global handle that is alive until Destroy is called.
  Handle<Object> Create(Object* value);

  template <typename T>
  Handle<T> Create(T* value) {
    static_assert(std::is_base_of<Object, T>::value, "static type violation");
    // The compiler should only pick this method if T is not Object.
    static_assert(!std::is_same<Object, T>::value, "compiler error");
    return Handle<T>::cast(Create(static_cast<Object*>(value)));
  }

  // Copy a global handle
  static Handle<Object> CopyGlobal(Object** location);
  static Isolate* IsolateFromLocation(Object** location);

  // Destroy a global handle.
  static void Destroy(Object** location);

  // Make the global handle weak and set the callback parameter for the
  // handle.  When the garbage collector recognizes that only weak global
  // handles point to an object the callback function is invoked (for each
  // handle) with the handle and corresponding parameter as arguments.  By
  // default the handle still contains a pointer to the object that is being
  // collected.  For this reason the object is not collected until the next
  // GC.  For a phantom weak handle the handle is cleared (set to a Smi)
  // before the callback is invoked, but the handle can still be identified
  // in the callback by using the location() of the handle.
  static void MakeWeak(Object** location, void* parameter,
                       WeakCallbackInfo<void>::Callback weak_callback,
                       v8::WeakCallbackType type);

  static void MakeWeak(Object*** location_addr);

  void RecordStats(HeapStats* stats);

  // Returns the current number of handles to global objects.
  int global_handles_count() const {
    return number_of_global_handles_;
  }

  size_t NumberOfPhantomHandleResets() {
    return number_of_phantom_handle_resets_;
  }

  void ResetNumberOfPhantomHandleResets() {
    number_of_phantom_handle_resets_ = 0;
  }

  size_t NumberOfNewSpaceNodes() { return new_space_nodes_.length(); }

  // Clear the weakness of a global handle.
  static void* ClearWeakness(Object** location);

  // Mark the reference to this object independent.
  static void MarkIndependent(Object** location);

  static bool IsIndependent(Object** location);

  // Tells whether global handle is near death.
  static bool IsNearDeath(Object** location);

  // Tells whether global handle is weak.
  static bool IsWeak(Object** location);

  // Process pending weak handles.
  // Returns the number of freed nodes.
  int PostGarbageCollectionProcessing(
      GarbageCollector collector, const v8::GCCallbackFlags gc_callback_flags);

  // Iterates over all strong handles.
  void IterateStrongRoots(RootVisitor* v);

  // Iterates over all handles.
  void IterateAllRoots(RootVisitor* v);

  void IterateAllNewSpaceRoots(RootVisitor* v);
  void IterateNewSpaceRoots(RootVisitor* v, size_t start, size_t end);

  // Iterates over all handles that have embedder-assigned class ID.
  void IterateAllRootsWithClassIds(v8::PersistentHandleVisitor* v);

  // Iterates over all handles in the new space that have embedder-assigned
  // class ID.
  void IterateAllRootsInNewSpaceWithClassIds(v8::PersistentHandleVisitor* v);

  // Iterate over all handles in the new space that are weak, unmodified
  // and have class IDs
  void IterateWeakRootsInNewSpaceWithClassIds(v8::PersistentHandleVisitor* v);

  // Iterates over all weak roots in heap.
  void IterateWeakRoots(RootVisitor* v);

  // Iterates over all weak roots in heap for all gc
  void IterateWeakRootsForAllGc(RootVisitor* v);

  // Find all weak handles satisfying the callback predicate, mark
  // them as pending.
  void IdentifyWeakHandles(WeakSlotCallback f);

  // NOTE: Five ...NewSpace... functions below are used during
  // scavenge collections and iterate over sets of handles that are
  // guaranteed to contain all handles holding new space objects (but
  // may also include old space objects).

  // Iterates over strong and dependent handles. See the note above.
  void IterateNewSpaceStrongAndDependentRoots(RootVisitor* v);

  // Iterates over strong and dependent handles. See the note above.
  // Also marks unmodified nodes in the same iteration.
  void IterateNewSpaceStrongAndDependentRootsAndIdentifyUnmodified(
      RootVisitor* v, size_t start, size_t end);

  // Finds weak independent or unmodified handles satisfying
  // the callback predicate and marks them as pending. See the note above.
  void MarkNewSpaceWeakUnmodifiedObjectsPending(
      WeakSlotCallbackWithHeap is_unscavenged);

  // Iterates over weak independent or unmodified handles.
  // See the note above.
  void IterateNewSpaceWeakUnmodifiedRoots(RootVisitor* v);

  // Identify unmodified objects that are in weak state and marks them
  // unmodified
  void IdentifyWeakUnmodifiedObjects(WeakSlotCallback is_unmodified);
#ifdef V8_5_DOT_7_PATCH
  // Iterate over objects in object groups that have at least one object
  // which requires visiting. The callback has to return true if objects
  // can be skipped and false otherwise.
  bool IterateObjectGroups(RootVisitor* v, WeakSlotCallbackWithHeap can_skip);

  // Add an object group.
  // Should be only used in GC callback function before a collection.
  // All groups are destroyed after a garbage collection.
  void AddObjectGroup(Object*** handles,
                      size_t length,
                      v8::RetainedObjectInfo* info);

  // Associates handle with the object group represented by id.
  // Should be only used in GC callback function before a collection.
  // All groups are destroyed after a garbage collection.
  void SetObjectGroupId(Object** handle, UniqueId id);

  // Set RetainedObjectInfo for an object group. Should not be called more than
  // once for a group. Should not be called for a group which contains no
  // handles.
  void SetRetainedObjectInfo(UniqueId id, RetainedObjectInfo* info);

  // Adds an implicit reference from a group to an object. Should be only used
  // in GC callback function before a collection. All implicit references are
  // destroyed after a mark-compact collection.
  void SetReferenceFromGroup(UniqueId id, Object** child);

  // Adds an implicit reference from a parent object to a child object. Should
  // be only used in GC callback function before a collection. All implicit
  // references are destroyed after a mark-compact collection.
  void SetReference(HeapObject** parent, Object** child);

  List<ObjectGroup*>* object_groups() {
    ComputeObjectGroupsAndImplicitReferences();
    return &object_groups_;
  }

  List<ImplicitRefGroup*>* implicit_ref_groups() {
    ComputeObjectGroupsAndImplicitReferences();
    return &implicit_ref_groups_;
  }

  // Remove bags, this should only happen after GC.
  void RemoveObjectGroups();
  void RemoveImplicitRefGroups();
#endif

  // Tear down the global handle structure.
  void TearDown();

  Isolate* isolate() { return isolate_; }

#ifdef DEBUG
  void PrintStats();
  void Print();
#endif  // DEBUG

 private:
  // Internal node structures.
  class Node;
  class NodeBlock;
  class NodeIterator;
  class PendingPhantomCallback;
  class PendingPhantomCallbacksSecondPassTask;

  explicit GlobalHandles(Isolate* isolate);
#ifdef V8_5_DOT_7_PATCH
  // Migrates data from the internal representation (object_group_connections_,
  // retainer_infos_ and implicit_ref_connections_) to the public and more
  // efficient representation (object_groups_ and implicit_ref_groups_).
  void ComputeObjectGroupsAndImplicitReferences();

  // v8::internal::List is inefficient even for small number of elements, if we
  // don't assign any initial capacity.
  static const int kObjectGroupConnectionsCapacity = 20;
#endif

  // Helpers for PostGarbageCollectionProcessing.
  static void InvokeSecondPassPhantomCallbacks(
      List<PendingPhantomCallback>* callbacks, Isolate* isolate);
  int PostScavengeProcessing(int initial_post_gc_processing_count);
  int PostMarkSweepProcessing(int initial_post_gc_processing_count);
  int DispatchPendingPhantomCallbacks(bool synchronous_second_pass);
  void UpdateListOfNewSpaceNodes();
  void ApplyPersistentHandleVisitor(v8::PersistentHandleVisitor* visitor,
                                    Node* node);

  Isolate* isolate_;

  // Field always containing the number of handles to global objects.
  int number_of_global_handles_;

  // List of all allocated node blocks.
  NodeBlock* first_block_;

  // List of node blocks with used nodes.
  NodeBlock* first_used_block_;

  // Free list of nodes.
  Node* first_free_;

  // Contains all nodes holding new space objects. Note: when the list
  // is accessed, some of the objects may have been promoted already.
  List<Node*> new_space_nodes_;

  int post_gc_processing_count_;

  size_t number_of_phantom_handle_resets_;
#ifdef V8_5_DOT_7_PATCH
  // Object groups and implicit references, public and more efficient
  // representation.
  List<ObjectGroup*> object_groups_;
  List<ImplicitRefGroup*> implicit_ref_groups_;

  // Object groups and implicit references, temporary representation while
  // constructing the groups.
  List<ObjectGroupConnection> object_group_connections_;
  List<ObjectGroupRetainerInfo> retainer_infos_;
  List<ObjectGroupConnection> implicit_ref_connections_;
#endif

  List<PendingPhantomCallback> pending_phantom_callbacks_;

  friend class Isolate;

  DISALLOW_COPY_AND_ASSIGN(GlobalHandles);
};


class GlobalHandles::PendingPhantomCallback {
 public:
  typedef v8::WeakCallbackInfo<void> Data;
  PendingPhantomCallback(
      Node* node, Data::Callback callback, void* parameter,
      void* embedder_fields[v8::kEmbedderFieldsInWeakCallback])
      : node_(node), callback_(callback), parameter_(parameter) {
    for (int i = 0; i < v8::kEmbedderFieldsInWeakCallback; ++i) {
      embedder_fields_[i] = embedder_fields[i];
    }
  }

  void Invoke(Isolate* isolate);

  Node* node() { return node_; }
  Data::Callback callback() { return callback_; }

 private:
  Node* node_;
  Data::Callback callback_;
  void* parameter_;
  void* embedder_fields_[v8::kEmbedderFieldsInWeakCallback];
};


class EternalHandles {
 public:
  enum SingletonHandle {
    DATE_CACHE_VERSION,

    NUMBER_OF_SINGLETON_HANDLES
  };

  EternalHandles();
  ~EternalHandles();

  int NumberOfHandles() { return size_; }

  // Create an EternalHandle, overwriting the index.
  void Create(Isolate* isolate, Object* object, int* index);

  // Grab the handle for an existing EternalHandle.
  inline Handle<Object> Get(int index) {
    return Handle<Object>(GetLocation(index));
  }

  // Grab the handle for an existing SingletonHandle.
  inline Handle<Object> GetSingleton(SingletonHandle singleton) {
    DCHECK(Exists(singleton));
    return Get(singleton_handles_[singleton]);
  }

  // Checks whether a SingletonHandle has been assigned.
  inline bool Exists(SingletonHandle singleton) {
    return singleton_handles_[singleton] != kInvalidIndex;
  }

  // Assign a SingletonHandle to an empty slot and returns the handle.
  Handle<Object> CreateSingleton(Isolate* isolate,
                                 Object* object,
                                 SingletonHandle singleton) {
    Create(isolate, object, &singleton_handles_[singleton]);
    return Get(singleton_handles_[singleton]);
  }

  // Iterates over all handles.
  void IterateAllRoots(RootVisitor* visitor);
  // Iterates over all handles which might be in new space.
  void IterateNewSpaceRoots(RootVisitor* visitor);
  // Rebuilds new space list.
  void PostGarbageCollectionProcessing(Heap* heap);

 private:
  static const int kInvalidIndex = -1;
  static const int kShift = 8;
  static const int kSize = 1 << kShift;
  static const int kMask = 0xff;

  // Gets the slot for an index
  inline Object** GetLocation(int index) {
    DCHECK(index >= 0 && index < size_);
    return &blocks_[index >> kShift][index & kMask];
  }

  int size_;
  List<Object**> blocks_;
  List<int> new_space_indices_;
  int singleton_handles_[NUMBER_OF_SINGLETON_HANDLES];

  DISALLOW_COPY_AND_ASSIGN(EternalHandles);
};


}  // namespace internal
}  // namespace v8

#endif  // V8_GLOBAL_HANDLES_H_

// Copyright 2017 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Flags: --allow-natives-syntax

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/compiler/regress-714483.js");
	}
}
function C1() { }
C1.prototype.f = function () { return 1; }

function C2() { }
C2.prototype.f = function () { throw 2; }

var o1 = new C1();
var o2 = new C2();

function foo(o) {
  return o.f();
}

foo(o1);
try { foo(o2); } catch(e) {}
foo(o1);
try { foo(o2); } catch(e) {}
%OptimizeFunctionOnNextCall(foo);
assertEquals(1, foo(o1));
assertThrows(() => foo(o2));

// Copyright 2015 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/es6/string-search.js");
	}
}
var pattern = {};
pattern[Symbol.search] = function(string) {
  return string.length;
};
// Check object coercible fails.
assertThrows(() => String.prototype.search.call(null, pattern),
             TypeError);
// Override is called.
assertEquals(5, "abcde".search(pattern));
// Non-callable override.
pattern[Symbol.search] = "dumdidum";
assertThrows(() => "abcde".search(pattern), TypeError);

assertEquals("[Symbol.search]", RegExp.prototype[Symbol.search].name);

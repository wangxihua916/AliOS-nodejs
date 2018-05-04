// Copyright 2015 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Flags: --allow-natives-syntax --function-context-specialization
// Flags: --turbo-filter=f

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/regress/regress-osr-context.js");
	}
}
(function() {
  "use strict";
  var a = 23;
  function f() {
    for (let i = 0; i < 5; ++i) {
      a--;  // Make sure {a} is non-immutable, hence context allocated.
      function g() { return i }  // Make sure block has a context.
      if (i == 2) %OptimizeOsr();
    }
    return a;
  }
  assertEquals(18, f());
})();

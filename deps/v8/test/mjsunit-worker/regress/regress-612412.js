// Copyright 2015 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Flags: --allow-natives-syntax

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/regress/regress-612412.js");
	}
}
function counter() { return {x: 0} || this }

var f = (function() {
  "use asm";
  return function g(c1, c2) {
    for (var x = 0 ; x < 10; ++x) {
      if (x == 5) %OptimizeOsr();
      c1();
    }
  }
})();

g = (function() { f((Array), counter()); });
g();

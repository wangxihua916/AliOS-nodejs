// Copyright 2015 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Flags: --allow-natives-syntax

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/compiler/deopt-tonumber-shift.js");
	}
}
var f = (function() {
  "use asm";
  function f(x, y) {
    return x << y;
  }
  return f;
})();

var counter = 0;

var deopt = { toString : function() {
  %DeoptimizeFunction(f);
  counter++;
  return "2";
} };

var o = { toString : function() {
  counter++;
  return "1";
} };

counter = 0;
assertEquals(4, f(deopt, o));
assertEquals(2, counter);

%OptimizeFunctionOnNextCall(f);
counter = 0;
assertEquals(4, f(o, deopt));
assertEquals(2, counter);

%OptimizeFunctionOnNextCall(f);
counter = 0;
assertEquals(8, f(deopt, deopt));
assertEquals(2, counter);

// Copyright 2016 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Flags: --allow-natives-syntax

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/regress/regress-5286.js");
	}
}
(function() {
  function foo(x, y) { return x % y; }

  assertEquals(0, foo(2, 2));
  assertEquals(0, foo(4, 4));
  %OptimizeFunctionOnNextCall(foo);
  assertEquals(-0, foo(-8, 8));
})();

(function() {
  function foo(x, y) { return x % y; }

  assertEquals(0, foo(1, 1));
  assertEquals(0, foo(2, 2));
  %OptimizeFunctionOnNextCall(foo);
  assertEquals(-0, foo(-3, 3));
})();

(function() {
  function foo(x, y) { return x % y; }

  assertEquals(0, foo(1, 1));
  assertEquals(0, foo(2, 2));
  %OptimizeFunctionOnNextCall(foo);
  assertEquals(-0, foo(-2147483648, -1));
})();

(function() {
  function foo(x, y) { return x % y; }

  assertEquals(0, foo(1, 1));
  assertEquals(0, foo(2, 2));
  %OptimizeFunctionOnNextCall(foo);
  assertEquals(-0, foo(-2147483648, -2147483648));
})();

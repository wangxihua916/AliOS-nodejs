// Copyright 2016 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Flags: --allow-natives-syntax

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/regress/regress-crbug-659915a.js");
	}
}
let x;
function f(a) {
  x += a;
}
function g(a) {
  f(a); return x;
}
function h(a) {
  x = a; return x;
}

function boom() { return g(1) }

assertEquals(1, h(1));
assertEquals(2, boom());
assertEquals(3, boom());
%OptimizeFunctionOnNextCall(boom);
assertEquals(4, boom());

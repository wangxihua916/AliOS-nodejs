// Copyright 2015 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Flags: --allow-natives-syntax

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/regress/regress-deopt-in-array-literal-spread.js");
	}
}
function f(a,b,c,d) { return [a, ...(%DeoptimizeNow(), [b,c]), d]; }

assertEquals([1,2,3,4], f(1,2,3,4));
assertEquals([1,2,3,4], f(1,2,3,4));
%OptimizeFunctionOnNextCall(f);
assertEquals([1,2,3,4], f(1,2,3,4));

// Copyright 2015 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Flags: --allow-natives-syntax

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/regress/regress-crbug-557807.js");
	}
}
function bar() { return { __proto__: this }; }
function foo(a) { a[0] = 0.3; }
foo(bar());
%OptimizeFunctionOnNextCall(foo);
foo(bar());

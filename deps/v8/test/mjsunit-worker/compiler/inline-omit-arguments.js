// Copyright 2016 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Flags: --allow-natives-syntax

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/compiler/inline-omit-arguments.js");
	}
}
var x = 42;
function bar(s, t, u, v) { return x + s; }
function foo(s, t) { return bar(s); }

%OptimizeFunctionOnNextCall(foo);
assertEquals(42 + 12, foo(12));

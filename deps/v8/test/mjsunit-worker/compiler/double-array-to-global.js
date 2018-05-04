// Copyright 2015 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Flags: --allow-natives-syntax

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/compiler/double-array-to-global.js");
	}
}
var a = [-0, 0];
var b;
function foo(a) {
  for (var i = 0; i < 2; ++i) {
    b = a[i];
  }
}
foo(a);
foo(a);
%OptimizeFunctionOnNextCall(foo);
foo(a);

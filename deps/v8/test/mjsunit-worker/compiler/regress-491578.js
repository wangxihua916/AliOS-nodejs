// Copyright 2015 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Flags: --allow-natives-syntax

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/compiler/regress-491578.js");
	}
}
function foo(x) {
  if (x === undefined) return;
  while (true) {
    while (1 || 2) { }
    f();
  }
}
%OptimizeFunctionOnNextCall(foo);
foo();

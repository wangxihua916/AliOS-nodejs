// Copyright 2017 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Flags: --allow-natives-syntax --verify-heap

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/regress/regress-crbug-723455.js");
	}
}
function f(a) {
  a.x = 0;
  a[0] = 0.1;
  a.x = {};
}

f(new Array(1));
f(new Array(1));
f(new Array());

%OptimizeFunctionOnNextCall(f);
f(new Array(1));

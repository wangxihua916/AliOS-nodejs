// Copyright 2016 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Flags: --allow-natives-syntax

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/regress/regress-crbug-624919.js");
	}
}
function f(a, b, c, d, e) {
  if (a && (b, c ? d() : e())) return 0;
}

f();
f();
%OptimizeFunctionOnNextCall(f);
f();

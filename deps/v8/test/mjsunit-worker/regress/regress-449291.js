// Copyright 2015 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Flags: --allow-natives-syntax

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/regress/regress-449291.js");
	}
}
a = {y:1.5};
a.y = 1093445778;
b = a.y;
c = {y:{}};

function f() {
  return {y: b};
}

f();
f();
%OptimizeFunctionOnNextCall(f);
assertEquals(f().y, 1093445778);

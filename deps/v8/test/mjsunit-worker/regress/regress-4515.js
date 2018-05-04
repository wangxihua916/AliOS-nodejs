// Copyright 2015 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Flags: --allow-natives-syntax --turbo-filter=f

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/regress/regress-4515.js");
	}
}
function f(array) {
  return array.length >>> 0;
}

var a = new Array();
a[4000000000] = "A";

assertEquals(4000000001, f(a));
assertEquals(4000000001, f(a));
%OptimizeFunctionOnNextCall(f);
assertEquals(4000000001, f(a));

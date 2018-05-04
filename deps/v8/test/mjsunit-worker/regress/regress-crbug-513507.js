// Copyright 2015 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Flags: --allow-natives-syntax

// The following triggers a GC in Context::AddToOSROptimizedCodeCache.
// Flags: --gc-interval=1234 --gc-global

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/regress/regress-crbug-513507.js");
	}
}
function makeFun() {
  function fun(osr_fuse) {
    for (var i = 0; i < 3; ++i) {
      if (i == osr_fuse) %OptimizeOsr();
    }
    for (var i = 3; i < 6; ++i) {
      if (i == osr_fuse) %OptimizeOsr();
    }
  }
  return fun;
}

makeFun()(7);  // Warm up.
makeFun()(4);  // Optimize once.
makeFun()(1);  // Optimize again.

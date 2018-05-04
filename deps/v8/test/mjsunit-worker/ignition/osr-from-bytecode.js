// Copyright 2016 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Flags: --allow-natives-syntax --no-stress-fullcodegen --ignition-osr

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/ignition/osr-from-bytecode.js");
	}
}
function f() {
  for (var i = 0; i < 10; i++) {
    if (i == 5) %OptimizeOsr();
  }
}
f();

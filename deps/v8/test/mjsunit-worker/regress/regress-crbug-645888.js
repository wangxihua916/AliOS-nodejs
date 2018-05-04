// Copyright 2016 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Flags: --allow-natives-syntax --no-stress-fullcodegen

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/regress/regress-crbug-645888.js");
	}
}
function f() {
  for (var i = 0; i < 3; ++i) {
    if (i == 1) {
      %OptimizeOsr();
      break;  // Trigger next loop.
    }
  }
  while (true) {
    throw "no loop, thank you";
  }
}
assertThrows(f);

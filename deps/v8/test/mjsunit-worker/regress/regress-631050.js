// Copyright 2016 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
//
// Flags: --gc-global --stress-runs=8

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/regress/regress-631050.js");
	}
}
function __f_3(x, expected) {
  var __v_3 = [];
  __v_3.length = x;
  __f_3(true, 1);
}

try {
  __f_3(2147483648, 2147483648);
} catch (e) {}

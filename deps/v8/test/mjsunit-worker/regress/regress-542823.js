// Copyright 2015 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/regress/regress-542823.js");
	}
}
__v_0 = 100000;
__v_1 = new Array();
for (var __v_2 = 0; __v_2 < __v_0; __v_2++) {
  __v_1[__v_2] = 0.5;
}
for (var __v_2 = 0; __v_2 < 10; __v_2++) {
  var __v_0 = __v_1 + 0.5;
}

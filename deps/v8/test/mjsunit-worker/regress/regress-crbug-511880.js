// Copyright 2015 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/regress/regress-crbug-511880.js");
	}
}
if (this.Worker) {
  var __v_8 =
    `var __v_9 = new Worker('postMessage(42)');
     onmessage = function(parentMsg) {
       __v_9.postMessage(parentMsg);
     };`;
  var __v_9 = new Worker(__v_8);
  __v_9.postMessage(9);
}

// Copyright 2017 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
//

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/regress/wasm/regress-712569.js");
	}
}
var v11 = {};
Object.defineProperty(v11.__proto__, 0, {
  get: function() {
  },
  set: function() {
    try {
      WebAssembly.instantiate();
      v11[0] = 0;
    } catch (e) {
      assertTrue(e instanceof RangeError);
    }
  }
});
v66 = new Array();
cv = v66; cv[0] = 0.1; cv[2] = 0.2;

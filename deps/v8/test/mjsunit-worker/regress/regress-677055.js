// Copyright 2016 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/regress/regress-677055.js");
	}
}
if (this.Intl) {
  v5 = new Intl.NumberFormat();
  v9 = new Intl.DateTimeFormat();
  v52 = v9["formatToParts"];
  var v55 = {};
  assertThrows(() => Reflect.apply(v52, v5, v55), TypeError);
}

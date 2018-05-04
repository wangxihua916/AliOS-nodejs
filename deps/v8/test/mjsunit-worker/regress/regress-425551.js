// Copyright 2014 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/regress/regress-425551.js");
	}
}
var array = new Int8Array(10);
array[/\u007d\u00fc\u0043/] = 1.499
assertEquals(1.499, array[/\u007d\u00fc\u0043/]);

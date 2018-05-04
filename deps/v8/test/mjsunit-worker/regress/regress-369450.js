// Copyright 2014 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Flags: --allow-natives-syntax --enable-slow-asserts

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/regress/regress-369450.js");
	}
}
var v = [1.3];
v.length = 0;

var json = JSON.stringify(v);
assertEquals("[]", json);

Array.prototype[0] = 5.5;
var arr = [].concat(v, [{}], [2.3]);
assertEquals([{}, 2.3], arr);

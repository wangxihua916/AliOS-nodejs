// Copyright 2014 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Flags: --allow-natives-syntax --track-field-types

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/regress/regress-365172-2.js");
	}
}
var b1 = {d: 1}; var b2 = {d: 2};
var f1 = {x: 1}; var f2 = {x: 2};
f1.b = b1;
f2.x = {};
b2.d = 4.2;
f2.b = b2;
%TryMigrateInstance(f1);

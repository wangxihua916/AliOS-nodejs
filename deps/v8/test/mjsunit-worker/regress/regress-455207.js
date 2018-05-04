"use strict"
// Copyright 2015 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/regress/regress-455207.js");
	}
}
"use strict";
var s = "";
for (var i = 16; i < 1085; i++) {
  s += ("var a" + i + " = " + i + ";");
}
s += "const x = 10;" +
    "assertEquals(10, x); x = 11; assertEquals(11, x)";
assertThrows(function() { eval(s); });

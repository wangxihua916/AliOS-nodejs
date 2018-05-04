// Copyright 2015 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Flags: --check-handle-count

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker//handle-count-ast.js");
	}
}
var ones = eval("[" + Array(12 * 1024).join("1,") + 1 + "]")

var sum = 0;
for (var i = 0; i < ones.length; i++) {
    sum += ones[i];
}

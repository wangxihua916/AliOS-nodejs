// Copyright 2014 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Flags: --allow-natives-syntax

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/regress/regress-437765.js");
	}
}
function foo(x, y) {
  return Math.floor(x / y);
}

function bar(x, y) {
  return foo(x + 1, y + 1);
}

function baz() {
  bar(64, 2);
}

baz();
baz();
%OptimizeFunctionOnNextCall(baz);
baz();

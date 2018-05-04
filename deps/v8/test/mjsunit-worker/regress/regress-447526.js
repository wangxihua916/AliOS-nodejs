// Copyright 2014 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Flags: --allow-natives-syntax

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/regress/regress-447526.js");
	}
}
function bar() {
  throw "done";
}

function foo() {
  var i;
  while (i) {
    while (i) {
}
    i++;
  }
  while (true) {
    bar();
  }
}


%OptimizeFunctionOnNextCall(foo);
assertThrows(foo);

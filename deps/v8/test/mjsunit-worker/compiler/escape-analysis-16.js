// Copyright 2017 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Flags: --allow-natives-syntax --no-turbo-loop-peeling --turbo-escape

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/compiler/escape-analysis-16.js");
	}
}
function foo(){
  var o = {a : 5}
  for (var i = 0; i < 100; ++i) {
    o.a = 5;
    o.a = 7;
  }
}

foo();
foo();
%OptimizeFunctionOnNextCall(foo)
foo();

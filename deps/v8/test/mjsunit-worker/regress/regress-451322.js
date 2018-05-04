// Copyright 2015 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Flags: --allow-natives-syntax

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/regress/regress-451322.js");
	}
}
var foo = 0;

function bar() {
  var baz = 0 - {};
  if (foo > 24) return baz * 0;
}

bar();
bar();
%OptimizeFunctionOnNextCall(bar);
bar();

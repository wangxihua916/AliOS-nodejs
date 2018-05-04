// Copyright 2017 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Flags: --allow-natives-syntax

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/regress/regress-6248.js");
	}
}
var sentinelObject = {};
var evaluatedArg = false;
class C extends Object {
  constructor() {
    try {
      super(evaluatedArg = true);
    } catch (e) {
      assertInstanceof(e, TypeError);
      return sentinelObject;
    }
  }
}
Object.setPrototypeOf(C, parseInt);
assertSame(sentinelObject, new C());
assertSame(sentinelObject, new C());
%OptimizeFunctionOnNextCall(C)
assertSame(sentinelObject, new C());
assertFalse(evaluatedArg);

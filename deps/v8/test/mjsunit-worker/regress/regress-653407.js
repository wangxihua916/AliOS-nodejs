// Copyright 2016 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Flags: --allow-natives-syntax --no-stress-fullcodegen

// This is to test if 'this' gets correctly initialized when inlining
// constructors in turbofan.

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/regress/regress-653407.js");
	}
}
class superClass {
  constructor () {}
}

class subClass extends superClass {
  constructor () {
    super();
  }
}

function f() {
 new subClass();
}

f(); // We need this to collect feedback, so that subClass gets inlined in f.
%OptimizeFunctionOnNextCall(f)
f();

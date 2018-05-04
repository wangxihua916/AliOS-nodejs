// Copyright 2016 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Flags: --allow-natives-syntax

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/compiler/regress-639210.js");
	}
}
var m = (function m() {
  "use asm"
  var i32 = new Int32Array(4);
  var f64 = new Float64Array(4);

  function init() {
    i32[0] = 1;
    f64[0] = 0.1;
  }

  function load(b) {
    return (b ? 0 : i32[0]) + i32[0];
  }

  function store(b) {
    if (b|0) {
    } else {
      f64[0] = 42;
    }
    return f64[0];
  }

  return { init : init, load : load, store : store };
})();

m.init();

%OptimizeFunctionOnNextCall(m.load);
assertEquals(2, m.load());

%OptimizeFunctionOnNextCall(m.store);
assertEquals(0.1, m.store(1));

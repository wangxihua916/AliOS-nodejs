// Copyright 2016 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Flags: --allow-natives-syntax --deopt-every-n-times=55

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/regress/regress-3650-1.js");
	}
}
function f(t) {
  var result = [];
  for (var i in t) {
    for (var j in t) {
      result.push(i + j + t[i] + t[j]);
      continue;
    }
  }
  return result.join('');
}

var t = {a: "1", b: "2"};
assertEquals("aa11ab12ba21bb22", f(t));
%OptimizeFunctionOnNextCall(f);
assertEquals("aa11ab12ba21bb22", f(t));

// Copyright 2015 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Flags: --allow-natives-syntax

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/es6/promise-thenable-proxy.js");
	}
}
function assertAsync(b, s) {
  if (!b) {
    %AbortJS(" FAILED!")
  }
}

var handler = {
  get: function(target, name) {
    if (name === 'then') {
      return (val) => Promise.prototype.then.call(target, val);
    }
  }
};

var target = new Promise(r => r(42));
var p = new Proxy(target, handler);
Promise.resolve(p).then((val) => assertAsync(val === 42));

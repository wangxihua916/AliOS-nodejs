// Copyright 2016 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Flags: --allow-natives-syntax

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/compiler/regress-607493.js");
	}
}
(function ForInTryCatchContrinueOsr() {
  var a = [1];

  function g() {
    for (var x in a) {
      try {
        for (var i = 0; i < 10; i++) { %OptimizeOsr(); }
        return;
      } catch(e) {
        continue;
      }
    }
  }

  g();
})();

(function ForInContinueNestedOsr() {
  var a = [1];

  function g() {
    for (var x in a) {
      if (x) {
        for (var i = 0; i < 10; i++) { %OptimizeOsr(); }
      }
      continue;
    }
  }

  g();
})();

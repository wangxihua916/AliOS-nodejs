// Copyright 2016 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Flags: --validate-asm --allow-natives-syntax

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/regress/regress-617529.js");
	}
}
function __f_71(stdlib, buffer) {
  "use asm";
  var __v_22 = new stdlib.Float64Array(buffer);
  function __f_26() {
    __v_22 = __v_22;
  }
  return {__f_26: __f_26};
}

__f_71(this);
assertFalse(%IsAsmWasmCode(__f_71));

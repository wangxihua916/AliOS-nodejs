// Copyright 2016 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Flags: --no-stress-fullcodegen

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/regress/regress-605470.js");
	}
}
function function_with_m_args(m) {
  var source = '(function f() { return; })(';
  for (var arg = 0; arg < m ; arg++) {
    if (arg != 0) source += ',';
    source += arg;
  }
  source += ')';
  return eval(source);
}

function_with_m_args(0x7FFF);

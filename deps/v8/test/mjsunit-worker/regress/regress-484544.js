// Copyright 2015 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
//
// Flags: --nouse-allocation-folding  --stress-compaction --predictable

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/regress/regress-484544.js");
	}
}
function f() {
  return [[], [], [[], [], []]];
}

for (var i=0; i<10000; i++) {
  f();
}

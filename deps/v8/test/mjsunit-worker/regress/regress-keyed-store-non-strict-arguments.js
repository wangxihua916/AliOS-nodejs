// Copyright 2014 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/regress/regress-keyed-store-non-strict-arguments.js");
	}
}
function args(arg) { return arguments; }
var a = args(false);

(function () {
  "use strict";
  a["const" + 0] = 0;
})();

(function () {
  "use strict";
  a[0] = 0;
})();

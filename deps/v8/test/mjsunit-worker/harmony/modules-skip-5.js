// Copyright 2017 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Flags: --allow-natives-syntax --harmony-dynamic-import

if (!isworker()) {
	for (var i = 0; i < ThreadWorkerCount; i++) {
	var worker = new ThreadWorker("test/mjsunit-worker/mjsunit.js","test/mjsunit-worker/harmony/modules-skip-5.js");
	}
}
var dynamic_life;

import * as static_life from 'modules-skip-1.js';
import * as relative_static_life from './modules-skip-1.js';
import('modules-skip-1.js').then(namespace => dynamic_life = namespace);

export { static_life };
export { relative_static_life };
export { dynamic_life };

// Copyright IBM Corp. 2014,2016. All Rights Reserved.
// Node module: loopback-example-offline-sync
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';

var GLOBAL_CONFIG = require('../../global-config');

module.exports = {
  remote: {
    url: GLOBAL_CONFIG.restApiUrl
  }
};

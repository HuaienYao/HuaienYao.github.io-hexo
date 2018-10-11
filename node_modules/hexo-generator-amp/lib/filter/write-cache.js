
'use strict';

var Promise          = require('bluebird');
var cache            = require('../cache.js');

//------------------------------------
// write cache file
//------------------------------------
module.exports.write_cache = function(result){
  if(result.tempData.isCacheUse)return Promise.resolve(result);
  return new Promise(function(resolve , reject){
    cache.saveCache_amp(result.post, result.data , result.config);
    
    // process.stdout.write('[hexo-generator-amp] Plugin is currently writing the cache now ...           \r');
    
    resolve( result );
  });
};
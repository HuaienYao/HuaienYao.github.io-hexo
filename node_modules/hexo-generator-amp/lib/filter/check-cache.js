
'use strict';

var Promise          = require('bluebird');
var pathFn           = require('path');
var assign           = require('object-assign');
var cache            = require('../cache.js');
var permalink        = require('../post_permalink.js');

//------------------------------------
// check the Cache file
//------------------------------------
module.exports.checkCache = function(result){
  return new Promise(function(resolve , reject){
    var cachedData = cache.getCache( result.post , result.config );
    // process.stdout.write('[hexo-generator-amp] Plugin is currently checking the cache now ...           \r');
    
    var ampPath = permalink( result.post , result.config );
    if(pathFn.extname(ampPath) == "" )ampPath = pathFn.join( ampPath , "index.html");
    
    if(cachedData){
      resolve(assign( result , {
        path    : ampPath ,
        data    : cachedData.xml ,
        tempData: assign( result.tempData , { isCacheUse : true } )
      }));
    }else{
      resolve(assign( result , {
        path    : ampPath  ,
        data    : result.post.content
      }));
    }
  });
};

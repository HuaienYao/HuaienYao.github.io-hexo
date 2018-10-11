
'use strict';
var fs             = require('hexo-fs');
var pathFn         = require('path');
var mkdirp         = require('mkdirp');
var assign         = require('object-assign');
var read_cacheData = null;


//---------------------------------------
// OptionExists & Getting cache file path
//---------------------------------------
function existsOption(hexoConfig){
  return hexoConfig.generator_amp && hexoConfig.generator_amp.cache;
}

function getCachePath(hexoConfig){
  return pathFn.join(process.env.PWD || process.cwd() , hexoConfig.generator_amp.cache);
}


//---------------------------------------
// Create a new cache data
//---------------------------------------
function getAddObj(inPath, inPostPath , inDate , inEyeCatchImage , inTitleImageForAmp, inEyeCatchImageProperty , inXml){
  var addObj;
  if(inXml){
    addObj = {
      "path"                  : inPostPath ,
      "date_amp"              : String(inDate) ,
      "xml"                   : inXml 
    }
  }else{
    addObj = {
      "path"                  : inPostPath ,
      "date_eyeCatch"         : String(inDate) ,
      "eyeCatchImage"         : inEyeCatchImage ,
      "titleImageForAmp"      : inTitleImageForAmp ,
      "eyeCatchImageProperty" : inEyeCatchImageProperty 
    }
  }
  return addObj;
}




//---------------------------------------
// Writing cache file
//---------------------------------------
function createCacheFile(inPath, hexoConfig, inPostPath , inDate , inEyeCatchImage , inTitleImageForAmp, inEyeCatchImageProperty , inXml , callback){
  
  var cacheData;
  var newObj = {
      "path"                  : "" ,
      "date_eyeCatch"         : "" ,
      "date_amp"              : "" ,
      "eyeCatchImage"         : "" ,
      "titleImageForAmp"      : "" ,
      "eyeCatchImageProperty" : "" ,
      "xml"                   : "" 
  };
  
  var addObj = getAddObj(inPath, inPostPath , inDate , inEyeCatchImage , inTitleImageForAmp, inEyeCatchImageProperty , inXml);
  
  if( !fs.existsSync(getCachePath(hexoConfig)) || hexoConfig.generator_amp.isCacheClear ){
    cacheData = {
      "hash": hexoConfig.generator_amp.hash ,
      "ampData":[
          assign(newObj,addObj)
      ]
    };
    hexoConfig.generator_amp.isCacheClear = false; 
  }else{
    var isAddedData = false;
    var cacheData   = fs.readFileSync(inPath);
    cacheData = JSON.parse(cacheData);
    for( var i=0; i<cacheData.ampData.length; i++){
      if( cacheData.ampData[i].path == inPostPath ){
        if( addObj.xml ){
          if( cacheData.ampData[i].date_amp != inDate ){
            cacheData.ampData[i] = assign(cacheData.ampData[i],addObj);
          }
        }else{
          if( cacheData.ampData[i].date_eyeCatch != inDate ){
            cacheData.ampData[i] = assign(cacheData.ampData[i],addObj);
          }
        }
        isAddedData = true;
        break;
      }
    }
    
    if(!isAddedData){
      cacheData.ampData.push( addObj );
    }
  }
  
  cacheData.hash = hexoConfig.generator_amp.hash
  
  mkdirp.sync( pathFn.dirname(inPath) );
  fs.writeFileSync(inPath , JSON.stringify(cacheData));
  read_cacheData = cacheData;
  
  // console.log("cached: "+inPostPath);
  
  newObj = null;
  addObj = null;
  
  if(callback)callback();
}



//---------------------------------------
// Getting cache data
//---------------------------------------
module.exports.getCache = function(post, hexoConfig){
  var result = null;
  
  if( existsOption(hexoConfig) && fs.existsSync(getCachePath(hexoConfig)) && !hexoConfig.generator_amp.isCacheUpdate ){
    if(!read_cacheData){
      // console.log("\u001b[31mrefreshed cache: \u001b[0m" + post.path);
      read_cacheData = fs.readFileSync( getCachePath(hexoConfig) );
      read_cacheData = JSON.parse(read_cacheData);
    }
    for( var i=0; i<read_cacheData.ampData.length; i++){
      if( read_cacheData.ampData[i].path == post.path ){
        if( read_cacheData.ampData[i].date_eyeCatch == String(post.updated._i) && read_cacheData.ampData[i].date_amp == String(post.updated._i) ){
          result = read_cacheData.ampData[i];
          // console.log("use cached: "+post.path);
          break;
        }
      }
    }
  }
  
  return result;
};


//---------------------------------------
// Getting cache hash
//---------------------------------------
module.exports.getCacheHash = function(hexoConfig){
  var result = null;
  if( existsOption(hexoConfig) && fs.existsSync(getCachePath(hexoConfig)) ){
    if(!read_cacheData){
      read_cacheData = fs.readFileSync( getCachePath(hexoConfig) );
      read_cacheData = JSON.parse(read_cacheData);
    }
    
    if(!read_cacheData.hash){
      return "";
    }else{
      return read_cacheData.hash;
    }
  }else{
    return "";
  }
};



//---------------------------------------
// Generation of Eyecatch image cache
//---------------------------------------
module.exports.saveCache_eyeCatchImg = function(post, hexoConfig , callback){
  if( existsOption(hexoConfig) ){
    // console.log(post.path);
    // console.log(post.updated._i);
    // console.log(" -> " + post.eyeCatchImage);
    // console.log(" -> " + post.titleImageForAmp);
    // console.log(" -> " + post.eyeCatchImageProperty);
  
    createCacheFile( getCachePath(hexoConfig), hexoConfig , post.path , post.updated._i , post.eyeCatchImage , post.titleImageForAmp , post.eyeCatchImageProperty , null , callback );
  }else{
    callback();
  }
};



//---------------------------------------
// Generation of AMP HTML cache
//---------------------------------------
module.exports.saveCache_amp = function(post, inXml , hexoConfig){
  if( existsOption(hexoConfig) ){
    // console.log(post.path);
    // console.log(post.updated._i);
    // console.log(" -> " + xml);
  
    createCacheFile( getCachePath(hexoConfig), hexoConfig , post.path , post.updated._i , null , null , null , inXml , null );
  }
};
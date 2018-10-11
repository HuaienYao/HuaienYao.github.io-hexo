
'use strict';
var fs        = require('fs');
var pathFn    = require('path');
var mkdirp    = require('mkdirp');
var lg        = require('./log.js');
var absolutePathReg = /^[a-zA-Z0-9]*?\:\/\//
var config;

function isHexoWorkingDir(){
  var themeDir = pathFn.join(process.env.PWD || process.cwd() , "themes")
  var flg = fs.existsSync(themeDir);
  return flg;
}

module.exports.initCopy = function(assetDirName, assetFiles){
  
  var hexoAssetPath = assetDirName;
  var hexoAssetPath_sampleDir = pathFn.join(assetDirName, "sample");
  if(!pathFn.isAbsolute(assetDirName)) {
    hexoAssetPath = pathFn.join(process.env.PWD || process.cwd() , assetDirName);
    hexoAssetPath_sampleDir = pathFn.join(process.env.PWD || process.cwd() , assetDirName , "sample");
  }
  if(!fs.existsSync(hexoAssetPath) && isHexoWorkingDir() ){
    //create dir
    mkdirp.sync( hexoAssetPath_sampleDir );
    lg.log("info", "hexo-generator-amp's template has been copied to the your project.",hexoAssetPath_sampleDir);
    
    for(var i=0; i< assetFiles.length; i++){
      if(!fs.existsSync( pathFn.join(hexoAssetPath_sampleDir , pathFn.basename(assetFiles[i])) )  && isHexoWorkingDir() ){
        mkdirp.sync( pathFn.dirname( pathFn.join(hexoAssetPath_sampleDir , pathFn.basename(assetFiles[i])) ));
        fs.createReadStream( pathFn.join(__dirname , assetFiles[i]) ).pipe(fs.createWriteStream( pathFn.join(hexoAssetPath_sampleDir , pathFn.basename(assetFiles[i])) ));
      }
    }
  }
  return true;
};

module.exports.copyAssets = function(assetDirName, distDirName ,copyFiles){
  var hexoAssetPath = pathFn.join(process.env.PWD || process.cwd() , assetDirName);
  if(fs.existsSync(hexoAssetPath)){
    //copy asset dir
    if( !fs.existsSync(pathFn.join(process.env.PWD || process.cwd() , "source" , distDirName))  && isHexoWorkingDir() )mkdirp.sync( pathFn.join(process.env.PWD || process.cwd() , "source" , distDirName) );
    for(var i=0; i< copyFiles.length; i++){
      if(fs.existsSync( pathFn.join(hexoAssetPath , copyFiles[i]) )  && isHexoWorkingDir() ){
        // fs.createReadStream( pathFn.join(hexoAssetPath , copyFiles[i]) ).pipe(fs.createWriteStream( pathFn.join(process.env.PWD || process.cwd() , "source" , distDirName , pathFn.basename(copyFiles[i])) ));
        mkdirp.sync( pathFn.dirname( pathFn.join(process.env.PWD || process.cwd() , "source" , distDirName , copyFiles[i])));
        fs.createReadStream( pathFn.join(hexoAssetPath , copyFiles[i]) ).pipe(fs.createWriteStream( pathFn.join(process.env.PWD || process.cwd() , "source" , distDirName , copyFiles[i]) ));
      }else if( absolutePathReg.test(copyFiles[i]) ){
        // External path
      }else{
        lg.log("error", "Not found the hexo-generator-amp's asset files. If you do not have the file please download the sample file from the following site. ( see: https://github.com/tea3/hexo-generator-amp/tree/master/template )", pathFn.join(hexoAssetPath , copyFiles[i]) );
        return false
      }
    }
    return true;
  }else{
    lg.log("error", "Not found the hexo-generator-amp's asset directory. dir: " + hexoAssetPath , "_config.yml" );
    return false;
  }
};

module.exports.setConfig = function(inConfig){
  config = inConfig;
  lg.setConfig(config);
};
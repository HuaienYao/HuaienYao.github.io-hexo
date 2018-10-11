
'use strict';
var fs              = require('fs');
var pathFn          = require('path');
var url             = require('url');
var http            = require('follow-redirects').http;
var https           = require('follow-redirects').https;
var imgSize         = require('image-size');
var lg              = require('./log.js');
var externalPathReg = /^(?:\/\/|[a-zA-Z0-9]*?\:\/\/)/;
var config;


module.exports.getSizeInfo = function(inImgsrc , data , callback){
  
  var imgWidth;
  var imgHeight;
  var imgDevPath = "";
  var imgsrc = inImgsrc;

  if(!externalPathReg.test(imgsrc)){
    // Local image
    if(imgsrc.indexOf(data.path) != -1){
      // console.log("画像パス判定(1): "+ "_posts/**/記事.mdと同階層化に画像がある");
      imgDevPath = pathFn.join(data.asset_dir , pathFn.basename(imgsrc) );
    }else{
      // console.log("画像パス判定(2): "+ "source/**/に画像がある");
      // Disable post_asset_folder option (see: https://hexo.io/docs/asset-folders.html)
      if(!config.post_asset_folder){
        imgDevPath = pathFn.join(process.env.PWD || process.cwd() , "source/" , imgsrc);
      }else{
        // Enable post_asset_folder option (see: https://hexo.io/docs/asset-folders.html)
        imgDevPath = pathFn.join(process.env.PWD || process.cwd() , "source/" , pathFn.join(pathFn.dirname(data.source) , pathFn.basename(data.source).replace( pathFn.extname(data.source) , "")) , imgsrc);
        imgsrc = pathFn.join( "/" , data.path , imgsrc );
      }
    }
    // console.log("  ファイルパス ->"+ imgDevPath );
    // console.log(" 入力値： " + imgsrc);
    // console.log(" 入力値data.path： " + data.path);
    // console.log(" 入力値data.asset_dir： " + data.asset_dir);
  }else{
    // External image
    imgDevPath = imgsrc;
    if(/^\/\//.test(imgDevPath)){
      imgDevPath = 'http:' + imgDevPath;
    }
  }
  
  
  if(!externalPathReg.test(imgsrc)){
    // Local image
    if(fs.existsSync(imgDevPath)){
      var ims = imgSize( imgDevPath );
      imgWidth  = ims.width;
      imgHeight = ims.height;
      callback( {"w":imgWidth, "h":imgHeight , "src": imgsrc} );
    }else{
      lg.log("error", "no such file or directory. img path: "+imgDevPath , data.source);
      callback( null );
    }
  }else{
    // external image
    var options = url.parse(imgDevPath);
    if(imgDevPath.match(/^https\:/)){
      var req_https = https.get(options, function (response) {
        var chunks = [];
        response.on('data', function (chunk) {
          chunks.push(chunk);
        }).on('end', function() {
          getExternalImageSize( chunks, callback , lg , imgDevPath , imgsrc , data );
          // chunks = null;
        });
      });
      
      req_https.on('error', function(e) {
        lg.log("error", e + "\nThis plugin checks whether the image URL exists. \nimg path: "+imgDevPath , data.source);
        callback( null );
      });
    }else if(imgDevPath.match(/^http\:/)){
      var req_http = http.get(options, function (response) {
        var chunks = [];
        response.on('data', function (chunk) {
          chunks.push(chunk);
        }).on('end', function() {
          getExternalImageSize( chunks, callback , lg , imgDevPath , imgsrc , data );
          // chunks = null;
        });
      });
      
      req_http.on('error', function(e) {
        lg.log("error", e + "\nThis plugin checks whether the image URL exists. \nimg path: "+imgDevPath , data.source);
        callback( null );
      });
    }else{
      lg.log("error", "This plugin can not acquire the width and height of such url images. Please change the URL to HTTP or HTTPS, or add height and width. \nimg path: "+imgDevPath , data.source);
      callback( null );
    }
  }
};

module.exports.setConfig = function(inConfig){
  config = inConfig;
  lg.setConfig(config);
};

function getExternalImageSize( chunks, callback , inLg , imgDevPath , imgsrc , post ){
  var buffer = Buffer.concat(chunks);
  var ims;
  try{
    ims = imgSize(buffer);
    callback( {"w":ims.width, "h":ims.height , "src":imgsrc } );
  }catch(e){
    inLg.log("error", e + "\n This plugin gets width and height by accessing the external image. However, the plugin could not access the external image. Please confirm that the image URL is correct. Or, add the width and height to the post. : "+imgDevPath , post.source);
    callback( null );
  }
  // buffer = null;
}

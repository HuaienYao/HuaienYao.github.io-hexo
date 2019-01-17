
'use strict';

var Promise          = require('bluebird');
var assign           = require('object-assign');


//------------------------------------
// instagram to <amp-instagram> (1080 x 1080)
//------------------------------------
module.exports.filter_instagram = function(result){
  if(result.tempData.isCacheUse)return Promise.resolve(result);
  return new Promise(function(resolve , reject){
    
    var updateObj;
    var replaceStr = result.data;
    var isInstagramContain = result.tempData.isInstagramContain;
    
    var igMatch  = replaceStr.match(/\<blockquote\s.*?instagram\-media.*?(https\:\/\/www\.instagram\.com\/p\/[0-9a-zA-Z-_]+)\/.*?\<\/blockquote\>/g);
    if(igMatch){
      for(var i=0; i<igMatch.length; i++){
        var instagram_shortCode = igMatch[i].match(/https\:\/\/www\.instagram\.com\/p\/([0-9a-zA-Z-_]+)\//);
        if(instagram_shortCode && instagram_shortCode.length >= 2){
          replaceStr     = replaceStr.replace(igMatch[i],'<amp-instagram data-shortcode="' + instagram_shortCode[1] + '" width="1080" height="1080" layout="responsive"></amp-instagram>');
          isInstagramContain = true;
        }
      }
      
      /*
      updateObj = assign(
        result ,
        {
          post : assign(
            result.post ,
            {
              content : replaceStr
            }
          )
        } ,
        {
          tempData : assign(
            result.tempData ,
            {
              isInstagramContain : isInstagramContain
            }
          )
        }
      );
      */
      
      updateObj = assign(
        result ,
        {
          data : replaceStr
        } ,
        {
          tempData : assign(
            result.tempData ,
            {
              isInstagramContain : isInstagramContain
            }
          )
        }
      );
      
      // process.stdout.write('[hexo-generator-amp] Plugin is currently replacing instagram now ...           \r');
      
    }else{
      updateObj = result;
    }

    resolve( updateObj );
  });
};
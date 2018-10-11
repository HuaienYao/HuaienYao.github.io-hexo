
'use strict';

var Promise          = require('bluebird');
var assign           = require('object-assign');

//------------------------------------
// Valuecommerce to <amp-ad>
//------------------------------------
module.exports.filter_valuecommerce = function(result){
  if(result.tempData.isCacheUse)return Promise.resolve(result);
  return new Promise(function(resolve , reject){
    
    var replaceStr  = result.data;
    var config      = result.config;
    var isElseAdContain = false;
    
    
    replaceStr = replaceStr.replace(/<[^\s\>]*script[^\S\>]*language="javascript"[^\S\>]*src="\/\/ad\.jp\.ap\.valuecommerce\.com\/servlet\/jsbanner\?sid=([^"\\]*(?:\\.[^"\\]*)*)(&|\&amp\;)pid=([^"\\]*(?:\\.[^"\\]*)*)"\>\<\/script\>\<noscript\>.*?<\/noscript\>/g, function ($1, $2){
       
      var adWidth   = 336;
      var adHeight  = 280;
      var adLayout  = "responsive";
      var adClient  = "";
      var adSlot    = "";
      
      isElseAdContain = true;
            
      return "<amp-ad layout=\"" + adLayout + "\"" + ( adWidth ? " width=\"" + adWidth + "\"" : "" ) + ( adHeight ? " height=\"" + adHeight + "\"" : "") + " type=\"valuecommerce\" data-sid=\"" + arguments[1] + "\" data-pid=\"" + arguments[3] + "\"></amp-ad>";
    });
    
    var updateObj = assign(
      result ,
      {
        data : replaceStr
      } ,
      {
          tempData : assign(
            result.tempData ,
            {
              isElseAdContain : isElseAdContain
            }
          )
        }
    );
    
    resolve(result);
    
  });
};

'use strict';

var Promise          = require('bluebird');
var assign           = require('object-assign');

//------------------------------------
// google Adsense to <amp-ad>
//------------------------------------
module.exports.filter_googleAdsense = function(result){
  if(result.tempData.isCacheUse)return Promise.resolve(result);
  return new Promise(function(resolve , reject){
    
    var replaceStr  = result.data;
    var config      = result.config;
    
    
    replaceStr = replaceStr.replace(/\<[^\s\>]*ins[^\S\>]*class="adsbygoogle"[^\S\>]*style="([^"\\]*(?:\\.[^"\\]*)*)"[^\>]*data-ad-client="([^"\\]*(?:\\.[^"\\]*)*)"[^\>]*data-ad-slot="([^"\\]*(?:\\.[^"\\]*)*)"[^\<]*\<\/ins\>/g, function ($1, $2, $3){
    
      var adWidth   = 300;
      var adHeight  = 250;
      var adLayout  = "responsive";
      var adClient  = "";
      var adSlot    = "";
      
      if(config.generator_amp.substituteGoogle_adsense && ( config.generator_amp.substituteGoogle_adsense.width || config.generator_amp.substituteGoogle_adsense.height ) ){
        adWidth   = config.generator_amp.substituteGoogle_adsense.width || null;
        adHeight  = config.generator_amp.substituteGoogle_adsense.height || null;
      }
      if(config.generator_amp.substituteGoogle_adsense && config.generator_amp.substituteGoogle_adsense.layout){
        adLayout  = config.generator_amp.substituteGoogle_adsense.layout;
      }
      adClient  = arguments[2] || (( config.generator_amp.substituteGoogle_adsense && config.generator_amp.substituteGoogle_adsense.data_ad_client ) ? config.generator_amp.substituteGoogle_adsense.data_ad_client : "");
      adSlot    = arguments[3] || (( config.generator_amp.substituteGoogle_adsense && config.generator_amp.substituteGoogle_adsense.data_ad_slot ) ? config.generator_amp.substituteGoogle_adsense.data_ad_slot : "");

      if(adClient != "" && adSlot != ""){
        if(adLayout != "responsive"){
          return "<amp-ad layout=\"" + adLayout + "\"" + ( adWidth ? " width=\"" + adWidth + "\"" : "" ) + ( adHeight ? " height=\"" + adHeight + "\"" : "") + " type=\"adsense\" data-ad-client=\"" + adClient + "\" data-ad-slot=\"" + adSlot + "\"></amp-ad>";
        }else{
          return '<amp-ad width="100vw" height=320 type="adsense" data-ad-client="' + adClient + '" data-ad-slot="' + adSlot + '" data-auto-format="rspv" data-full-width><div overflow></div></amp-ad>';
        }
      }else{
        return '<!-- This Ad tag couldn\'t replace. -->'
      }
    });
    
    
    /*
    var updateObj = assign(
      result ,
      {
        post : assign(
          result.post ,
          {
            content : replaceStr
          }
        )
      }
    );
    */
    
    var updateObj = assign(
      result ,
      {
        data : replaceStr
      }
    );
    
    // process.stdout.write('[hexo-generator-amp] Plugin is currently replacing Google Ad ...           \r');
    
    resolve(result);
    
  });
};

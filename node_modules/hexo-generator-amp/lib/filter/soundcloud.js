
'use strict';

var Promise          = require('bluebird');
var assign           = require('object-assign');
var cheerio          = require('cheerio');

//------------------------------------
// soundcloud to <amp-soundcloud> (800 x 600)
//------------------------------------
module.exports.filter_soundcloud = function(result){
  if(result.tempData.isCacheUse)return Promise.resolve(result);
  return new Promise(function(resolve , reject){
    
    var updateObj;
    var replaceStr          = result.data;
    var isSoundCloudContain = result.tempData.isSoundCloudContain;
    var isIframeContain     = result.tempData.isIframeContain;
    var $ = cheerio.load(replaceStr);
    
    $("iframe").each(function(i){
      if($(this).attr('src') && $(this).attr('src').match(/^https\:\/\/w\.soundcloud\.com\/player\/\?url\=/) ){
        var url = decodeURIComponent($(this).attr("src"));
        
        if(url.match(/^https\:\/\/w\.soundcloud\.com\/player\/\?url\=\https\:\/\/api\.soundcloud\.com\/tracks\/[0-9]+?/)){
          var trackId = url.match(/^https\:\/\/w\.soundcloud\.com\/player\/\?url\=\https\:\/\/api\.soundcloud\.com\/tracks\/([0-9]+)/);
          trackId = trackId[1];
          
          var ampSoundCloud = cheerio.load("<amp-soundcloud></amp-soundcloud>");
          ampSoundCloud("amp-soundcloud").attr("height" , 450);
          ampSoundCloud("amp-soundcloud").attr("layout" , "fixed-height");
          ampSoundCloud("amp-soundcloud").attr("data-trackid" , trackId);
          ampSoundCloud("amp-soundcloud").attr("data-visual" , "true");
          $(this).replaceWith( ampSoundCloud.html() );
          
          isSoundCloudContain = true;
          
        }else{
          
          var ampIframe = cheerio.load("<amp-iframe></amp-iframe>");
          ampIframe("amp-iframe").attr("height" , 450);
          ampIframe("amp-iframe").attr("sandbox" , "allow-scripts allow-same-origin allow-popups");
          ampIframe("amp-iframe").attr("layout" , "fixed-height");
          ampIframe("amp-iframe").attr("frameborder" , 0);
          ampIframe("amp-iframe").attr("src" , url );
          
          var ampPlaceholder = cheerio.load("<amp-img></amp-img>");
          ampPlaceholder("amp-img").attr("layout","fill");
          ampPlaceholder("amp-img").attr("src", result.tempData.placeholder_template );
          ampPlaceholder("amp-img").attr("placeholder","");
          
          ampIframe("amp-iframe").append( ampPlaceholder.html() )
          $(this).replaceWith( ampIframe.html() );
          
          isIframeContain = true;
        }
        
      }
    });

    if(isSoundCloudContain || isIframeContain){
      replaceStr = $.html();

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
              isSoundCloudContain : isSoundCloudContain ,
              isIframeContain : isIframeContain
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
              isSoundCloudContain : isSoundCloudContain ,
              isIframeContain : isIframeContain
            }
          )
        }
      );
      
      // process.stdout.write('[hexo-generator-amp] Plugin is currently replacing soundcloud now ...           \r');
      
    }else{
      updateObj = result;
    }
    
    resolve( updateObj );
  });
};
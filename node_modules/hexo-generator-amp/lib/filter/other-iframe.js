
'use strict';

var Promise          = require('bluebird');
var assign           = require('object-assign');
var cheerio          = require('cheerio');

//------------------------------------
// other iframe
//------------------------------------
module.exports.filter_otherIframe = function(result){
  if(result.tempData.isCacheUse)return Promise.resolve(result);
  return new Promise(function(resolve , reject){
    
    var updateObj;
    var replaceStr          = result.data;
    var isIframeContain     = result.tempData.isIframeContain;
    var $ = cheerio.load(replaceStr);
    
    $("iframe").each(function(i){
      if($(this).attr('src') ){
        
        var url = $(this).attr("src");
        if(url.match(/^\/\//))url = "https:" + url;
        
        var ampIframeHeight = 600;
        if($(this).attr('height'))ampIframeHeight = $(this).attr('height');
        
        var ampIframe = cheerio.load("<amp-iframe></amp-iframe>");
        ampIframe("amp-iframe").attr("height" , ampIframeHeight);
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
    });

    if(isIframeContain){
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
              isIframeContain : isIframeContain
            }
          )
        }
      );
      
      // process.stdout.write('[hexo-generator-amp] Plugin is currently replacing iframe now ...           \r');
      
    }else{
      updateObj = result;
    }

    resolve( updateObj );
  });
};

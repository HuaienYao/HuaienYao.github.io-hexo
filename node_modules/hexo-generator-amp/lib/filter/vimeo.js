
'use strict';

var Promise          = require('bluebird');
var assign           = require('object-assign');
var cheerio          = require('cheerio');

//------------------------------------
// vimeo to <amp-vimeo> (1920 x 1080)
//------------------------------------
module.exports.filter_vimeo = function(result){
  if(result.tempData.isCacheUse)return Promise.resolve(result);
  return new Promise(function(resolve , reject){
    
    // fixed by JMPerez (https://github.com/JMPerez/hexo-generator-amp/commit/cd0f25cbf133d47fa6c289473822f24cb411b3b7?diff=split)
    var replaceStr      = result.data;
    var isVimeoContain  = result.tempData.isVimeoContain;
    
    var updateObj;
    var $ = cheerio.load(replaceStr);
    var vimeoRegex = /https:\/\/player\.vimeo\.com\/video\/(\d+)/i;
    $("iframe").each(function(i){
      var vimeoMatch = vimeoRegex.exec($(this).attr( "src" ));
      if (vimeoMatch) {
        var ampVideo = cheerio.load( "<amp-vimeo></amp-vimeo>" );
        ampVideo("amp-vimeo").attr("data-videoid", vimeoMatch[1]);
        ampVideo("amp-vimeo").attr("width", 1920);
        ampVideo("amp-vimeo").attr("height", 1080);
        ampVideo("amp-vimeo").attr( "layout" , "responsive" );
        
        $(this).replaceWith( ampVideo.html() );
        isVimeoContain = true;
        
      }
    });

    if(isVimeoContain){
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
              isVimeoContain : isVimeoContain
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
              isVimeoContain : isVimeoContain
            }
          )
        }
      );
      
      // process.stdout.write('[hexo-generator-amp] Plugin is currently replacing vimeo now ...           \r');
      
    }else{
      updateObj = result;
    }

    resolve( updateObj );
  });
};

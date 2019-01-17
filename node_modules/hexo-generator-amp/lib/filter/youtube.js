
'use strict';

var Promise          = require('bluebird');
var assign           = require('object-assign');
var cheerio          = require('cheerio');

//------------------------------------
// youtube to <amp-youtube> (1920 x 1080)
//------------------------------------
module.exports.filter_youtube = function(result){
  if(result.tempData.isCacheUse)return Promise.resolve(result);
  return new Promise(function(resolve , reject){
    
    // fixed by JMPerez (https://github.com/JMPerez/hexo-generator-amp/commit/cd0f25cbf133d47fa6c289473822f24cb411b3b7?diff=split)
    var replaceStr       = result.data;
    var isYoutubeContain = result.tempData.isYoutubeContain;
    
    var updateObj;
    var $ = cheerio.load(replaceStr);
    var youtubeRegex = /https:\/\/www\.youtube\.com\/embed\/([a-z0-9]+)/i;
    $("iframe").each(function(i){
      var youtubeMatch = youtubeRegex.exec($(this).attr( "src" ));
      if (youtubeMatch) {
        var ampYoutube = cheerio.load( "<amp-youtube></amp-youtube>" );
        ampYoutube("amp-youtube").attr("data-videoid", youtubeMatch[1]);
        ampYoutube("amp-youtube").attr("width", 1920);
        ampYoutube("amp-youtube").attr("height", 1080);
        ampYoutube("amp-youtube").attr( "layout" , "responsive" );
        
        $(this).replaceWith( ampYoutube.html() );
        isYoutubeContain = true;
        
      }
    });
    
    if(isYoutubeContain){
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
              isYoutubeContain : isYoutubeContain
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
              isYoutubeContain : isYoutubeContain
            }
          )
        }
      );
      
      // process.stdout.write('[hexo-generator-amp] Plugin is currently replacing youtube now ...           \r');
      
    }else{
      updateObj = result;
    }
    
    resolve( updateObj );
  });
};


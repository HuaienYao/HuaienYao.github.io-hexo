
'use strict';

var Promise          = require('bluebird');
var assign           = require('object-assign');
var cheerio          = require('cheerio');

//------------------------------------
// lazy load for youtube & vimeo
//------------------------------------
// This replacement corresponding to a special case.
//
// (e.g.) <div class="lazy-video" data-ampvideotype="youtube" data-ampvideoid="12345678">Lazy load for Youtube</div>
// (e.g.) <div class="lazy-video" data-ampvideotype="vimeo" data-ampvideoid="12345678">Lazy load for Vimeo</div>
module.exports.filter_lazyYoutubeAndVimeo = function(result){
  if(result.tempData.isCacheUse)return Promise.resolve(result);
  return new Promise(function(resolve , reject){
    
    var updateObj;
    var replaceStr       = result.data;
    var isVimeoContain   = result.tempData.isVimeoContain;
    var isYoutubeContain = result.tempData.isYoutubeContain;
    var $ = cheerio.load(replaceStr);

    $(".lazy-video").each(function(i){
      if($(this).attr("data-ampvideoid") && $(this).attr("data-ampvideotype")){
        if($(this).attr("data-ampvideotype") == "youtube"){
          $(this).replaceWith('<amp-youtube data-videoid="'+ $(this).attr("data-ampvideoid") +'" width="1920" height="1080" layout="responsive"></amp-youtube>');
          isYoutubeContain = true;
        }else if($(this).attr("data-ampvideotype") == "vimeo"){
          $(this).replaceWith('<amp-vimeo data-videoid="'+ $(this).attr("data-ampvideoid") +'" width="1920" height="1080" layout="responsive"></amp-vimeo>');
          isVimeoContain = true;
        }
      }
    });

    if(isVimeoContain || isYoutubeContain){
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
              isVimeoContain : isVimeoContain,
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
              isVimeoContain : isVimeoContain,
              isYoutubeContain : isYoutubeContain
            }
          )
        }
      );
      
      
      // process.stdout.write('[hexo-generator-amp] Plugin is currently replacing lazy video now ...           \r');
      
    }else{
      updateObj = result;
    }

    resolve( updateObj );
  });
};


'use strict';

var Promise          = require('bluebird');
var assign           = require('object-assign');
var cheerio          = require('cheerio');
var util             = require('../util.js');

//------------------------------------
// twitter to <amp-twitter> (800 x 600)
//------------------------------------
module.exports.filter_twitter = function(result){
  if(result.tempData.isCacheUse)return Promise.resolve(result);
  return new Promise(function(resolve , reject){
    
    var updateObj;
    var replaceStr       = result.data;
    var isTwitterContain = result.tempData.isTwitterContain;
    var $ = cheerio.load(replaceStr);
    
    $("blockquote.twitter-tweet").each(function(i){
      if($(this).children('a[href^=' + util.selectorEscape("https://twitter.com/") + ']')){
        var turl = $(this).children('a[href^=' + util.selectorEscape("https://twitter.com/") + ']').attr("href");
        var tid = turl.match(/https\:\/\/twitter\.com\/[a-zA-Z0-9_]+\/status\/([0-9]+)/i);
        tid = tid[1];
        $(this).replaceWith('<amp-twitter data-tweetid="'+ tid +'" width="800" height="600" layout="responsive"></amp-twitter>');
        isTwitterContain = true;
      }
    });

    if(isTwitterContain){
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
              isTwitterContain : isTwitterContain
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
              isTwitterContain : isTwitterContain
            }
          )
        }
      );
      
      // process.stdout.write('[hexo-generator-amp] Plugin is currently replacing twitter now ...           \r');
      
    }else{
      updateObj = result;
    }
    
    resolve( updateObj );
  });
};
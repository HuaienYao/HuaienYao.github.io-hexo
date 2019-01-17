
'use strict';

var Promise          = require('bluebird');
var assign           = require('object-assign');
var cheerio          = require('cheerio');
var lg               = require('../log.js');

//------------------------------------
// video to <amp-video>
//------------------------------------
module.exports.filter_video = function(result){
  if(result.tempData.isCacheUse)return Promise.resolve(result);
  
  lg.setConfig(result.config);
  
  return new Promise(function(resolve , reject){
    
    var updateObj;
    var replaceStr     = result.data;
    var $              = cheerio.load(replaceStr);
    var isVideoContain = false;
    
    $("video").each(function(i){
      
      // I check required attributes in <amp-video> .
      if( !$(this).attr( "width" ) || !$(this).attr("height") || !$(this).attr("poster") ){
        lg.log("warn", "<video> should contain width and height and poster attribute. " , result.post.source);
      }
      
      // createElement
      var ampVideo = cheerio.load( "<amp-video></amp-video>" );
      // copy attributes
      ampVideo("amp-video").attr( $(this).attr() );
      // move children
      ampVideo("amp-video").append( $(this).contents() );
      // (required attribute) set layout attribute
      ampVideo("amp-video").attr( "layout" , "responsive" );
      // (required attribute) set controls attribute
      if( !ampVideo("amp-video").attr( "autoplay" ) && !ampVideo("amp-video").attr( "controls" ) ){
        ampVideo("amp-video").attr( "controls" , "" );
      }
      
      // replace element
      $(this).replaceWith( ampVideo.html().replace(/\<br\>/g,"") );
      isVideoContain = true;
    });
    
    if(isVideoContain){
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
              isVideoContain : isVideoContain
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
              isVideoContain : isVideoContain
            }
          )
        }
      );
      
      // process.stdout.write('[hexo-generator-amp] Plugin is currently replacing <video> now ...           \r');
      
    }else{
      updateObj = result;
    }
    
    resolve( updateObj );
  });
};

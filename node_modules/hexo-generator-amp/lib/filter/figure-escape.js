
'use strict';

var Promise          = require('bluebird');
var assign           = require('object-assign');

//------------------------------------
// figure escape
//------------------------------------
module.exports.filter_figureEscape = function(result){
  if(result.tempData.isCacheUse)return Promise.resolve(result);
  return new Promise(function(resolve , reject){
    // figure tag
    var updateObj;
    var replaceStr   = result.data;
    var figureEscArr = [];
    var figureMatch  = replaceStr.match(/\<figure\s.*?\<\/figure\>/g);
    if(figureMatch){
      for(var i = 0; i < figureMatch.length; i++){
        replaceStr = replaceStr.replace(figureMatch[i],"<!--figure"+i+"-->");
        figureEscArr.push(figureMatch[i]);
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
              figureEscArr : figureEscArr
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
              figureEscArr : figureEscArr
            }
          )
        }
      );
      
      // process.stdout.write('[hexo-generator-amp] Plugin is currently escaping <figure> now ...           \r');
      
    }else{
      updateObj = result;
    }
    
    resolve( updateObj );
  });
};
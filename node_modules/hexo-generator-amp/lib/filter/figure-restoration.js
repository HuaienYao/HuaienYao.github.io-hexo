
'use strict';

var Promise          = require('bluebird');
var assign           = require('object-assign');


//------------------------------------
// figure restoration
//------------------------------------
module.exports.filter_figureRestoration = function(result){
  if(result.tempData.isCacheUse)return Promise.resolve(result);
  return new Promise(function(resolve , reject){
    
    var updateObj;
    var replaceStr   = result.data;
    var figureEscArr = result.tempData.figureEscArr;
    var figureMatch  = replaceStr.match(/\<\!\-\-figure[0-9]+\-\-\>/g);
    if(figureMatch){
      for(var i=0; i<figureMatch.length; i++){
        var figureID = figureMatch[i].match(/[0-9]+/);
        replaceStr = replaceStr.replace( figureMatch[i] , figureEscArr[Number(figureID[0])] );
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
        }
      );
      */
      
      updateObj = assign(
        result ,
        {
          data : replaceStr
        }
      );
      
      // process.stdout.write('[hexo-generator-amp] Plugin is currently restorating <figure> now ...           \r');
      
    }else{
      updateObj = result;
    }
    
    resolve(result);
  });
};

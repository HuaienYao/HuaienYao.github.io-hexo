
'use strict';

var Promise          = require('bluebird');
var assign           = require('object-assign');

//------------------------------------
// Sanitize tag
//------------------------------------
module.exports.filter_sanitize = function(result){
  if(result.tempData.isCacheUse)return Promise.resolve(result);
  return new Promise(function(resolve , reject){
    
    var replaceStr = result.data;
    var cssTxt     = result.tempData.cssTxt;
    var idDecorator= result.tempData.idDecorator;
    
    replaceStr = replaceStr.replace(/\<[\s]*style[^\<]*\<\/[\s]*style[\s]*\>/g, "");
    // replaceStr = replaceStr.replace(/\<[\s]*script[^\<]*\<\/[\s]*script[\s]*\>/g, "");
    replaceStr = replaceStr.replace(/\<[\s]*script[\s\S]*?\<\/[\s]*script[\s]*\>/g, "");

    // Remove style from tags (adding ids and promoting to css)
    replaceStr = replaceStr.replace(/\<\s*([^\s\>]+)((?:[^\>]*\bid[ \t]*="([^"\\]*(?:\\.[^"\\]*)*)"|[^\>]*)[^\>]*)style="([^"\\]*(?:\\.[^"\\]*)*)"((?:[^\>]*\bid[ \t]*="([^"\\]*(?:\\.[^"\\]*)*)"|[^\>]*)[^\>]*\>)/g, function ($1, $2, $3, $4, $5, $6){
      //$1 -> type
      //$2 -> content between type and style (aka id, class, etc.)
      //$3 -> id if on left side of style OR empty
      //$4 -> content of style (you can add this to id OR create a new id for this tag to add to)
      //$5 -> content to end the tag (aka id, class, etc.)
      //$6 -> id if on right side of style OR empty
      var id = (arguments[3] === "") ? arguments[6] : arguments[3];
      var newID = null;
      var idStyle = arguments[4].replace(/\!important/g, "");
      if(id && (typeof id != 'undefined') && id != "")
      {
        //console.log("Found an id");
        cssTxt += "#" + id + "{" + idStyle + "}";
      }else{
        //console.log("Generate a unique qualified id for the amp generator");
        newID = "hexo-amp-id-" + (++idDecorator);
        cssTxt += "#" + newID + "{" + idStyle + "}";
      }
      
      //console.log("Style: " + arguments[4]);
      return "<" + arguments[1] + (newID ? " id=\"" + newID + '"' : "") + " " + arguments[2] + " " + arguments[5];
    });

    //delete a tags that contain "javascript:""
    replaceStr = replaceStr.replace(/\<a\s*href\s*=\s*"javascript:[^\>]*\>/g, "");
    
    /*
    var updateObj = assign(
      result ,
      {
        post : assign(
          result.post ,
          {
            content    : replaceStr
          }
        )
      } ,
      {
        tempData : assign(
          result.tempData ,
          {
            cssTxt     : cssTxt ,
            idDecorator: idDecorator
          }
        )
      }
    );
    */
    
    var updateObj = assign(
      result ,
      {
        data : replaceStr
      } ,
      {
        tempData : assign(
          result.tempData ,
          {
            cssTxt     : cssTxt ,
            idDecorator: idDecorator
          }
        )
      }
    );
    
    // process.stdout.write('[hexo-generator-amp] Plugin is currently sanitizing tags now ...           \r');
    
    resolve( updateObj );
  });
};

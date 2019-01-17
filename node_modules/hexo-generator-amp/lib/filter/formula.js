
'use strict';

var Promise          = require('bluebird');
var assign           = require('object-assign');

//------------------------------------
// formula to <amp-mathml>
//------------------------------------
module.exports.filter_formula = function(result){
  if(result.tempData.isCacheUse)return Promise.resolve(result);
  return new Promise(function(resolve , reject){

    var updateObj;
    var replaceStr  = result.data;
    var config      = result.config;
    var isFormulaContain = result.tempData.isFormulaContain;
    
    // protect $ in code block
    replaceStr = replaceStr.replace(/<pre>.+?<\/pre>/g, function($1) {
        return arguments[0].replace(/\$/g, 'PROTECTED_DOLLAR')
    });
    // protect $ in case like title="$a$"
    replaceStr = replaceStr.replace(/=\".+?\"/g, function($1) {
        return arguments[0].replace(/\$/g, 'PROTECTED_DOLLAR')
    });
    
    // replace formula
    replaceStr = replaceStr.replace(/\$\$(.+?)\$\$/g, function ($1,$2){
      isFormulaContain = true;
      return '<amp-mathml layout="container" data-formula="\\[' + arguments[1] +'\\]"></amp-mathml>';
    });
    replaceStr = replaceStr.replace(/\$(.+?)\$/g, function ($1,$2){
      isFormulaContain = true;
      return '<amp-mathml layout="container" inline data-formula="\\[' + arguments[1] +'\\]"></amp-mathml>';
    });
    
    //recover the dollar in code block
    replaceStr = replaceStr.replace(/PROTECTED_DOLLAR/g, '$')
    
    if(isFormulaContain){
      updateObj = assign(
        result ,
        {
          data : replaceStr
        } ,
        {
          tempData : assign(
            result.tempData ,
            {
              isFormulaContain : isFormulaContain
            }
          )
        }
      );
    } else {
      updateObj = result;
    }
    
    resolve( updateObj );
    
    // process.stdout.write('[hexo-generator-amp] Plugin is currently replacing Formula ...           \r');
  });
};
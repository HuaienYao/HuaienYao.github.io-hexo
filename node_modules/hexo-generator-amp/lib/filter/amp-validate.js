
'use strict';

var Promise          = require('bluebird');
var pathFn           = require('path');
var assign           = require('object-assign');
var amphtmlValidator = require('amphtml-validator').getInstance();
var lg               = require('../log.js');
var util             = require('../util.js');
var validPassCnt     = 0;
var validErrorCnt    = 0;

//------------------------------------
// AMP HTML Validate
//------------------------------------
module.exports.amp_validate = function(result){
  if(result.tempData.isCacheUse)return Promise.resolve(result);
  
  lg.setConfig(result.config);
  
  return new Promise(function(resolve , reject){
    
    if(result.config.generator_amp.validateAMP){
      amphtmlValidator.then(function (validator) {
        var validate_result = validator.validateString(result.data);
        if( validate_result.status === 'PASS'){
          validPassCnt++;
          // process.stdout.write('[hexo-generator-amp] Plugin is currently AMP validating now ... '+validPassCnt+' pages newly PASSED \u001b[32m✓\u001b[0m .  \r');
        }else{
          validErrorCnt++;
          if(validErrorCnt == 1){
            lg.log("amp error", "\u001b[7;49;31mThe AMP Validator found error.\u001b[0m" + "\u001b[31m Please check the template files ( ./"+ result.config.generator_amp.templateDir +"/ ) , and the post's file.\u001b[0m \n");
            
            if(validate_result.errors.length > 0){
              console.log("\u001b[31m" + util.spacePadding(validate_result.errors.length, 3) + " AMP Validation Error" + (validate_result.errors.length == 1 ? "" : "s") + "\u001b[31m : " + result.post.path + "amp/#development=1 (source: "+ result.post.source +")\u001b[0m");
              console.log(" \n  \u001b[31mThe following is error message about AMP validation. \n  ----------------------------------------");
            }
            for (var ii = 0; ii < validate_result.errors.length; ii++) {
              var error = validate_result.errors[ii];
              var msg  = '';
              msg  += '   line ' + error.line + ', col ' + error.col + ': ' + error.message;
              if (error.specUrl !== null && error.specUrl != "") {
                msg += ' (see ' + error.specUrl + ')';
              }
              ((error.severity === 'ERROR') ? console.error : console.warn)(msg);
            }
            if(validate_result.errors.length > 0)
              console.log("  ----------------------------------------\u001b[0m\n");
          }else{
            if(validErrorCnt == 2){
              lg.log("amp error", "\u001b[7;49;31mThe AMP Validator found error.\u001b[0m \u001b[31mFor the other pages , check the error message displayed in Chrome Devtools . \u001b[0m\n");
            }
            console.log("\u001b[31m" + util.spacePadding(validate_result.errors.length, 3) + " AMP Validation Error" + (validate_result.errors.length == 1 ? " " : "s") + "\u001b[31m : " + result.post.path + "amp/#development=1 (source: "+ result.post.source +")\u001b[0m");
          }
          
          
          
        }
        resolve( result );
        
      });
    }else{
      
      resolve( result );
      
    }
    
  });
};
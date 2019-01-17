
'use strict';

var logu         = require('log-util');
var PLUGIN_LABEL = "[hexo-generator-amp]";
var config;

module.exports.log = function(cat,mes,path){
  
  var filePath = !(path=="" || !path) ? "\nPlease check the following file.\n-> " + path : "";
  if(cat == "success"){
    logu.debug(PLUGIN_LABEL +" "+ mes + filePath);
  }else if(cat == "info"){
    logu.info(PLUGIN_LABEL +" "+ mes + filePath);
  }else if(cat == "warn"){
    if(config.generator_amp.warningLog)logu.warn(PLUGIN_LABEL + " warning: " +" "+ mes + filePath);
  }else if(cat == "error"){
    logu.error(PLUGIN_LABEL + " error: " +" "+ mes + filePath);
  }else{
    console.log(PLUGIN_LABEL + mes + filePath);
  }
};

module.exports.setConfig = function(inConfig){
  config = inConfig;
};
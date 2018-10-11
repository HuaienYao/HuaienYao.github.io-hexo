
'use strict';

// jquery selector escape function
module.exports.selectorEscape = function(val){
  return val.replace(/[ !"#$%&'()*+,.\/:;<=>?@\[\\\]^`{|}~]/g, '\\$&');
};

// space padding
module.exports.spacePadding = function(inStr , inLen){
  var retStr = String(inStr);
  while(retStr.length < inLen){
    retStr = " " + retStr;
  }
  return retStr;
};
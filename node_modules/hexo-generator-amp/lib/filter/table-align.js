
'use strict';

var Promise          = require('bluebird');
var assign           = require('object-assign');
var cheerio          = require('cheerio');

//------------------------------------
// table's text align
//------------------------------------
module.exports.filter_tablesAlign = function(result){
  if(result.tempData.isCacheUse)return Promise.resolve(result);
  return new Promise(function(resolve , reject){
    
    var replaceStr  = result.data;
    replaceStr = replaceStr.replace(/\<td\sstyle\=\"text-align\:/g,'<td class="table-align-').replace(/\<th\sstyle\=\"text-align\:/g,'<th class="table-align-');
    
    var isTableContain = false;
    var $ = cheerio.load(replaceStr);
    $("table:not(figure table)").each(function(i){
      $(this).replaceWith( '<div class="table-wrapper"><table>' + $(this).html() + '</table></div>' );
      isTableContain = true;
    });
    
    if(isTableContain){
      replaceStr = $.html();
    }
    // replaceStr = replaceStr.replace(/\<td\sstyle\=\"text-align\:/g,'<td class="table-align-').replace(/\<th\sstyle\=\"text-align\:/g,'<th class="table-align-');
    
    /*
    var updateObj = assign(
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
    
    
    var updateObj = assign(
      result ,
      {
        data : replaceStr
      }
    );
    
    // process.stdout.write('[hexo-generator-amp] Plugin is currently replacing table align now ...           \r');
    
    resolve(result);
  });
};


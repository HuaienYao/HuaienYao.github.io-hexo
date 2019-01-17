var fs  = require("fs");
var ejs = require("ejs");
var pug = require("pug");

/**
 * Compiles the contents of a file
 * @param ampTmplPath {string}
 * @param templateDir {string}
 */
module.exports.compile = function (ampTmplPath, templateDir) {
  var extName = getExtName(ampTmplPath);
  var compilerMap = {
    ejs: function () { return ejs.compile(fs.readFileSync(ampTmplPath, 'utf8'), {filename: templateDir}) },
    pug: function () { return pug.compileFile(ampTmplPath, {filename: templateDir}) }
  };
  
  if(compilerMap[extName]) {
    return compilerMap[extName]();
  }
  throw new Error("The template " + extName + " is not supported. Please see the docs for more info.");
};

/**
 * return the extension name of the renderer
 * @param filename {string}
 * @returns ext name {string}
 */
function getExtName (filename) {
  return filename.match(/.([^.]*)$/)[1];
}

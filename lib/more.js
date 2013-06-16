/*
 #  ##############################
 #
 #    more.js
 #
 #  ##############################
 */

/*
 #  module dependencies
 */

var read = require('fs').readFileSync
  , fs = require('fs')
  , source = read('test.less', 'utf8')
  , _ = require('lodash')
  , less = require('less')
  , parser = new(less.Parser)({})
  , utils = require('./utils.js');

/*
#  printl - print line
*/

var getValues

/*
 #  printl - print line
 */

var printl = function(gen,s) {
  var t = options.t || '  '; // tab
  var n = options.n || '\n'; // newline
  var output = '';
  
  if(_(s).isEmpty){
    return false;
  }
  
  output = t.repeat(gen) + s + n;
  return output;
}

/*
 #  recursively build css
 */

var transform = function (obj,gen,options){

  var options = (typeof(options) === "undefined") ? {} : options;

  // declare defaults
  var gen = gen || 0; // generation

  var output = '';

  if(_(obj).isObject){
    // selectors
    if(_(obj).has('selectors')){
      var selectors = obj.selectors;
      _(selectors).each(function(selector){
        // elements
        if(_(selector).has('elements')) {
          console.log('ding');
          _(selector.elements).each(function(element){
            output += printl(gen-1, element.value);
          });
        }
      });
    }    
    // rules
    if(_(obj).has('rules')) {
      var rules = obj.rules;
      _(rules).each(function(rule){
        // comment
        if(_(rule).has('silent')){
          if(rule.silent){
            output += printl(gen, rule.value);
          }
        // props
        } else if(_(rule).has('name')){
          console.log(rule);
          output += printl(gen,rule.name + ' : ');
        // if rule has selectors and rules make a recursive call
        } else if(_(rule).has('selectors') && _(rule).has('rules')){
          output += transform(rule, gen+1);
        }
      });
    }
  }else if(_.isString(obj)){
    output += printl(gen, obj);
  }

  // return
  return output;
}

parser.parse(source, function(err, tree) {
  if (err) {
    return console.log(err);
  }
  //console.log(JSON.stringify(tree,null,2));
  fs.writeFile("./obj.json", JSON.stringify(tree,null,2), function(err) {
      if(err) {
          console.log(err);
      } else {
          console.log("The file was saved!");
      }
  }); 
  console.log(transform(tree));
});

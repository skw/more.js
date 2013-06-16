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
  , source = read('less/test.less', 'utf8')
  , _ = require('lodash')
  , less = require('less')
  , parser = new(less.Parser)({})
  , utils = require('utils.js');



/*
 #  recursively build css
 */

var transform = function (obj,gen,options){

  var options = (typeof(options) === "undefined") ? {} : options;

  // declare defaults
  var gen = gen || 0; // generation
  var t = options.t || '  '; // tab
  var n = options.n || '\n'; // newline
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
            output += t.repeat(gen-1)  + element.value + n;
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
            output += t.repeat(gen)  + rule.value + n;
          }
        // props
        } else if(_(rule).has('name')){
          console.log(rule);
          output += t.repeat(gen) + rule.name + ' : ' + n;
        // if rule has selectors and rules make a recursive call
        } else if(_(rule).has('selectors') && _(rule).has('rules')){
          output += transform(rule, gen+1);
        }
      });
    }
  }else if(_.isString(obj)){
    output += t.repeat(gen) + obj + n;
  }

  // return
  return output;
}

parser.parse(source, function(err, tree) {
  if (err) {
    return console.log(err);
  }
  console.log(JSON.stringify(tree,null,2));
  console.log(transform(tree));
});

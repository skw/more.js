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
  , utils = require('./utils.js')
  ;

/*
 #  default options
 */

var defaults = {
  t : '  ',
  s : ' ',
  n : '\n',
  comments : true
}

var options = (typeof(options) === "undefined") ? defaults : options;


/*
 #  printl - print line
 */

var printl = function(gen,str) {
  
  // declare defaults
  var t = options.t; // tab
  var n = options.n; // newline
  var str = str;
  var output = '';
  
  if(_.isEmpty(str)) {
    return new Error('Empty string');
  }
  
  output = t.repeat(gen) + str + n;
  return output;
}

/*
 #  val - returns variables and variables
 */

var val = function(obj) {
  var obj = obj;
  // array
  if(_(obj).has('value')) {
    if(_.isArray(obj.value)) {
      if(_(obj.value[0]).has('value')) {
        var value = obj.value[0].value;
        // check ifit's a variable and format
        if(_.isArray(value)) {
          if(_(value[0]).has('name')) {
            var variable = value[0].name;
            variable = variable.replace(/@/i, "").replace(/(.+)/,"var($1)");
            return variable;
          }
        // else ifit's a normal value
        } else {
          return value;
        }
      }  
    }
  }
  return new Error('No value(s) found');
}

/*
 #  recursively build css
 */

var transform = function (obj,gen) {

  // declare defaults
  var gen = gen || 0; // generation

  var output = '';

  if(_.isObject(obj)) {
    // selectors
    if(_(obj).has('selectors')) {
      var selectors = obj.selectors;
      _(selectors).each(function(selector) {
        // elements
        if(_(selector).has('elements')) {
          _(selector.elements).each(function(element) {
            output += printl(gen-1, element.value);
          });
        }
      });
    }    
    // rules
    if(_(obj).has('rules')) {
      var rules = obj.rules;
      _(rules).each (function(rule) {
        // comment
        if(_(rule).has('silent')){
          if(rule.silent) {
            output += printl(gen, rule.value);
          }
        // props
        } else if(_(rule).has('name')) {
          var value = ''
          if(_(rule).has('value')) {
            value = val(rule.value);
          }
          output += printl(gen,rule.name + ' : ' + value);
        // ifrule has selectors and rules make a recursive call
        } else if(_(rule).has('selectors') && _(rule).has('rules')){
          output += transform(rule, gen+1) + options.n;
        }

      });
    }
  }else if(_.isString(obj)) {
    output += printl(gen, obj);
  }

  return output;
}

parser.parse(source, function(err, tree) {
  if(err) {
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

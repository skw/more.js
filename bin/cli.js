#!/usr/bin/env node

/*
 #  ##############################
 #
 #    more.js CLI
 #
 #  ##############################
 */

"use strict";

/*
 #  module dependencies
 */

var pkg = require( '../package.json' ),
  _ = require( 'lodash' ),
  program = require( 'commander' ),
  handle = require( './handler' );
/*
 #  options
 */

program
  .version( pkg.version )
  .option( '-f, --format', 'set format, defaults to styl' )
  .option( '--styl', 'exports to styl (default)' )
  .option( '--stylus', 'exports to stylus' )
  .option( '-m, --merge', 'merge @includes' )
  .parse( process.argv );

var options = {};
options.whitespace = program.whitespace;
options.merge = program.merge;


// iterate over args and call file handler
_.each( program.args, function( arg ) {
  console.log('checking for ' + arg);
  handle( arg, function( err, res ) {
    if( err ) {
      return console.warn( err );
    }
    console.log( res );
  });
});
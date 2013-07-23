/*
 #  ##############################
 #
 #    more.js CLI - file handler
 #
 #  ##############################
 */

"use strict";

/*
 #  module dependencies
 */

var fs = require( 'fs' ),
  more = require( '../index.js' );

var handle  = function(arg, callback) {
  // check if arg exists
  fs.exists( arg, function ( exists ) {
    if ( exists ) {
      fs.stat( arg, function ( err, ring ) {

        // dir
        if ( ring.isDirectory() ){
          fs.readdirSync( arg ).map( function( child ) {
            handle( child, function( err, res ) {
              if( err ) {
                return console.warn( err );
              }
              console.log( res );
            });
          });

        // file
        } else if ( ring.isFile() ) {
          fs.readFile(arg, 'utf8', function ( err, data ) {
            if ( err ) { 
              throw err;
            }

            // use more to convert file
            more( data, function( err, res) {
              if( err ) {
                callback( err );
              }
              fs.writeFile( "./output.styl", res, function( err ) {
                 if( err ) {
                     callback( err );
                 } else {
                     callback( "The file was saved!" ); 
                 }
              });
            });            
          });  

        } else {
          console.warn( '"%s" type is not accepted', arg );
        }
      });
      console.log( 'YES');
    } else {
      console.warn( '"%s" does not exists', arg );
    }
  });
};

module.exports = handle;
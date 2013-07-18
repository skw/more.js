var read = require( 'fs' ).readFileSync,
  more = require( './more' ),
  _ = require( 'lodash' ),
  fs = require( 'fs' ),
  source = read( 'test.less', 'utf8' );
  
more( source, function( err, res) {
  if( err ) {
    return false;
  }
  fs.writeFile( "./obj.json", JSON.stringify( res, null, 2 ), function( err ) {
      if( err ) {
          console.log( err );
      } else {
          console.log( "The file was saved!" );
      }
  }); 
  console.log( res );
});
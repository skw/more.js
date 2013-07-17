# more.js (WiP)

more.js is a conversion tool for [less](http://lesscss.org) to other CSS languages, such as [Styl](https://github.com/visionmedia/styl), [Stylus](https://github.com/LearnBoost/stylus) et al. 

It does not parse LESS directly but utilizes the [less](http://lesscss.org) css parser to extract a JS object and build a css object.

## Features

[less](http://lesscss.org) to: 

- [Styl](https://github.com/visionmedia/styl)
- [Stylus](https://github.com/LearnBoost/stylus)

## Complete:

- selector conversion
- property conversion
- variable support

## To do:

- mixin support/conversion
- option support
- @import/includes
- cli

## Longterm

- sass/scss definitions 
- bi-directional conversion using sass/stylus parsers 

## more(1) usage 

  Usage: more [options] ( file.less || /dir )

## Author(s)

- skw ( [github](//github.com/skw), [twitter](//twitter.com/skw) )

## Contributing

Pull requests are welcome. 
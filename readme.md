# more.js (WiP)

more.js is a conversion tool for [less](http://lesscss.org) to other CSS languages, such as [Styl](https://github.com/visionmedia/styl), [Stylus](https://github.com/LearnBoost/stylus) et al. 

It does not parse *less* directly but utilizes the *less* css parser to extract a JS object and build a css object.

## Features

[less](http://lesscss.org) to: 

- [Styl](https://github.com/visionmedia/styl)
- [Stylus](https://github.com/LearnBoost/stylus)

## Features:

- selector conversion
- property conversion
- variable support

## Todos:

- mixin support/conversion
- option support
- @import/includes
- cli

## Longterm todos:

- sass/scss definitions 
- bi-directional conversion using sass/stylus parsers 

## more(1) usage 

Usage:
```
$ more [options] ( file.less || /dir )
```

## Author(s)

- skw ( [github](//github.com/skw), [twitter](//twitter.com/shaunkirkwong) )

## Contributing

Pull requests are welcome. 
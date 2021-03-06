## Install
`bower install ftc-icons`

If you specify `inludePaths: 'bower_components'` in `node-sass`, just import the `main.scss` file below:

    @import "ftc-icons/main.scss"

To view demos, run:

    gulp serve

## Usage

### Mixins

- `@mixin oIconsSassvg($icon-name, $color:null, $container-width: 20, $container-height: null, $apply-base-styles: true)`

A wrapper for mixins generated by `gulp-sassvg`. SVG files was turned into datauri and will be inserted into css file directly.

- `@mixin oIconsGetSvg($icon-name, $container-width: 20, $container-height: null, $apply-base-styles: true)`

Use invidual svg file as background with png fallback.

- `@mixin oIconsSvgSprite($icon-name, $color: null, $width: 20, $height:null)`

Set styles for `svg` referencing sprite fragment.


### Use SVG files directly

Minified SVG icons is under the folder `icons/svg`.

### Use PNG files directly

PNG files are generated from SVGs, put into `icons/png`.

### Use SVG sprite

You can use a sprited svg file `assets/sprites/ftc-icons-symbol.svg`. This file combines all the separate svg icons and put each in a `symbol` element, each having an `id` named after the individual svg file's name (without the `.svg` extension). In you HTML makrup, you can insert icons with id fragment:

	<svg>
		<use xlink:href="sprite/ftc-icons-symbol.svg#brand-ftc" />
	</svg>

### Preset colors if you are not using svg or png file directly
```
'brand-color': #ffcc99,
'social-wechat': #609700,
'social-weibo': #e6162d,
'social-linkedin': #0977b6,
'social-facebook': #3c5a99,
'social-twitter': #6aa9e0,
'rss': #FB9E3C,
```

## Gulp Commands

`gulp sassvg` will generate sass files named `_sassvg-data.scss` and `_sassvg.scss` under the folder `scss`. You can customize icons' fill color and background color.

`gulp svgsprite` put individual SVG into a `symbol` element and concatenate them into a single SVG file.

`gulp svgpng` produces minified svg and corresponding png files.

`gulp social` produces differnent social icons of different shapes in both svg and png format from a single svg file.

`gulp white` produces a white version of each icon.
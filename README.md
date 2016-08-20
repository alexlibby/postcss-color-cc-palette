<b>Note: This is still under active development!</b>

# Color CC Palette for PostCSS
A PostCSS plugin to create SASS-like color variables based on an Adobe Color CC palette URL.

The Adobe Color CC tool (at https://color.adobe.com) can be used to create palettes using a color wheel.

Once created, it can be made available via the Marketing Cloud - this is useful for designing graphics, but what about use in a style sheet? There isn't an easy way to export the values; this PostCSS plugin will take a Color CC URL and return SASS variables that represent the colors of your palette.

#Installation
Enter this command into a Node.js command prompt:
```
npm install postcss-color-cc-palette --save-dev
```

#Usage
The plugin can be referenced in Gulp using this example code:
```
Code to follow...
```

#Input
Add a rule to your code that contains the Color CC url, such as this example:
```
#url {
  content: "https://color.adobe.com/create/color-wheel/?copy=true&base=2&rule=Triad&selected=0&name=Copy%20of%20Taupe&mode=rgb&rgbvalues=0.5117647171020507,0.4559572206288501,0.359224226741925,0.5918253479903853,0.843137264251709,0.6988034991830846,0.8117647171020508,0.7529411911964586,0.6509804129600525,0.5373702727493649,0.42941746491123256,0.6117647171020508,0.4599704491887691,0.3848124625970275,0.5117647171020507&swatchOrder=0,1,2,3,4";
}
```

#To do:
- Add an option to override the color variable name

If you would like to see a feature added, please let me know via the Issues section; pull requests always welcome!

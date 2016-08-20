import postcss from 'postcss';
import test    from 'ava';

import plugin from './';

function run(t, input, output, opts = { }) {
    return postcss([ plugin(opts) ]).process(input)
        .then( result => {
            t.pass(result.css, output);
            t.deepEqual(result.warnings().length, 0);
        });
}

var url = 'https://color.adobe.com/create/color-wheel/?copy=true&' +
          'base=2&rule=Triad&selected=0&name=Copy%20of%20Taupe&mode=rgb&' +
          'rgbvalues=0.5117647171020507,0.4559572206288501,' +
          '0.359224226741925,0.5918253479903853,0.843137264251709,' +
          '0.6988034991830846,0.8117647171020508,0.7529411911964586,' +
          '0.6509804129600525,0.5373702727493649,0.42941746491123256,' +
          '0.6117647171020508,0.4599704491887691,0.3848124625970275,' +
          '0.5117647171020507&swatchOrder=0,1,2,3,4';

test('extract colors', t => {
    return run(t, '#url {' + url + '}', ':root {--color0: rgb(131, 116, 92);' +
    	' --color1: rgb(151, 215, 178); --color2: rgb(207, 192, 166);' +
    	' --color3: rgb(137, 110, 156); --color4: rgb(117, 98, 131);}', { });
});



var postcss = require('postcss');

// helper functions
function stripParam(value, stripVal) {
    return value.replace(stripVal + '=', '').trim().toUpperCase();
}

function chunk(arr, n) {
    return arr.slice(0, (arr.length + n - 1) / n).map(function (c, i) {
        return arr.slice(n * i, n * i + n);
    });
}

// functions to convert colors
function displayRGB(colorVal) {
    var arr = [];

    for (var v = 0; v < 3; v++) {
        colorVal[v] = Math.round(colorVal[v] * 255);
        arr.push(colorVal[v]);
    }

    return 'rgb(' + arr.join(', ') + ')';
}

function displayHEX(rgb) {
    var arr = [];

    for (var v = 0; v < 3; v++) {
        rgb[v] = Math.round(rgb[v] * 255);
        arr.push(rgb[v]);
    }

    return '#' + ('0' + parseInt(arr[0], 10).toString(16)).slice(-2) +
        ('0' + parseInt(arr[1], 10).toString(16)).slice(-2) +
        ('0' + parseInt(arr[2], 10).toString(16)).slice(-2);
}

var colors = [], colorMode, val = '--color';

module.exports = postcss.plugin('postcss-color-cc-palette', function () {
    return root => {
        root.walkDecls(function (decl) {
            var value = decl.value;

            if (value.indexOf('color-wheel') !== -1) {

                // time to split into values
                var proplist = value.split('&');
                for (var i = 0; i < proplist.length; i++) {

                    // parse for color mode
                    if (proplist[i].indexOf('mode') !== -1) {
                        colorMode = stripParam(proplist[i], 'mode');
                    }

                    // parse for RGB values
                    if (proplist[i].indexOf('rgbvalues') !== -1) {

                        // remove the 'rgbvalues=' text and
                        // extract values fro URL to array
                        var colorlist = proplist[i].replace('rgbvalues=', '');
                        var array = chunk(postcss.list.comma(colorlist), 3);

                        // calculate colors in appropriate format
                        for (var v = 0; v < 5; v++) {
                            if (colorMode === 'HEX') {
                                colors[v] = displayHEX(array[v]);
                            } else if (colorMode === 'RGB') {
                                colors[v] = displayRGB(array[v]);
                            }
                        }

                        // render chosen format of color on screen
                        root = decl.parent
                            .cloneBefore({ selector: ':root' }).removeAll();

                        for (var x = 0; x < 5; x++) {
                            root.append({ prop: val + x, value: colors[x] });
                        }

                        // remove original rule
                        var selectorID = rule.selector;
                        rule.remove();
                    }
                }
            }
        });
    };
});

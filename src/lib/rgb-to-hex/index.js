/**
 * Converts RGB value to the hexidecimal equivalent.
 */

/* eslint-disable no-bitwise */

/**
 * Given a hexidecimal string representing a color, returns the corresponding
 *      R, G, and B values as an object.
 * @param {string} hex Hexidecimal color value.
 * @return {{r: number, g: number, b: number}} Object with RGB values.
 */
const getRgbFromHex = (hex) => {
    let newHex = hex.replace(/^#/, '');

    if (newHex.length === 3) {
        newHex = newHex[0] + newHex[0] + newHex[1]
                 + newHex[1] + newHex[2] + newHex[2];
    }

    const bigInt = parseInt(newHex, 16);
    return {
        r: (bigInt >> 16) & 255,
        g: (bigInt >> 8) & 255,
        b: bigInt & 255,
    };
};

export default getRgbFromHex;

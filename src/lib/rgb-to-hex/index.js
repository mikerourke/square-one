/* @flow */

/* eslint-disable no-bitwise */

type Rgb = {
    r: number,
    g: number,
    b: number,
};

/**
 * Given a hexidecimal string representing a color, returns the corresponding
 *      R, G, and B values as an object.
 */
const getRgbFromHex = (hex: string): Rgb => {
    let newHex: string = hex.replace(/^#/, '');

    if (newHex.length === 3) {
        newHex = newHex[0] + newHex[0] + newHex[1] +
                 newHex[1] + newHex[2] + newHex[2];
    }

    const bigInt: number = parseInt(newHex, 16);
    return {
        r: (bigInt >> 16) & 255,
        g: (bigInt >> 8) & 255,
        b: bigInt & 255,
    };
};

export default getRgbFromHex;

// @flow
/* External dependencies */
import React from 'react';

/* eslint-disable max-len */

/**
 * Scalable graphic for official logo.
 */
const Logo = ({
    height = 100,
    width = 100,
}: {
    height?: number,
    width?: number,
}): React.Element<*> => (
    <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        height={`${height.toString()}px`}
        width={`${width.toString()}px`}
        viewBox="0 0 100 100"
    >
        <path
            id="bottomRight"
            fill="#9E9E9E"
            d="M96.875,56.25h-37.5c-1.729,0-3.125,1.396-3.125,3.125v37.5 c0,1.729,1.396,3.125,3.125,3.125h37.5c1.729,0,3.125-1.396,3.125-3.125v-37.5C100,57.646,98.604,56.25,96.875,56.25z"
        />
        <path
            id="topRight"
            fill="#9E9E9E"
            d="M96.875,0h-37.5c-1.729,0-3.125,1.4-3.125,3.125v37.5c0,1.728,1.396,3.125,3.125,3.125h37.5 c1.729,0,3.125-1.397,3.125-3.125v-37.5C100,1.4,98.604,0,96.875,0z"
        />
        <path
            id="topLeft"
            fill="#2196F3"
            d="M40.625,0h-37.5C1.4,0,0,1.4,0,3.125v37.5c0,1.728,1.4,3.125,3.125,3.125h37.5 c1.725,0,3.125-1.397,3.125-3.125v-37.5C43.75,1.4,42.35,0,40.625,0z"
        />
        <path
            id="bottomLeft"
            fill="#9E9E9E"
            d="M40.625,56.25h-37.5C1.4,56.25,0,57.646,0,59.375v37.5C0,98.604,1.4,100,3.125,100h37.5 c1.725,0,3.125-1.396,3.125-3.125v-37.5C43.75,57.646,42.35,56.25,40.625,56.25z"
        />
    </svg>
);

Logo.defaultProps = {
    height: 100,
    width: 100,
};

export default Logo;

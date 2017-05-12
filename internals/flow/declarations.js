/* @flow */

declare module './www/favicon.ico' {
  declare var exports: any;
}

declare type Host = string;
declare type Port = string | number;

// Used by Webpack for hot reloading:
declare var module: {
  hot: {
    accept: () => void;
  };
};

declare type MenuItem = {
  key: string,
  value: string,
  displayText: string,
}


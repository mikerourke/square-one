import depcheck from 'depcheck';
import fs from 'fs';
import path from 'path';

const options = {
    ignoreBinPackage: false,
    ignoreDirs: [
        'client',
    ],

    parsers: { // the target parsers
        '*.js': depcheck.parser.es6,
        '*.jsx': depcheck.parser.jsx,
    },

    detectors: [
        depcheck.detector.requireCallExpression,
        depcheck.detector.importDeclaration,
    ],

    specials: [
        depcheck.special.eslint,
        depcheck.special.webpack,
    ],
};

const rootPath = path.join(__dirname, '..');
depcheck(rootPath, options, (unused) => {
    const unusedItems =
    `{
        "dependencies": ${JSON.stringify(unused.dependencies)},
        "devDependencies": ${JSON.stringify(unused.devDependencies)},
        "missing": ${JSON.stringify(unused.missing)},
        "using": ${JSON.stringify(unused.using)},
        "invalidFiles": ${JSON.stringify(unused.invalidFiles)},
        "invalidDirs": ${JSON.stringify(unused.invalidDirs)}
      }`;
    fs.writeFileSync('tools/dependencies.json', unusedItems);
    console.log('Complete');
});

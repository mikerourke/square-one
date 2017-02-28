# Coding Styles

## JavaScript
### Basic
- Indent using 4 spaces.
- Add blank line at end of file.
- Use trailing commas for all mulitline items.

### File Structure
- Split external and internal dependencies with line break and comment headers:
```javascript
/* External dependencies */
import React from 'react';

/* Internal dependencies */
import configureStore from './state';
```

- For destructured `import` statements, if the quantity being imported is greater than 2, split into separate lines:
```javascript
import { foo, bar } from 'do-stuff';

import {
    foo,
    bar,
    baz,
} from 'do-other-stuff';
```
- Sorting `import` statements alphabetically by name is recommended but optional.

## React
### Basic
- Add JSDoc style comment headers to components (class and stateless) with `@param` tag for each prop.

### Component Structure
- Order the component in the following manner:
    1. Flow type declarations
    2. Static declarations
    3. Constructor
    4. Lifecycle methods
    5. Other methods
    6. Render method

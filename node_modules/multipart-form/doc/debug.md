# Debug

You can analyze output data with method:

## stringParts(encoding)

**encoding** - string:
  * 'utf8',
  * 'base64'
  * ...

Default - 'utf8'

```javascript
  const multipart = require('./multipart.js');
  const form1 = multipart()
    .boundary(boundary)
    .add(item)
    .add(item2);

  const data = form1();       //binary data
  const stringData = form1.stringParts(/*encoding*/);  //array with strings
  console.log({ stringData });
```
## bufferParts()

```javascript
const multipart = require('./multipart.js');
const form1 = multipart()
  .boundary(boundary)
  .add(item)
  .add(item2);

const data = form1();       //binary data
const bufferData = form1.bufferParts();   //object with buffers
console.log({ bufferData });
```

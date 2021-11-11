# methods

## boundary()

Use method boundary(boundary) to add boundary

**boundary** - string

```javascript
const form1 = multipart()
form1.boundary(boundary);
```

## add()

Use add(item) to add parts of content.

**item** - object with fields:
  * name        - string,        required
  * fileName    - string,        optional
  * contentType - string,        optional
  * data        - string/buffer, required

```javascript
const form1 = multipart()
form1.add(item);
```

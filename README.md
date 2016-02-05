# Easy XML

Highly configurable Object to XML converter for Node.

## Installation

```console
$ npm install easyxml
```

## Usage

```javascript
var EasyXml = require('easyxml');

var serializer = new EasyXml({
    singularizeChildren: true,
    allowAttributes: true,
    rootElement: 'response',
    dateFormat: 'ISO',
    indent: 2,
    manifest: true
});

var obj = {
    items: [{
        name: 'one',
        _id: 1
    }, {
        name: 'two',
        _id: 2
    }, {
        name: 'three',
        _id: 3
    }],
    blah: 'http://www.google.com',
    when: new Date(),
    boolz: true,
    nullz: null
};

console.log(serializer.render(obj));
```

This should output the following XML document:

```xml
<?xml version='1.0' encoding='utf-8'?>
<response>
  <items>
    <item id="1">
      <name>one</name>
    </item>
    <item id="2">
      <name>two</name>
    </item>
    <item id="3">
      <name>three</name>
    </item>
  </items>
  <blah>http://www.google.com</blah>
  <when>2012-09-25T18:47:39.485Z</when>
  <boolz>true</boolz>
  <nullz />
</response>
```

## Configuration

* `singularizeChildren`: If an array is plural, its children elements will be singular
* `allowAttributes`: String attributes starting with _ will be XML attributes
* `attributePrefix`: Prefix to look for when creating attributes
* `rootElement`: A string to wrap around the rendered XML document
* `rootArray`: If the root element is an array, this wraps the XML document. Should be plural
* `dateFormat`: A date format for JS dates, currently accepts ISO, SQL, JS
* `indent`: A number representing the spaces to indent children, use 0 for no whitespace
* `manifest`: Whether or not to add that XML manifest line to the top
* `unwrappedArrays`: TODO: Document
* `filterNulls`: Should nulls and undefines be removed from the rendered XML

## License

This project is dually licensed under the BSD-3-Clause / GPL-2.0 licenses.

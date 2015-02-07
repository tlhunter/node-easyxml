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

* `singularizeChildren`: If an array is plural, its children elements will be singular, default: `true`
* `allowAttributes`: String attributes starting with _ will be XML attributes, default: `true`
* `attributePrefix`: Prefix to look for when creating attributes, default: `_`
* `elementPrefix`: If present, element is created if property has this prefix or value is an object, otherwise attribute will be created, default: ``
* `rootElement`: A string to wrap around the rendered XML document, default: `response`
* `rootArray`: If the root element is an array, this wraps the XML document. Should be plural, default: `items`
* `dateFormat`: A date format for JS dates, currently accepts ISO, SQL, JS, default: `ISO`
* `indent`: A number representing the spaces to indent children, use 0 for no whitespace, default: `4`
* `manifest`: Whether or not to add that XML manifest line to the top, default: `false`
* `unwrappedArrays`: Do not render root element of the array (gitchildren names are not singularized), default: `false`
* `filterNulls`: Should nulls and undefines be removed from the rendered XML, default: `false`

## License

This project is licensed under a Dual BSD/GPL license.

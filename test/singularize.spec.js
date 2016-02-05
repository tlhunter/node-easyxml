'use strict';

var assert  = require('assert');
var fs = require('fs');
var EasyXml = require('../index.js');

describe("Singularize Children", function () {
  it("should parse a JSON object without singularizeChildren to XML", function() {
    var easyXML = new EasyXml({
      singularizeChildren: false,
      indent: 4
    });

    var before = {
      CmsUsers: [
        { user: "user1" },
        { user: "user2" }
      ]
    };

    var after = easyXML.render(before);

    var expected = fs.readFileSync('./test/fixtures/singularizeChildren.xml', 'utf8');

    assert.strictEqual(after, expected);
  });

  it("should parse a JSON object without singularizeChildren to XML (with object)", function() {
    var easyXML = new EasyXml({
      singularizeChildren: false,
      indent: 4
    });

    var before = {
      CmsUsers: [
        { user: { name: 'user1' } },
        { user: { name: 'user2' } }
      ]
    };

    var after = easyXML.render(before);

    var expected = fs.readFileSync('./test/fixtures/singularizeChildren2.xml', 'utf8');

    assert.strictEqual(after, expected);
  });

  it("should parse a JSON object with correct captalization", function() {
    var easyXML = new EasyXml({
      singularizeChildren: true,
      indent: 4
    });

    var before = {
      Users: [
        { name: "user1" },
        { name: "user2" }
      ]
    };

    var after = easyXML.render(before);

    var expected = fs.readFileSync('./test/fixtures/singularizeChildren3.xml', 'utf8');

    assert.strictEqual(after, expected);
  });

  it("should parse a JSON object and correctly nest child nodes", function() {
    var easyXML = new EasyXml({
      singularizeChildren: false,
      indent: 4
    });

    var before = {
      CmsUsers: [
        {
          user: {
            name: "user1",
            email: "user1@example.com"
          }
        },
        {
          user: {
            name: "user2",
            email: "user2@example.com"
          }
        }
      ]
    };

    var after = easyXML.render(before);

    var expected = fs.readFileSync('./test/fixtures/singularizeChildrenMultipleProperties.xml', 'utf8');

    assert.strictEqual(after, expected);
  });
});

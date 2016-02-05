'use strict';

var assert  = require('assert');
var fs = require('fs');
var EasyXml = require('../index.js');

describe("Node EasyXML", function () {
  var should = {
    names: "should parse a JSON object into XML",
    names1: "should parse a JSON object with attrs into XML",
    names2: "should parse a JSON object with attrs and text node into XML",
    singularizeChildren: "should parse a JSON object without singularizeChildren to XML",
    singularizeChildren2: "should parse a JSON object without singularizeChildren to XML (with object)",
    singularizeChildren3: "should parse a JSON object with correct captalization",
    singularizeChildrenMultipleProperties: "should parse a JSON object and correctly nest child nodes",
    complex: "testing a more complex XML object",
    unwrappedArrays: "should be able to use unwrapped child nodes to represent an array",
    wrappedArrays: "should normally wrap array elements in a single parent element",
    'null': "should parse a null value",
    rootArray1: "should work as expected when root is an array of objects",
    rootArray2: "should work as expected when root is an array of strings"
  };

  Object.keys(should).forEach(function(name) {
      it(should[name], function(done) {
        var config = {
          singularizeChildren: name !== 'singularizeChildren' && name !== 'singularizeChildren2' && name !== 'singularizeChildrenMultipleProperties',
          unwrappedArrays: name === 'unwrappedArrays'
        };

        var easyXML = new EasyXml(config);

        var file = __dirname + '/fixtures/' + name;

        fs.readFile(file + '.xml', 'UTF-8', function(err, data) {
          if (err) {
            throw err;
          }

          var json = require(file + '.json');

          assert.equal(easyXML.render(json), data, "EasyXML should create the correct XML from a JSON data structure.");
          assert.strictEqual(easyXML.render(json), data, "EasyXML should create the correct XML from a JSON data structure.");

          done();
        });
      });
    });

    var undefinedTests = {
        undefinedHandling: { 
            mochaDesc: "Handling undefined in arrays and as elements",
            config: {
                singularizeChildren: true,
                unwrappedArrays: false
            }
        },
        undefinedHandlingFiltered: { 
            mochaDesc: "Handling undefined in arrays and as elements",
            config: {
                singularizeChildren: true,
                unwrappedArrays: false,
                filterNulls: true
            }
        }
    };

    Object.keys(undefinedTests).forEach(function(name) {
      it(undefinedTests[name].mochaDesc, function(done) {
        var file = __dirname + '/fixtures/' + name;
        var json = {
            undef: undefined,
            undefObj: {
                undefSubKey: undefined
            },
            undefs: [
                undefined,
                null,
                'not-null'
            ],
            undef1s:[
                undefined,
                null
            ]
        };

        fs.readFile(file + '.xml', 'UTF-8', function (err, data) {
            if (err) {
                console.error(err);
                throw err;
            }

            var easyXML = new EasyXml(undefinedTests[name].config);
            assert.equal(easyXML.render(json), data, "EasyXML should create the correct XML from a JSON data structure.");
            assert.strictEqual(easyXML.render(json), data, "EasyXML should create the correct XML from a JSON data structure.");

            done();
        });
      });
    });

    /**
     * TODO: If this fails for you, let me know, might be a timezone issue
     */
    it("parses native Date objects", function() {
        var before = {
            date: new Date('December 17, 1995 03:24:00')
        };

        var easyXML = new EasyXml({
            indent: 0
        });

        var after = easyXML.render(before);

        assert.equal(after, "<response>\n<date>1995-12-17T11:24:00.000Z</date>\n</response>\n");
    });

    it("provides a SQL friendly date string", function() {
        var before = {
            date: new Date('December 17, 1995 03:24:00')
        };

        var easyXML = new EasyXml({
            dateFormat: 'SQL',
            indent: 0
        });

        var after = easyXML.render(before);

        assert.equal(after, "<response>\n<date>1995-12-17 03:24:00</date>\n</response>\n");
    });

    it("provides an ugly JS date string", function() {
        var before = {
            date: new Date('December 17, 1995 03:24:00')
        };

        var easyXML = new EasyXml({
            dateFormat: 'JS',
            indent: 0
        });

        var after = easyXML.render(before);

        assert.equal(after, "<response>\n<date>Sun Dec 17 1995 03:24:00 GMT-0800 (PST)</date>\n</response>\n");
    });

    it("allows root overriding at time of rendering", function() {
        var before = {
            'a': true
        };

        var easyXML = new EasyXml({
            rootElement: 'x',
            indent: 0
        });

        var after = easyXML.render(before, 'y');

        assert.equal(after, "<y>\n<a>true</a>\n</y>\n");
    });

    it("throws with bad attribute", function() {
        var before = {
            a: 1,
            _b: {}
        };

        var easyXML = new EasyXml();

        assert.throws(function() {
            easyXML.render(before);
        }, /non_string_attribute/);
    });

    it("throws with bad date format", function() {
        var before = {
            now: new Date()
        };

        var easyXML = new EasyXml({
            dateFormat: 'XYZ'
        });

        assert.throws(function() {
            easyXML.render(before);
        }, /unknown_date_format/);
    });

    it("should allow renaming the root element when root is an array", function() {
      var before = [
        {
          name: "spot"
        },
        {
          name: "rover"
        }
      ];

      var easyXML = new EasyXml({
        rootArray: 'dogs',
        indent: 0
      });

      var after = easyXML.render(before, 'Kennel');

      assert.equal(after, "<Kennel>\n<dog>\n<name>spot</name>\n</dog>\n<dog>\n<name>rover</name>\n</dog>\n</Kennel>\n");
    });
});

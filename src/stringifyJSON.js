// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:
// [1, 0, -1, -0.3, 0.3, 1343.32, 3345, 0.00011999999999999999]

var stringifyJSON = function(obj) {
  var results = '';

  var makeStrings = function(item) {
  // if obj
    if (typeof item !== 'function') {
      if (typeof item === 'object' && !Array.isArray(item) && item !== null) {
        var keys = Object.keys(item);
        var values = Object.values(item);
        if (keys.includes(undefined) || keys.includes('functions')) {
          results += '{}';
          return results;
        }
        results += '{';
        for (var k = 0; k < keys.length; k ++) {
          results += stringifyJSON(keys[k]);
          results += ':';
          results += stringifyJSON(values[k]);
          if (k < (keys.length - 1) && keys.length > 1) {
            results += ',';
          }
        }
        results += '}';
      }
      
      // if arr
      if (Array.isArray(item)) {
        results += '[';
        if (item.length > 0) {
          for (var i = 0; i < item.length; i++) {
            results += stringifyJSON(item[i]);
            if (i < (item.length - 1) && item.length > 1) {
              results += ',';
            }
          }
        }
        results += ']';
      }

      // if string
      if (typeof item === 'string') {
        results += '"' + item + '"';
      }

      // if boolean
      if (typeof item === 'boolean') {
        if (item) {
          results += 'true';
        }
        if (item.toString() === 'false') {
          results += 'false';      
        }
      }

      // if num
      if (typeof item === 'number') {
        results += item.toString();
      }
      if (item === null) {
        results += 'null';
      }
    }
  };
  makeStrings(obj);
  return results;
};

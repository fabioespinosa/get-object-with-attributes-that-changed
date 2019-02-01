const assert = require('assert').strict;
module.exports = (object1, object2) => {
    // If either object1 or object2 is object and other is array, throw eeror
    if (Array.isArray(object1) && !Array.isArray(object2)) {
        throw 'Comparing incompatible types';
    }
    if (Array.isArray(object2) && !Array.isArray(object1)) {
        throw 'Comparing incompatible types';
    }

    // If both are arrays it is ok, but we default to object
    let returned_object = {};
    if (Array.isArray(object1)) {
        returned_object = [];
    }

    // We will now compare each property, if it changed, we add it to returned_object

    for (const [key, val] of Object.entries(object2)) {
        const possible_old_value = object1[key];
        const possible_new_value = val;
        try {
            assert.deepStrictEqual(possible_old_value, possible_new_value);
        } catch (e) {
            if (Array.isArray(returned_object)) {
                returned_object.push(val);
            } else {
                returned_object[key] = val;
            }
        }
    }
    return returned_object;
};

module.exports(['DAQ', 'DT'], ['DAQ', 'DT', 'TCDS']);

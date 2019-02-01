module.exports = (object1, object2) => {
    const returned_object = {};
    for (const [key, val] of Object.entries(object2)) {
        if (object1[key] !== val) {
            // This means the property has changed:
            returned_object[key] = val;
        }
    }
    return returned_object;
};

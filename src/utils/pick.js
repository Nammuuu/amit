/**
 * Create an object composed of the picked object properties
 * @param {Object} object
 * @param {string[]} keys
 * @returns {Object}
 */
const pick = (object, keys) => {
  return keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      // eslint-disable-next-line no-param-reassign
      obj[key] = object[key];
    }
    obj.limit = obj.limit ? obj.limit : 10000;
    obj.page = obj.page ? obj.page : 1;
    // obj.order=obj.order?obj.order:"updatedAt";
    return obj;
  }, {});
};

module.exports = pick;

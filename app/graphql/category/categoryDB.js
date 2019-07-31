const {
  Datastore,
  insert,
  find,
  findOne,
  update,
  remove
} = require('../../services/db.js');
const categories = new Datastore();

exports.categoriesDB = categories;
exports.createCategory = args => insert(categories, args);
exports.updateCategory = (id, params) => update(categories, id, { $set: params });
exports.removeCategory = id => remove(categories, id);
exports.assignItemToCategory = (categoryId, itemId) => update(categories, categoryId, { $push: { items: itemId } });
exports.findCategoryById = id => findOne(categories, id);
exports.findCategoryByIds = async ids => find(categories, { _id: { $in: ids } });
exports.searchCategories = args => {
  if (args.name) args.name = new RegExp(args.name, 'i');
  return find(categories, args);
};

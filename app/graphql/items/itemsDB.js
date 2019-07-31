const {
  Datastore,
  insert,
  find,
  findOne,
  update,
  remove
} = require('../../services/db.js');
const items = new Datastore();

exports.itemsDB = items;
exports.createItem = args => insert(items, args);
exports.updateItem = (id, params) => update(items, id, { $set: params });
exports.removeItem = id => remove(items, id);
exports.findItemById = id => findOne(items, id);
exports.searchItems = args => {
  if (args.name) args.name = new RegExp(args.name, 'i');
  return find(items, args);
};

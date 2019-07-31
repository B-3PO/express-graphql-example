const {
  Datastore,
  insert,
  find,
  findOne,
  update,
  remove
} = require('../../services/db.js');
const menus = new Datastore();

exports.menuDB = menus;
exports.createMenu = args => insert(menus, args);
exports.updateMenu = (id, params) => update(menus, id, { $set: params });
exports.removeMenu = id => remove(menus, id);
exports.assignCateogryToMenu = (menuId, categoryId) => update(menus, menuId, { $push: { categories: categoryId } });
exports.findMenuById = id => findOne(menus, id);
exports.searchMenus = args => {
  if (args.name) args.name = new RegExp(args.name, 'i');
  return find(menus, args);
};

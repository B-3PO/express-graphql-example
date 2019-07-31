const {
  createMenu,
  updateMenu,
  removeMenu,
  assignCateogryToMenu,
  findMenuById,
  searchMenus
} = require('./menuDB.js');

const {
  findCategoryByIds
} = require('../category/categoryDB.js');

exports.resolver = {
  Query: {
    menu: (_, { id }) => findMenuById(id),
    menus: (_, args) => searchMenus(args)
  },

  Menu: {
    categories: root => findCategoryByIds(root.categories)
  },

  Mutation: {
    createMenu: (_, args) => createMenu(args),
    updateMenu: (_, { id, ...rest }) => updateMenu(id, rest),
    removeMenu: (_, { id }) => removeMenu(id),
    assignCateogry: (_, { menuId, categoryId }) => assignCateogryToMenu(menuId, categoryId)
  }
};

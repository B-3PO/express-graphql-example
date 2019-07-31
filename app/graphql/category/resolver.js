const {
  createCategory,
  updateCategory,
  removeCategory,
  assignItemToCategory,
  findCategoryById,
  searchCategories
} = require('./categoryDB.js');

const {
  findItemByIds
} = require('../items/itemsDB.js');

exports.resolver = {
  Query: {
    category: (_, { id }) => findCategoryById(id),
    categories: (_, args) => searchCategories(args)
  },

  Category: {
    items: root => findItemByIds(root.items)
  },

  Mutation: {
    createCategory: (_, args) => createCategory(args),
    updateCategory: (_, { id, ...rest }) => updateCategory(id, rest),
    removeCategory: (_, { id }) => removeCategory(id),
    assignItem: (_, { categoryId, itemId }) => assignItemToCategory(categoryId, itemId)
  }
};

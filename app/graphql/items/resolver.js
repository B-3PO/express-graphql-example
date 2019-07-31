const {
  createItem,
  updateItem,
  removeItem,
  findItemById,
  searchItems
} = require('./itemsDB.js');

exports.resolver = {
  Query: {
    item: (_, { id }) => findItemById(id),
    items: (_, args) => searchItems(args)
  },

  Mutation: {
    createItem: (_, args) => createItem(args),
    updateItem: (_, { id, ...rest }) => updateItem(id, rest),
    removeItem: (_, { id }) => removeItem(id),
  }
};

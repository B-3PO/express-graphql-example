const Datastore = require('nedb');
const uuid = require('uuid/v4');

exports.Datastore = Datastore;
exports.createUUID = uuid;

exports.insert = (db, params) => new Promise((resolve, reject) => {
  db.insert(params, (err, newDoc) => {
    if (err) return reject(err);
    transformId(newDoc);
    resolve(newDoc);
  });
});

exports.update = (db, id, params) => new Promise((resolve, reject) => {
  db.update({ _id: id }, params, (err, doc) => {
    if (err) return reject(err);
    db.findOne({ _id: id }, (err, doc) => {
      if (err) return reject(err);
      transformId(doc);
      console.log('update', doc);
      resolve(doc);
    });
  });
});

exports.remove = (db, id) => new Promise((resolve, reject) => {
  db.remove({ _id: id }, {}, err => {
    if (err) return reject(err);
    resolve();
  });
});


exports.findOne = (db, id) => new Promise((resolve, reject) => {
  db.findOne({ _id: id }, (err, doc) => {
    if (err) return reject(err);
    transformId(doc);
    console.log('findOne', doc);
    resolve(doc);
  });
});

exports.find = (db, { page, limit, orderBy, desc, ...rest}) => new Promise((resolve, reject) => {
  const f = db.find(rest);
  if (page !== undefined) f.skip((page - 1) * limit);
  if (limit !== undefined) f.limit(limit);
  if (orderBy !== undefined) f.sort({ [orderBy]: !desc ? -1 : 1 });
  f.exec((err, docs) => {
    if (err) return reject(err);
    docs.forEach(transformId);
    resolve(docs);
  });
});


function transformId(doc) {
  if (!doc) return;
  if (doc._id) {
    doc.id = doc._id;
    doc._id = undefined;
  }
}

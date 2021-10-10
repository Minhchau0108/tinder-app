const Relation = require("../models/Relation");

const relationService = {};

relationService.isRelationLike = async (requester, receiver) => {
  const filter = { requester: requester, receiver: receiver, like: true };
  const result = await Relation.findOne(filter);
  return !!result;
};

relationService.createOrUpdateLikeStatus = async (requester, receiver) => {
  const filter = { requester: requester, receiver: receiver };
  return Relation.findOneAndUpdate(
      filter,
      {$set: {like: true}},
      {upsert: true, new: true}
  );
};

relationService.createOrUpdatePassStatus = async (requester, receiver) => {
  const filter = { requester: requester, receiver: receiver };
  return Relation.findOneAndUpdate(
      filter,
      {$set: {like: false}},
      {upsert: true, new: true}
  );
};

module.exports = relationService;

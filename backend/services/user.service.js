const Relation = require("../models/Relation");
const User = require("../models/User");
const relationService = require("./relation.service");
const userService = {};

const LIKE = "like";
const MATCH = "match";

//one requester likes one receiver
userService.like = async (requester, receiver) => {
  await relationService.createOrUpdateLikeStatus(requester, receiver);
  const hasReversedLike = await relationService.isRelationLike(
    receiver,
    requester
  );

  return hasReversedLike ? MATCH : LIKE;
};

// one requester passes one receiver
userService.pass = (requester, receiver) =>
  relationService.createOrUpdatePassStatus(requester, receiver);

// Get list user, except current user, with pagination
userService.get = async (query, currentUserId) => {
  let { page = 1, limit = 10 } = query;
  page = +page;
  limit = +limit;
  const offset = limit * (page - 1);

  const total = await User.find({
    _id: { $ne: currentUserId },
  }).countDocuments();

  const totalPages = Math.ceil(total / limit);

  const users = await User.find({
    _id: { $ne: currentUserId },
  })
    .skip(offset)
    .limit(limit);

  return { users, totalPages };
};

// Get list liked users of current user
userService.getListLike = async (currentId) => {
  const filter = { requester: currentId, like: true };
  const receiverIDs = await Relation.find(filter).distinct("receiver");
  const users = await User.find({ _id: { $in: receiverIDs } });
  return users;
};

// Get list passed users of current user
userService.getListPass = async (currentId) => {
  const filter = { requester: currentId, like: false };
  const receiverIDs = await Relation.find(filter).distinct("receiver");
  const users = await User.find({ _id: { $in: receiverIDs } });
  return users;
};

// Get list matched users of current user
userService.getListMatch = async (currentId) => {
  const receiverIds = await Relation.find({
    requester: currentId,
    like: true,
  }).distinct("receiver");
  const requesterIds = await Relation.find({
    receiver: currentId,
    like: true,
  }).distinct("requester");
  const receivers = receiverIds.map((item) => item.toString());
  const requesters = requesterIds.map((item) => item.toString());

  const matchedIds = [];
  receivers.forEach((item) => {
    if (requesters.includes(item)) {
      matchedIds.push(item);
    }
  });

  return User.find({ _id: { $in: matchedIds } });
};

// Get user by ID
userService.getById = (userId) => User.findById(userId);

// To pick one user randomly as current user
userService.initCurrentUserId = async () => {
  const count = await User.find().countDocuments();
  const random = Math.floor(Math.random() * count);
  const user = await User.findOne().skip(random).lean();
  return user._id.toString();
};

module.exports = userService;

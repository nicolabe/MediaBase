import { MongoClient } from "https://deno.land/x/mongo@v0.9.1/mod.ts";
import { MediaSchema, MediaType } from "./interfaces/media.ts";

const client = new MongoClient();
client.connectWithUri("mongodb://localhost:27017");

const db = client.database("media_base");
const media = db.collection<MediaSchema>("media");

export const addMedia = async (data: any, category: MediaType.Book) =>
  await media.insertOne({
    ...data,
    category,
  });

export const getAllMedia = async (category: MediaType) =>
  await media.find({ title: { $ne: null }, category: { $eq: category } });

export const getMedia = async (mediaId: string) =>
  await media.findOne({ _id: { $oid: mediaId } });
// // insertMany
// const insertIds = await users.insertMany([
//   {
//     username: "user1",
//     password: "pass1",
//   },
//   {
//     username: "user2",
//     password: "pass2",
//   },
// ]);

// // findOne
// const user1 = await users.findOne({ _id: insertId });
// // Returns:
// // { _id: { $oid: "<oid>" }, username: "user1", password: "pass1" }

// // find
// const all_users = await users.find({ username: { $ne: null } });

// // find by ObjectId
// const user1_id = await users.findOne({ _id: { $oid: "<oid>" } });

// // count
// const count = await users.count({ username: { $ne: null } });

// // aggregation
// const docs = await users.aggregate([
//   { $match: { username: "many" } },
//   { $group: { _id: "$username", total: { $sum: 1 } } },
// ]);

// // updateOne
// let { matchedCount1, modifiedCount1, upsertedId1 } = await users.updateOne(
//   { username: { $ne: null } },
//   { $set: { username: "USERNAME" } }
// );

// // updateMany
// let { matchedCount, modifiedCount, upsertedId } = await users.updateMany(
//   { username: { $ne: null } },
//   { $set: { username: "USERNAME" } }
// );

// // deleteOne
// const deleteCount = await users.deleteOne({ _id: insertId });

// // deleteMany
// const deleteCount2 = await users.deleteMany({ username: "test" });

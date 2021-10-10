require("dotenv").config();

const faker = require("faker");
const Relation = require("../models/Relation");
const User = require("../models/User");
const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI;

console.log(`=== connecting to mongodb...`);
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`=== connected to mongodb ${MONGODB_URI}`))
  .catch((err) => console.log(err));

// Generate faker data for User and Relation collections.
// We will run this function in the first time we start this application locally.
module.exports.init = async () => {
  console.log(`=== start database initialization`);

  // Clean current collections if any
  await Relation.deleteMany({});
  await User.deleteMany({});

  const TOTAL_USER = 30;
  const TOTAL_RELATION = 10;
  const PICTURES = [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVvcGxlfGVufDB8MXwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGVvcGxlfGVufDB8MXwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8cGVvcGxlfGVufDB8MXwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cGVvcGxlfGVufDB8MXwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHBlb3BsZXxlbnwwfDF8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1492446845049-9c50cc313f00?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fHBlb3BsZXxlbnwwfDF8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHBlb3BsZXxlbnwwfDF8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1507114845806-0347f6150324?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHBlb3BsZXxlbnwwfDF8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVvcGxlfGVufDB8MXwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1504439904031-93ded9f93e4e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHBlb3BsZXxlbnwwfDF8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1481824429379-07aa5e5b0739?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjd8fHBlb3BsZXxlbnwwfDF8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1492288991661-058aa541ff43?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzJ8fHBlb3BsZXxlbnwwfDF8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzd8fHBlb3BsZXxlbnwwfDF8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1504051771394-dd2e66b2e08f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDR8fHBlb3BsZXxlbnwwfDF8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1548142813-c348350df52b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTR8fHBlb3BsZXxlbnwwfDF8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1542596768-5d1d21f1cf98?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjB8fHBlb3BsZXxlbnwwfDF8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjF8fHBlb3BsZXxlbnwwfDF8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzR8fHBlb3BsZXxlbnwwfDF8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1592621385612-4d7129426394?ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODJ8fHBlb3BsZXxlbnwwfDF8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  ];
  const GENDERS = ["male", "female", "other"];
  const TITLES = ["mr", "ms", "mrs", "miss", "dr", ""];

  const users = [];
  for (let i = 0; i < TOTAL_USER; i++) {
    const newUser = await User.create({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      picture: PICTURES[Math.floor(Math.random() * PICTURES.length)],
      dateOfBirth: faker.date.between("1980-01-01", "2000-01-01"),
      gender: GENDERS[Math.floor(Math.random() * GENDERS.length)],
      title: TITLES[Math.floor(Math.random() * TITLES.length)],
      phone: faker.phone.phoneNumber(),
    });
    console.log(`=== generated ${i + 1} user`);
    users.push(newUser);
  }

  for (let i = 0; i < TOTAL_RELATION; i++) {
    const requester = users[Math.floor(Math.random() * users.length)];
    const receivers = users.filter(
      (u) => u._id.toString() !== requester._id.toString()
    );
    const receiver = receivers[Math.floor(Math.random() * receivers.length)];

    try {
      await Relation.create({
        requester,
        receiver,
        like: faker.datatype.boolean(),
      });
      console.log(`=== generated ${i + 1} relation`);
    } catch (e) {
      console.log(`=== cannot create relation - ${e}`);
    }
  }

  console.log(`=== finished database initialization`);
  process.exit(0);
};

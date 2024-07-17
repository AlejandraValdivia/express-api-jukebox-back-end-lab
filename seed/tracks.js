const connectToDatabase = require('../connection')
const mongoose = require('mongoose');
const Track = require('../models/Track');

const seedTracks = async () => {
  try {
    // Connect to the database
    await connectToDatabase();

    // Clear the collection before seeding
    await Track.deleteMany({});

    // Seed data
    const tracks = [
      { title: "Don't Stop Believing", artist: "Glee Cast" },
      { title: "Shame", artist: "Evelyn 'Champagne' King" },
      { title: "As It Was", artist: "Harry Styles" },
      { title: "Wolf Down The Earth", artist: "Gojira" },
      { title: "Dancing On My Own", artist: "Robyn" },
      { title: "Butter", artist: "BTS" },
      { title: "Africa", artist: "Weezer" },
      { title: "Albuquerque", artist: "Weird Al Yankovic" },
      { title: "Can I Call You Rose", artist: "Thee Sacred Souls" },
      { title: "SpottieOttieDopaliscious", artist: "OutKast" },
      { title: "Dancing Queen", artist: "ABBA" },
      { title: "Texas Hold'em", artist: "Bey" }
    ];

    await Track.create(tracks);
    console.log("Tracks created!");

    const allTracks = await Track.find();
    console.log(allTracks);

    mongoose.connection.close(); // Close the connection after seeding
  } catch (err) {
    console.error("Error seeding data:", err);
  }
};

seedTracks();

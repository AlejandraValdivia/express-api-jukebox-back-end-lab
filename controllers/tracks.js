const express = require('express');
const router = express.Router();
const Track = require('../models/Track');

// Get all tracks
router.get('/', async (req, res) => {
  console.log('get route')
  try {
    const tracks = await Track.find();
    res.json(tracks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new track
router.post('/', async (req, res) => {
  const track = new Track({
    title: req.body.title,
    artist: req.body.artist,
  });

  try {
    const newTrack = await track.save();
    res.status(201).json(newTrack);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a track
router.put('/:id', async (req, res) => {
  try {
    const track = await Track.findById(req.params.id);
    if (!track) {
      return res.status(404).json({ message: 'Track not found' });
    }

    track.title = req.body.title;
    track.artist = req.body.artist;
    const updatedTrack = await track.save();
    res.json(updatedTrack);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a track
router.delete('/:id', async (req, res) => {
  try {
    const track = await Track.findByIdAndDelete(req.params.id);
    if (!track) {
      return res.status(404).json({ message: 'Track not found' });
    }
    res.json({ message: 'Track deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single track by ID
router.get('/:id', async (req, res) => {
  try {
    const track = await Track.findById(req.params.id);
    if (!track) {
      return res.status(404).json({ message: 'Track not found' });
    }
    res.json(track);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

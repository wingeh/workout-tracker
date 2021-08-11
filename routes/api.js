const router = require("express").Router();
const path = require("path");
const Workout = require('../models/workout.js');

// retrieve workouts
router.get('/api/workouts', (req, res) => {
  Workout.aggregate([
      {
          $addFields: {
              totalDuration: { $sum: "$exercises.duration" }
          },
      },
  ])
  .then(dbTransaction => {
      res.json(dbTransaction);
  })
  .catch(err => {
      res.status(400).json(err);
  })
});

// create workouts
router.post('/api/workouts', ({body},res) => {
  Workout.create(body)
      .then(dbTransaction => {
          res.json(dbTransaction);
      })
      .catch(err => {
          res.status(400).json(err);
      })
});

// create exercises
router.put('/api/workouts/:id', (req, res) => {
  Workout.findOneAndUpdate(
      {_id: req.params.id},
      {$push: { exercises: req.body } },
      {new: true}
  )
  .then(dbTransaction => {
      res.json(dbTransaction);
  })
  .catch(err => {
      res.status(400).json(err);
  })
});

// sort workouts by last week
router.get('/api/workouts/range', (req, res) => {
  Workout.aggregate([
      {
          $addFields: {
              totalDuration: { $sum: "$exercises.duration" }
          },
      },
  ])
  .sort({day:-1})
  .limit(7)
  .then(dbTransaction => {
      res.json(dbTransaction);
  })
  .catch(err => {
      res.status(400).json(err);
  })
});

module.exports = router;
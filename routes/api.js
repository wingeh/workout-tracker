const router = require('express').Router();

const {Workout} = require('./../models');

//GET WORKOUTS
//Should return aggregate of workouts
router.get('/workouts', (req, res) => {
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

//CREATE WORKOUT
router.post('/workouts', ({body},res) => {
    Workout.create(body)
        .then(dbTransaction => {
            res.json(dbTransaction);
        })
        .catch(err => {
            res.status(400).json(err);
        })
});

//ADD EXERCISE
router.put('/workouts/:id', (req, res) => {
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

//GET RECENT WORKOUTS
router.get('/workouts/range', (req, res) => {
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
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workOutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [{
      type: {
        type: String
      },
      name: {
        type: String
      },
      duration: {
        type: Number
      },
      distance: {
        type: Number
      },
      weight: {
        type:Number
      },
      reps:{
        type: Number
      },
      sets: {
        type: Number
      }
    }],
});

const Workout = mongoose.model('Workout', workOutSchema);

module.exports = Workout;
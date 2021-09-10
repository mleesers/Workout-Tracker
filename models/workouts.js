const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutsSchema = new Schema({
  day: {
    type: Date,
    trim: true,
    default: () => new Date(),
  },
 exercises: [
    {
      name: {type:String},
      weight: {type:Number},
      duration: {type:Number},
      reps: {type:Number},
      distance: {type:Number},
      sets: {type:Number},
      type: {type:String}
    },
  ],
  
});

const Workouts = mongoose.model("workoutSet", workoutsSchema);

module.exports = Workouts;
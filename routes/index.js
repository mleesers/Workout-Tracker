const workouts = require("../models/workouts.js")
const router = require("express").Router()
const path = require("path")
// const apiRoutes = require("./api")
// router.use("/api", apiRoutes)
router.get("/api/workouts", (req, res) => {
  workouts.aggregate([{
      $addFields: {
          totalDuration:{
              $sum:'$exercises.duration'
          }
      }
  }])
  .then((sumDuration) => {
    console.log(sumDuration)
      res.json(sumDuration)
  })
  .catch((err) => {
      res.json(err)
  })
})

router.put("/api/workouts/:id", ({body, params}, res) => {
  workouts.findByIdAndUpdate(
      params.id,
      {$push:{exercises: body} }
  )
  .then((workOutId) => {
      res.json(workOutId)
  })
  .catch((err) => {
      res.json(err)
  })
})



router.get("/api/workouts/range", (req, res) => {
  workouts.aggregate([{
      $addFields: {
          totalDuration:{
              $sum:'$exercises.duration'
          }
      }
  }])
  .sort({_id: -1})
  .limit(7)
  .then((sumDuration) => {
      res.json(sumDuration)
  })
  .catch((err) => {
      res.json(err)
  })
})

router.post("/api/workouts", (req, res) => {
  workouts.create({})
  .then((newWorkout) => {
      res.json(newWorkout)
  })
  .catch((err) => {
      res.json(err)
  })
})

router.use("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/stats.html"));
  });

  router.use("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
  });

  // router.use("*", (req, res) => {
  //   res.sendFile(path.join(__dirname, "../public/index.html"));
  // });




  module.exports = router
const WorkoutSet = require("../../models/workouts.js")
const router = require("express").Router()

router.get("/api/workouts", (req, res) => {
    WorkoutSet.aggregate({
        $addFields: {
            totalDuration:{
                $sum:'$exercises.duration'
            }
        }
    })
    .then((sumDuration) => {
        res.json(sumDuration)
    })
    .catch((err) => {
        res.json(err)
    })
})

router.put("/api/workouts/:id", ({body, params}, res) => {
    WorkoutSet.findByIdAndUpdate(
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
    WorkoutSet.aggregate({
        $addFields: {
            totalDuration:{
                $sum:'$exercises.duration'
            }
        }
    })
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
    WorkoutSet.create({})
    .then((newWorkout) => {
        res.json(newWorkout)
    })
    .catch((err) => {
        res.json(err)
    })
})






module.exports = router
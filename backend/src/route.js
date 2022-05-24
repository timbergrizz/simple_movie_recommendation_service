const router = require("express").Router()
const occupation = require("./routes/occupation.js");

router.use("/recommend/occupation", occupation);
router.use("/", (req, res) =>{
    res.send("It works!");
})


module.exports = router

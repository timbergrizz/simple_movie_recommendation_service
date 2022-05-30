const router = require("express").Router()
const occupation = require("./routes/occupation.js");
const age = require("./routes/age.js");

router.use("/rank/occupation", occupation);
router.use("/rank/age", age);

router.use("/", (req, res) =>{
    res.send("It works!");
})


module.exports = router

const router = require("express").Router()
const occupation = require("./routes/occupation.js");
const age = require("./routes/age.js");
const user_info = require("./routes/user.js")

router.use("/rank/occupation", occupation);
router.use("/rank/age", age);
router.use("/user/", user_info);


router.use("/", (req, res) =>{
    res.send("It works!");
})


module.exports = router

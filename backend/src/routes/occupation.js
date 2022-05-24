const router = require("express").Router()
const getConnection = require("../config/db_connection.js")

router.get("/:occupation", (req, res) => {
    const occupation = req.params.occupation
    if(req.params.occupation == undefined) res.send({"error" : True});
    getConnection((conn) => {
        conn.query(`
           select * from
           movie join (select movieId as mvId, avg(ratingScore) as avgRate
           from ratings join (select userId from user where occupation = "${occupation}") as occupation
           on occupation.userId = ratings.userId group by movieId having count(*) > 5) as ratings
           on movie.movieId = ratings.mvId
           order by avgRate desc limit 10;
        `).then((result) => {
            console.log(result);
            res.send(result);
        }).catch((err) =>{
            console.log(err);
            res.send("error!");
        }).finally(() =>{
            if(conn) conn.release();
        })

    })
})

module.exports = router

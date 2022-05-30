const router = require("express").Router()
const getConnection = require("../config/db_connection.js");

router.get("/:age", (req, res) => {
    console.log(req.params.age);

    if(age = undefined) res.send({"error" : true, "message" : "parameter does not exists."})

    getConnection((conn) => {
        const age = req.params.age
        conn.query(`
            select * from
            movie join
            (select movieId as mvId, avg(ratingScore) as avgRate
            from ratings join
            (select userId from user where age >= ${age} and age < ${age + 10})
            as occupation
            on occupation.userId = ratings.userId
            group by movieId having count(*) > 5) as ratings
            on movie.movieId = ratings.mvId
            order by avgRate desc limit 10;
                   `).then((result) => {
            console.log(result);
            res.send(result);
        }).catch(err => {
            console.log(err);
            res.send({
                "error" : true,
                "message" : err
            })
        }).finally(() => {
            if(conn) conn.release()
        })
    })
})

module.exports = router;

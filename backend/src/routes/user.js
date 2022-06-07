const router = require("express").Router();
const getConnection = require("../config/db_connection.js");

router.get("/:user_id", (req, res)=> {
    if(req.params.user_id == undefined){
        res.send({
            "error" : true,
            "message" : "User Id doesn't exists."
        })
    }
    getConnection((conn) =>{
        const user_id = req.params.user_id;
        conn.query(`select * from user where user_id = ${user_id}`).then((result) => {
            console.log(result);
            res.send(result);
        }).catch(err =>{
            console.log(err);
            res.send({
                "error" : true,
                "message" : err
            })
        }).finally(() =>{
            if(conn) conn.release();
        })
    })
})

module.exports = router

const router = require("express").Router();
const axios = require("axios");
const getConnection = require("../config/db_connection.js");

router.get("/:user_id", (req, res) =>{
    const user_id = req.params.user_id;
    getConnection((conn) => {
        axios.get(`http://127.0.0.1:3058/recommend/?userId=${1}`)
            .then((response) => {
                const result = response.data;

                let str = "("
                for(let i = 0; i < 9; ++i) {
                    str = str.concat(result[i].movieId, ", ");
                }

                str = str.concat(result[9].movieId, ")");

                conn.query(`select * from movie where movieId in ${str}`)
                    .then((result_list) => {
                        let result_data = []
                        for(let i = 0; i <= 9; ++i){
                            const cur = {
                                "movieId": result_list[i].movieId,
                                "movieTitle" : result_list[i].movieTitle,
                                "expRate" : result[i].rating,
                            }
                            result_data.push(cur)
                        }
                        result_data.sort((a, b) => {
                            return a.expRate < b.expRate;
                        })
                        res.send(result_data);
                    })
            })
    })
})

module.exports = router;

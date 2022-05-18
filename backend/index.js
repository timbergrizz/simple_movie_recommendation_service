const app = require("express")()
const port = 3000
const getConnection = require("./config/db_connection.js");

app.get("/", (req, res) =>{
    res.send("Testing");
})

app.listen(port, ()=>{
    console.log("Example app listening on 3000");
    getConnection((conn) => {
        conn.query("select * from movie").then(result => {
            console.log(result)
        })
        conn.release();
    })
});

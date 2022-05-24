const app = require("express")()
const port = 3000
const getConnection = require("./src/config/db_connection.js");

app.get("/", (req, res) =>{
    res.send("Testing");
})

app.listen(port, ()=>{
    console.log("Example app listening on 3000");
});

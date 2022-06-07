const app = require("express")()
const port = 3003
const getConnection = require("./src/config/db_connection.js");
const route = require("./src/route.js")
const cors = require("cors")

app.use(cors());
app.use("/", route)

app.listen(port, ()=>{
    console.log(`Example app listening on ${port}`);
});

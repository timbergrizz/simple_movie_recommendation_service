const app = require("express")()
const port = 3000

app.get("/", (req, res) =>{
    res.send("Testing");
})

app.listen(port, ()=>{
    console.log("Example app listening on 3000");
});

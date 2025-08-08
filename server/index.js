const app = require("./app");
app.listen(process.env.SERVER_PORT, function(){
    console.log("server is running")
})
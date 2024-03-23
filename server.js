import express from "express"
import usersManager from "./fs/UsersManager.fs.js";

// Server
const server = express()
const port = 8080
const ready = ()=>console.log("Server ready on port: "+port+".")

server.listen(port, ready)

// Middlewares
server.use(express.urlencoded({extended: true}))


// Router
server.get("/", async(req, res)=>{
try {
    return res.status(200).json({
    response: "Correct reading.",
    success: true
    });

} catch (error) {
    console.log(error);
    return res.status(404).json({
        response: "Null",
        message: "Not products found.",
        success: false
    });
}

})

// Parámetro
server.get("/api/products/:title", async(req, res)=>{
try {
    const {title}= req.params;
    return res.status(200).json({
        response: title,
        success: true
    })
} catch (error) {
    console.log(error);
    return res.status(404).json({
        response: "Null",
        message: "Not products found.",
        success: false
    });
}

})

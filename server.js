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
server.get("/api/users", async(req, res)=>{
try {
    const {role} = req.query;
    const all= await usersManager.read(role);
    // se rompe cuando no paso nada... cuando paso un número de rol sí funciona. Manejo de errores
    if (all.length!==0) {
        return res.status(200).json({
            response: all,
            role,
            success: true
        })
    } else {
        const error = new Error ("Not found.")
        error.statusCode = 404
        throw error
    }
} catch (error) {
    console.log(error);
    return res.status(error.statusCode).json({
        response: error.message,
        success: false
    });
}

})

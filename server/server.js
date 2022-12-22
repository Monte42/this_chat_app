const express = require("express")
const cors = require("cors")
const app = express()
const cookieParser = require("cookie-parser")
const socket = require("socket.io")

require("dotenv").config()

app.use(express.json(), express.urlencoded({extended:true}))

app.use(cookieParser())

app.use(cors({
    credentials:true,
    origin: ["http://localhost:3000","http://10.0.0.47:3000","http://54.146.220.50:3000"],
}))

require("./config/mongoose.config")
require("./routes/user.routes")(app)
require("./routes/message.routes")(app)

const server = app.listen(8000, () => console.log("Running..."))

const io = socket(server, {
    cors: {
        origin: ["http://localhost:3000","http://10.0.0.47:3000","http://54.146.220.50:3000"],
        methods: ["GET","POST","PUT","DELETE"],
        allowedHeaders: ["*"],
        credentials: true
    }
})

io.on("connection", socket => {
    socket.on("msg_from_client", data => {
        socket.broadcast.emit("msg_from_server", data);
    });
});
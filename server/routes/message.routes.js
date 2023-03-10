const MessageController = require("../controllers/message.controller")
const {authenticate} = require("../config/jwt.config")

module.exports = app => {
    app.post("/api/chat/newMessage", MessageController.createMessage)
    app.get("/api/chat/:room", MessageController.fetchMessageByRoom)
}
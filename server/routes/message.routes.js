const MessageController = require("../controllers/message.controller")
const {authenticate} = require("../config/jwt.config")

module.exports = app => {
    app.post("/api/chat/newMessage", authenticate, MessageController.createMessage)
    app.get("/api/chat/:room", authenticate, MessageController.fetchMessageByRoom)
}
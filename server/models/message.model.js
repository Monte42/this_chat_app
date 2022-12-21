const mongoose = require("mongoose")

const MessageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: [true, "Sorry, but messages can not be empty"]
    },
    from: {
        type: String,
        required: [true, "Please the recepient know whos is talking to them"]
    },
    room: {
        type: String,
        required: [true, "Please ensure your message has a destination"]
    },
}, {timestamps:true})

module.exports = mongoose.model("Message", MessageSchema)


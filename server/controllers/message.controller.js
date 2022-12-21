const Message = require("../models/message.model")

module.exports = {
    createMessage: (req,res) => {
        Message.create(req.body)
            .then(msg => res.json(msg))
            .catch(err => res.status(400).json(err))
    },
    fetchMessageByRoom:(req,res) => {
        Message.find({room: req.params.room})
            .then(msgs => res.json(msgs))
            .catch(err => console.log(err))
    }
}
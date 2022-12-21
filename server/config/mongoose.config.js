const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1/auth_users", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Users DB is up.."))
    .catch(() => console.log("DB Failed.."))

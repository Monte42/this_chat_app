const mongoose = require("mongoose")
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),//REGEX checks for email format
            message: "Please enter a valid email"
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be 8 characters or longer"]
    }
},{timestamps:true})

// Mongoose Virtuals allows us to create fields that we do not want to
// save to our database.
UserSchema.virtual('confirmPassword') // name of field like above. eg "firstName"
    .get( () => this._confirmPassword )// gets value of this field out 
    .set( value => this._confirmPassword = value );// sets the model instance to be checked

UserSchema.pre('validate', function(next) { //"pre-hook" in middleware used to add more vaildation
    if (this.password !== this.confirmPassword) { // if pwd & cfmPwd dont match add this message to
        this.invalidate('confirmPassword', 'Password must match confirm password');// this field
    }                       // ('feildToAddTo','Message to add')
        next();// if validations pass move to the next function
    });

// like before we are using "pre-hook", only before we used pre-validate.  This time we are going to
// use pre-save.  Here we will hash the user pwd pre saving.
UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        })
        .catch(err => console.log(err))
    });

module.exports = mongoose.model("User", UserSchema)
const mongoose  = require("mongoose");
const validator = require("validator");
const userSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:4,
        maxLength:50
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email address: "+ value );
            }
        }
    },
    password:{
        type:String,
        required:true,
    },
    age:{
        type:Number
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data is not valid");
            }
        },
    },
    photoUrl:{
        type:String,
        default:"https://i.pinimg.com/564x/d5/b0/4c/d5b04cc3dcd8c17702549ebc5f1acf1a.jpg"
    },
    about:{
        type:String,
        default:"This is a default about of the user"
    },
    skills:{
        type:[String]
    }
},
{
    timestamps:true,
}
);

const User = mongoose.model("User",userSchema);

module.exports = User ;
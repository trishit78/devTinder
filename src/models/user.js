const mongoose  = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken")
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
        enum:{
            values: ["male","female","others"],
            message:`{VALUE} is not a valid gender type`
        },
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

userSchema.index({firstName:1,lastName:1});
// userSchema.methods.getJWT = async function () {
//     const user = this;
//     const token = await jwt.sign({_id:user._id}, "Trishit", {expiresIn:"7d"});
//     return token;
// };
const User = mongoose.model("User",userSchema);

module.exports = User ;
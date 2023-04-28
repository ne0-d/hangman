import mongoose from "mongoose"


const UserSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        userScore:{
            type: Number,
            default: 1000,
        }
    },
    { timestamps: true }
)

const UserModel = mongoose.model("userh", UserSchema);
export default UserModel;
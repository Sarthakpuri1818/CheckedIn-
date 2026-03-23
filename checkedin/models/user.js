
//this is data model on how data would be stored for every user


import mongoose  from 'mongoose';




const userSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['staff','manager'],
        required: true
    },
}, {timestamps: true});


const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
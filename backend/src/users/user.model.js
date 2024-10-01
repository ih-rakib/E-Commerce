const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    role: { type: String, default: 'user' },
    profileImg: String,
    bio: { type: String, maxlength: 300 },
    profession: String,
    createdAt: { type: Date, default: Date.now }
})

// hashing password using bcrypt
userSchema.pre('save', async function (next) {
    const user = this;

    // Check if the password field has been modified
    if (user.isModified('password')) {
        // Hash the password if it has been modified
        const hashedPassword = await bcrypt.hash(user.password, 11);
        user.password = hashedPassword;
    }

    // Continue with the save operation
    next();
});

// matching password
userSchema.methods.comparePassword = function (givenPassword) {
    return bcrypt.compare(givenPassword, this.password);
};

const User = new model('User', userSchema)
module.exports = User;
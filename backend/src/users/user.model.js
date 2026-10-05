const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: { type: String, required: true, trim: true, minlength: 2, maxlength: 60 },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true, match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'] },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    profileImg: { type: String, trim: true },
    bio: { type: String, maxlength: 300, trim: true },
    profession: { type: String, trim: true, maxlength: 100 },
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true })

// hashing password using bcrypt
userSchema.pre('save', async function (next) {
    try {
        const user = this;

        // Check if the password field has been modified
        if (user.isModified('password')) {
            if (!user.password) {
                return next(new Error('Password is required'));
            }
            // Hash the password if it has been modified
            const hashedPassword = await bcrypt.hash(user.password, 11);
            user.password = hashedPassword;
        }

        // Continue with the save operation
        next();
    } catch (err) {
        next(err);
    }
});

// matching password
userSchema.methods.comparePassword = function (givenPassword) {
    return bcrypt.compare(givenPassword, this.password);
};

const User = model('User', userSchema)
module.exports = User;
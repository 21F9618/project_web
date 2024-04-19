// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     name: String,
//     email: String
// });

// module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensure email is unique
    },
    password: {
        type: String,
        required: true
    }
});

// Pre-save hook to hash password before saving the user document
userSchema.pre('save', async function (next) {
    try {
        // Check if the password field is modified (or is new)
        if (!this.isModified('password')) {
            return next();
        }

        // Hash the password using bcrypt
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(this.password, saltRounds);

        // Update the user password with the hashed password
        this.password = hashedPassword;

        // Proceed to save the user document
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare the plain password with the hashed password
userSchema.methods.comparePassword = function (plainPassword) {
    return bcrypt.compare(plainPassword, this.password);
};

// Create the User model using the schema
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;

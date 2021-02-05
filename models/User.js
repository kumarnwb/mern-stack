const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

UserSchema.pre('save', async function (next) {
    const user = this;

    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        this.password = await bcrypt.hash(this.password, salt);
        return next();

    } catch (e) {
        throw new Error('failed pre');

    }

});

UserSchema.method.validatePassword = async function validatePassword(data) {

    return bcrypt.compare(data, this.password);
}



module.exports = User = mongoose.model('user', UserSchema);
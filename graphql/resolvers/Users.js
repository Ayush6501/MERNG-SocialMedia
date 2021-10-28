const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../../config');
const {UserInputError} = require('apollo-server');
const { validateRegisterInput, validateLoginInput } = require('../../util/validators')

function generateToken(user) {
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username,
    }, SECRET_KEY, {expiresIn: '1h'});
}

module.exports = {
    Mutation: {
        async login(_, {username, password}){
            const {valid, errors} = validateLoginInput(username, password);

            if(!valid) {
                throw new UserInputError("Error Not Valid", {errors})
            }

            const user = await User.findOne({username});

            if(!user) {
               errors.general = "User not found"
               throw new UserInputError("User not found", {errors})
            }

            const match = await bcrypt.compare(password, user.password);
            if(!match){
                throw new UserInputError("Wrong Credentials Entered", {errors})
            }

            const token = generateToken(user)
            return {
                ...user._doc,
                id: user._id,
                token
            }
        },

        async register(_, {registerInput: {username, email, password, confirmPassword}}) {
            //validate user data
            const {valid, errors} = validateRegisterInput(username, email, password, confirmPassword)
            if(!valid) {
                throw new UserInputError("Error", {errors})
            }
            //check user doesnt already exist
            const user = User.findOne({ username });
            if(user) {
                throw new UserInputError('User already exists', {
                    errors: {
                        username: 'This Username already exists'
                    }
                })
            }
            //hash password and create auth token
            password = await bcrypt.hash(password, 12);
            const newUser = new User({
                username,
                email,
                password,
                createdAt: new Date().toISOString(),
            });

            const res = await newUser.save();

            const token = generateToken(res)

            return {
                ...res._doc,
                id: res._id,
                token
            }
        }
    }
}
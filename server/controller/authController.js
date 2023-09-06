const Joi = require('joi');

const user = require('../models/user');

const bcrypt = require('bcrypt');

// const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,25}$/;

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;

const authController = {
    async register(req, res, next) {
        //1. Get & Validate user input
        const userRegisterSchema = Joi.object({
            username: Joi.string().min(5).max(30).required(),
            name: Joi.string().max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(passwordPattern).required(),
            confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
        });
        
        const { error } = userRegisterSchema.validate(req.body);

        //2. If error in validation -> return error via middleware
        if (error) {
            next(error);
        }
        //3. If user is already registered -> return error
        const { username, name, email, password } = req.body;

        //4. Check if user already exists in DB
        try {
            const emailExists = await user.exists({ email });

            const usernameExists = await user.exists({ username });

            if(emailExists) {
                const error = {
                    status: 409,
                    message: 'Email already exists, please use another email !',
                }
            }

            if(usernameExists) {
                const error = {
                    status: 409,
                    message: 'Username already exists, please use another username !',
                }
                return next(error);
            }
        }

        catch (error) {
            return next(error);
        }

        //4. Password encrypted/hash
        const hashedPassword = await bcrypt.hash(password, 10);

        //5. Store user data in DB
        const registerUser = new user({
            username,
            name,
            email,
            password: hashedPassword,
        })

        //try catch missing
        try {
            await registerUser.save();
        }
        catch (error) {
            return next(error);
        }

        //6. Respond send
        return res.status(201).json({
            user,
            message: 'User created successfully',
            status: 200
        })
    },
    async login() {
        
    }
}

module.exports = authController;
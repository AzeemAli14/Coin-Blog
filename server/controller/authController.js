const Joi = require('joi');

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const authController = {
    async register(req, res, next) {
        //1. Get & Validate user input
        const userRegisterSchema = Joi.object({
            username: Joi.string().min(5).max(30).required(),
            name: Joi.string().max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern().required(),
        });
        //2. If error in validation -> return error via middleware
        //3. If user is already registered -> return error
        //4. Password encrypted/hash
        //5. Store user data in DB
        //6. Respond send
    }
}
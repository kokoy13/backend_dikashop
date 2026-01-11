const Users = require("../models/Users")
const bcrypt = require("bcrypt");
const validator = require('validator')

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if(email.length === 0){
            return res.status(400).json({
                message: "Email is required"
            })
        }
        if(password.length === 0){
            return res.status(400).json({
                message: "Password is required"
            })
        }

        if(!validator.isEmail(email)){
            return res.status(400).json({
                message: "Email not valid, please try again"
            });
        }
        const isEmailExist = await Users.findUserByEmail(email)
        if(isEmailExist[0].length === 0){
            return res.status(400).json({
                message: "email not registered, please register first"
            })
        }
        
        if(password.length < 6){
            return res.status(400).json({
                message: "password must more than or equal 6 characters"
            })
        }

        const db_password = isEmailExist[0][0].password

        const isPasswordValid = await bcrypt.compare(password, db_password)
        if(!isPasswordValid){
            return res.status(400).json({
                message: "Email or password incorrect"
            });
        }

        return res.status(200).json({
            message: "Login Successfully"
        });
    } catch (err) {
        return res.status(500).json({
            message: `Error: ${err}`
        });
    }
};

exports.register = async (req, res) => {
    const { fullname, email, password, passwordConf } = req.body;

    try {
        if(fullname.length === 0){
            return res.status(400).json({
                message: "Full Name is required"
            })
        }
        if(email.length === 0){
            return res.status(400).json({
                message: "Email is required"
            })
        }
        if(password.length === 0){
            return res.status(400).json({
                message: "Password is required"
            })
        }
        if(passwordConf.length === 0){
            return res.status(400).json({
                message: "Confirm Password is required"
            })
        }

        if(fullname.length < 3){
            return res.status(400).json({
                message: "Full Name must more than or equal 3 characters"
            })
        }

        if(!validator.isEmail(email)){
            return res.status(400).json({
                message: "Email not valid, check your email format"
            });
        }
        const isEmailExist = await Users.findUserByEmail(email)
        if(isEmailExist[0].length !== 0){
            return res.status(400).json({
                message: "Email already exist, please use another email"
            });
        }
        if(password.length < 6){
            return res.status(400).json({
                message: "Password must more than or equal 6 character"
            });
        }
        if(password !== passwordConf){
            return res.status(400).json({
                message: "Password and Confirm Password not matches, please recheck it"
            });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        await Users.createUser(fullname, email, passwordHash)
        return res.status(200).json({
            message: "Created user successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: `Error: ${error}`
        });
    }
};
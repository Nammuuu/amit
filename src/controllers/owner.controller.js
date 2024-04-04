const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcryptjs');
const { Owner } = require('../models');
const { authService, tokenService } = require('../services');
const ApiError = require('../utils/ApiError');

const ownerRegister = catchAsync(async (req, res) => {
    if(await Owner.findOne({ where: { email:req.body.email} })){
        console.log("email is already registered");
        return res.status(404).send({ message:"email already registered"});
    }
    const values = {name:req.body.name, email:req.body.email,password:await bcrypt.hash(req.body.password, 8)};
    console.log("values are : ",values);
    const user = await Owner.create(values);

    res.status(200).send({ message: 'owner registered successfully', user });

});


const ownerLogin = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const owner = await authService.loginOwnerWithEmailAndPassword(email, password);

    if (owner) {
        const tokens = await tokenService.generateAuthTokens(owner);
        res.send({ message: 'Login Successfully!!', owner, tokens });
    } else {
        res.send({ message: 'Invalid email or password'});
    }


});

module.exports = { 
    ownerRegister,
    ownerLogin,

};

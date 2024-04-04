const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { Subscription } = require('../models');
const ApiError = require('../utils/ApiError');

const adminAddSubscription = catchAsync(async (req, res) => {
    try{
        await Subscription.create(req.body);
        res.status(httpStatus.OK).send({ message: 'Tested Successfully' });
    }
    catch(err){
        console.log(err);
        res.send({ message: 'Problem in adding subcription' });
    }
});

const fetchSubscription = catchAsync(async (req, res) => {
    try{
        const data = await Subscription.findAll();
        res.status(httpStatus.OK).send({ message: 'Successfully fetched subscriptions' , data: data }); 
    }
    catch(err){
        console.log(err);
        res.send({ message: 'Problem in fetching subscription' });
    }
});


const deleteSubscription = catchAsync(async (req, res) => {
    try{
        const subscription = await Subscription.findByPk(req.body.id);
        if (!subscription) {
            // If subscription with the given ID is not found, handle the error
            console.log('Subscription not found');
            return;
        }
        // Delete the subscription
        await subscription.destroy();
        res.status(httpStatus.OK).send({ message: 'Successfully deleted subscriptions'}); 
    }
    catch(err){
        console.log(err);
        res.send({ message: 'Problem in deleting subscription' });
    }
});


const updateSubscription = catchAsync(async (req, res) => {
    try{
        console.log(req.body);
        const subscription = await Subscription.findByPk(req.body.id);

        if (!subscription) {
            // If subscription with the given ID is not found, handle the error
            console.log('Subscription not found');
            return;
        }

        // Update the subscription
        await subscription.update(req.body);
        res.status(httpStatus.OK).send({ message: 'Successfully updated subscriptions'}); 
    }
    catch(err){
        console.log(err);
        res.send({ message: 'Problem in updating subscription' });
    }
});

module.exports = {
    adminAddSubscription,
    fetchSubscription,
    deleteSubscription,
    updateSubscription,
};
module.exports = (sequelize, DataTypes) => {
    const Payment = sequelize.define('Payment', {
        
subscriptionId: {
    type: DataTypes.INTEGER
  },
  type: {
    type: DataTypes.STRING
  },
  paymentIdentifier: {
    type: DataTypes.INTEGER
  },
  transactionsDate: {
    type: DataTypes.INTEGER
  },
  details: {
    type: DataTypes.TEXT
  },
  status: {
    type: DataTypes.BOOLEAN
  },
},
{
  tableName: 'Payment',
  freezeTableName: true
}
);

Payment.associate = function (models) {

  Payment.hasOne(models.Portal, {
    foreignKey: 'paymentId'
  });  
};
  

return Payment;
};
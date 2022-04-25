const {DataTypes} = require('sequelize');
const {dbConection} = require('../db/connection');

const Metric = dbConection.define('Metric', {
  uuid: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  hostName: {
    type: DataTypes.STRING
  },
  totalMemory: {
    type: DataTypes.DOUBLE
  },
  freeMemory: {
    type: DataTypes.DOUBLE
  },
  consMemory: {
    type: DataTypes.DOUBLE
  },
  timestamp: {
    type: DataTypes.INTEGER
  },
  createdAt: {
    type: DataTypes.DATE
  },
  updatedAt: {
    type: DataTypes.DATE
  },
  type:{
    type: DataTypes.ENUM('B','E','N')
  },
  status: {
    type: DataTypes.ENUM('A','T')
  }
});


module.exports = Metric;
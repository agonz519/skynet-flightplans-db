const orm = require('../config/orm');

const flightPlan = {
  selectAll: (cb) => {
    orm.selectAll('flight_plans', (res) => {
      cb(res);
    });
  },
  insertOneFlightPlan: (columnNames, columnValues, cb) => {
    orm.insertOneFlightPlan('flight_plans', columnNames, columnValues, (res) => {
      cb(res);
    });
  },
  insertOneFlightPlanAction: (columnNames, columnValues, cb) => {
    orm.insertOneFlightPlanAction('flight_plan_actions', columnNames, columnValues, (res) => {
      cb(res);
    });
  },
  updateOneFlightPlan: (objectColumnValues, condition, cb) => {
    orm.updateOneFlightPlan('flight_plans', objectColumnValues, condition, (res) =>{
      cb(res);
    });
  },
  updateOneFlightPlanAction: (objectColumnValues, condition, cb) => {
    orm.updateOneFlightPlanAction('flight_plan_actions', objectColumnValues, condition, (res) =>{
      cb(res);
    });
  },
  deactivateFlightPlan: (condition, cb) => {
    orm.deactivateFlightPlan("flight_plans", condition, (res) => {
      cb(res);
    });
  },
  deactivateFlightPlanAction: (condition, cb) => {
    orm.deactivateFlightPlanAction("flight_plan_actions", condition, (res) => {
      cb(res);
    });
  }
};

module.exports = flightPlan;
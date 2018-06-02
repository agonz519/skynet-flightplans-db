const orm = require('../config/orm');

const flightPlan = {
  selectAll: (cb) => {
    orm.selectAll('flight_plans', (res) => {
      cb(res);
    });
  },
  insertOne: (columnNames, columnValues, cb) => {
    orm.insertOne('flight_plans', columnNames, columnValues, (res) => {
      cb(res);
    });
  },
  updateOne: (objectColumnValues, condition, cb) => {
    orm.updateOne('flight_plans', objectColumnValues, condition, (res) =>{
      cb(res);
    });
    // },
    // delete: (condition, cb) => {
    //   orm.delete("flight_plans", condition, (res) => {
    //     cb(res);
    //   });
  }
};

// const flightAction = {
//   selectAll: (cb) => {
//     orm.selectAll('flight_plan_actions', (res) => {
//       cb(res);
//     });
//   },
// };

module.exports = flightPlan;
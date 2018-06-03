const connection = require('./connection.js');

// Helper Functions for ORM items
const printQuestionMarks = (num) => {
  let arr = [];
  for (let i = 0; i < num; i++) {
    arr.push('?');
  }
  return arr.toString();
};

const objToSql = (object) => {
  let arr = [];
  for (let key in object) {
    let value = object[key];
    if (Object.hasOwnProperty.call(object, key)) {
      if (typeof value === 'string') {
        value = `"${value}"`;
      }
      arr.push(`${key}=${value}`);
    }
  }
  return arr.toString();
};

// ORM Definition
const orm = {
  selectAll: (tableName, cb) => {
    let activeFlag;
    if (tableName === 'flight_plans') {
      activeFlag = 'flight_plan_active';
    }
    else {
      activeFlag = 'action_active';
    }
    let queryString = `SELECT * FROM ${tableName} WHERE ${activeFlag} = 1;`;
    connection.query(queryString, (err, res) => {
      if (err) throw err;
      cb(res);
    });
  },
  selectAllFlightPlanActions: (tableName1, tableName2, columnNames, joinedOn, condition, orderedBy, cb) => {
    let columnNameString = columnNames.toString();
    let queryString = `SELECT ${columnNameString} FROM ${tableName1} LEFT JOIN ${tableName2} ON (${joinedOn}) `;
    queryString += `WHERE ${condition} ORDER BY ${orderedBy};`;
    console.log(queryString);
    connection.query(queryString, (err, res) => {
      if (err) throw err;
      cb(res);
    });
  },
  insertOneFlightPlan: (tableName, columnNames, columnValues, cb) => {
    let columnNameString = columnNames.toString();
    let questionMarks = printQuestionMarks(columnValues.length);
    let queryString = `INSERT INTO ${tableName} (${columnNameString}) VALUES (${questionMarks});`;
    console.log(queryString);
    connection.query(queryString, columnValues, (err, result) => {
      if (err) throw err;
      cb(result);
    });
  },
  insertOneFlightPlanAction: (tableName, columnNames, columnValues, cb) => {
    let columnNameString = columnNames.toString();
    let questionMarks = printQuestionMarks(columnValues.length);
    let queryString = `INSERT INTO ${tableName} (${columnNameString}) VALUES (${questionMarks});`;
    console.log(queryString);
    connection.query(queryString, columnValues, (err, result) => {
      if (err) throw err;
      cb(result);
    });
  },
  updateOneFlightPlan: (tableName, objectColumnValues, condition, cb) => {
    let objectToSQL = objToSql(objectColumnValues);
    let queryString = `UPDATE ${tableName} SET ${objectToSQL} WHERE ${condition};`;
    console.log(queryString);
    connection.query(queryString, (err, result) => {
      if (err) throw err;
      cb(result);
    });
  },
  updateOneFlightPlanAction: (tableName, objectColumnValues, condition, cb) => {
    let objectToSQL = objToSql(objectColumnValues);
    let queryString = `UPDATE ${tableName} SET ${objectToSQL} WHERE ${condition};`;
    console.log(queryString);
    connection.query(queryString, (err, result) => {
      if (err) throw err;
      cb(result);
    });
  },
  deactivateFlightPlan: (tableName, objectColumnValues, condition, cb) => {
    let objectToSQL = objToSql(objectColumnValues);
    let queryString = `UPDATE ${tableName} SET ${objectToSQL} WHERE ${condition};`;
    console.log(queryString);
    connection.query(queryString, (err, result) => {
      if (err) throw err;
      cb(result);
    });
  },
  deactivateFlightPlanAction: (tableName, objectColumnValues, condition, cb) => {
    let objectToSQL = objToSql(objectColumnValues);
    let queryString = `UPDATE ${tableName} SET ${objectToSQL} WHERE ${condition};`;
    console.log(queryString);
    connection.query(queryString, (err, result) => {
      if (err) throw err;
      cb(result);
    });
  }
};

module.exports = orm;
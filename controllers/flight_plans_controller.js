const express = require('express');

const router = express.Router();

const flightPlan = require('../models/flightPlan');

router.get('/api/flight-plans', (req, res) => {
  flightPlan.selectAll((data) => {
    let flightPlansObject = { flightPlans: data };
    console.log(data);
    res.json(flightPlansObject);
  });
});

router.post('/api/new-flight-plan', (req, res) => {
  flightPlan.insertOne([
    'flight_plan_name'
  ], [
    req.body.flight_plan_name
  ], (result) => {
    res.json({ id: result.insertId });
  });
});

router.post('/api/new-flight-plan-action', (req, res) => {
  flightPlan.insertOne([
    'flight_plan_id',
    'action_order_num',
    'action_type',
    'action_param',
    'action_wait'
  ], [
    req.body.flight_plan_id,
    req.body.action_order_num,
    req.body.action_type,
    req.body.action_param,
    req.body.action_wait
  ], (result) => {
    res.json({ id: result.insertId });
  });
});

// router.put('/api/update-burger/:id', (req, res) => {
//   let condition = `id = ${req.params.id}`;
//   console.log('condition', condition);
//   burger.updateOne({
//     devoured: req.body.devoured
//   }, condition, (result) => {
//     if (result.changedRows === 0) {
//       return res.status(404).end();
//     } else {
//       res.status(200).end();
//     }
//   });
// });
//
// router.delete("/api/delete-burger/:id", (req, res) => {
//   let condition = `id = ${req.params.id}`;
//   burger.delete(condition, (result) => {
//     if (result.affectedRows === 0) {
//       return res.status(404).end();
//     } else {
//       res.status(200).end();
//     }
//   });
// });

module.exports = router;
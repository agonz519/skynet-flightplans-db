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

router.get('/api/all-flight-plans-and-actions', (req, res) => {
  let columnNames = [
    'flight_plan_actions.flight_plan_id',
    'flight_plans.flight_plan_name',
    'flight_plan_actions.action_order_num',
    'flight_plan_actions.action_type',
    'flight_plan_actions.action_param',
    'flight_plan_actions.action_wait',
    'flight_plan_actions.action_active'
  ];
  let joinedOn = 'flight_plans.flight_plan_id = flight_plan_actions.flight_plan_id';
  let condition = 'flight_plans.flight_plan_active = 1 AND flight_plan_actions.action_active = 1';
  let orderedBy = 'flight_plan_id, action_order_num';
  flightPlan.selectAllFlightPlanActions(columnNames, joinedOn, condition, orderedBy, (data) => {
    let flightPlansObject = { flightPlans: data };
    console.log(data);
    res.json(flightPlansObject);
  });
});

router.post('/api/new-flight-plan', (req, res) => {
  flightPlan.insertOneFlightPlan([
    'flight_plan_name'
  ], [
    req.body.flight_plan_name
  ], (result) => {
    res.json({ id: result.insertId });
  });
});

router.post('/api/new-flight-plan-action', (req, res) => {
  flightPlan.insertOneFlightPlanAction([
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

router.put('/api/update-flight-plan/:id', (req, res) => {
  let condition = `flight_plan_id = ${req.params.id}`;
  console.log('condition', condition);
  flightPlan.updateOneFlightPlan({
    flight_plan_name: req.body.flight_plan_name
  }, condition, (result) => {
    if (result.changedRows === 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.put('/api/update-flight-plan-action/:id', (req, res) => {
  let condition = `action_id = ${req.params.id}`;
  console.log('condition', condition);
  flightPlan.updateOneFlightPlanAction({
    flight_plan_id: req.body.flight_plan_id,
    action_order_num: req.body.action_order_num,
    action_type: req.body.action_type,
    action_param: req.body.action_param,
    action_wait: req.body.action_wait
  }, condition, (result) => {
    if (result.changedRows === 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.put('/api/deactivate-flight-plan/:id', (req, res) => {
  let condition = `flight_plan_id = ${req.params.id}`;
  console.log('condition', condition);
  flightPlan.deactivateFlightPlan({
    flight_plan_active: req.body.flight_plan_active
  }, condition, (result) => {
    if (result.changedRows === 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.put('/api/deactivate-flight-plan-action/:id', (req, res) => {
  let condition = `action_id = ${req.params.id}`;
  console.log('condition', condition);
  flightPlan.deactivateFlightPlanAction({
    action_active: req.body.action_active
  }, condition, (result) => {
    if (result.changedRows === 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

module.exports = router;
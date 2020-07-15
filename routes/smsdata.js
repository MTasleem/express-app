const express = require('express');
const router = express.Router();
const smsdb = require('../models/smsData');
const mongoose = require('mongoose');
const moment = require('moment')

router.get('/smslists', function (req, res, next) {
    smsdb.find({})
        .exec()
        .then(users => {
            return res.status(200).json({
                results: users
            })
        })
        .catch(err => {
            return res.status(400).json({
                err: err
            })
        })
});

router.get('/smslists/:id', function (req, res, next) {
    smsdb.findOne({ id: req.params.id })
        .exec()
        .then(users => {
            return res.status(200).json({
                results: users
            })
        })
        .catch(err => {
            return res.status(400).json({
                err: err
            })
        })
});

router.post('/smslists/filterByDate', function (req, res, next) {
    let start = moment(req.body.start).format('MM/DD/YYYY');
    let end = moment(req.body.end).format('MM/DD/YYYY');

    smsdb.find({ 'start_date': { $gte: start }, 'end_date': { $lte: end } })
        .exec()
        .then(smsListData => {
            return res.status(200).json({
                results: smsListData
            })
        })
        .catch(err => {
            return res.status(400).json({
                err: err
            })
        })
});


router.post("/smslists/save", (req, res) => {

    const smsUser = new smsdb({
        _id: mongoose.Types.ObjectId(),
        id: req.body.id,
        city: req.body.city,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        price: req.body.price,
        status: req.body.status,
        color: req.body.color
    })
    smsUser
        .save()
        .then(data => {
            return res.status(201).json({
                message: "SMS Data Saved to Database"
            })
        })
        .catch(err => {
            return res.status(500).json({
                error: err
            })
        })
});

router.post('/smslists/update', function (req, res, next) {
    console.log(req.body)
    smsdb.findOneAndUpdate({ id: req.body.id }, req.body, { new: false })
        .then(data => {
            console.log(data)
            return res.status(201).json({
                message: "SMS Data Saved to Database",
                results: data
            })
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({
                message: 'Update failed',
                error: err
            })
        })
});


router.delete('/smslists/delete/:id', function (req, res, next) {
    smsdb.deleteOne({ id: req.params.id })
        .then(deletesms => {
            return res.status(200).json({
                message: "Record Deleted",
                results: deletesms
            })
        })
        .catch(err => {
            return res.status(400).json({
                message: "Record Not Deleted",
                err: err
            })
        });
});

module.exports = router;

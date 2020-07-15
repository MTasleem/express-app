// API Routes
const indexRouter = require('./routes/index');
const smsdb = require('./routes/smsdata');
module.exports = function (app) {
    app.use('/api', indexRouter);
    app.use('/api', smsdb);
}
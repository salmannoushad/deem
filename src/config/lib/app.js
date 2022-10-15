module.exports.start = function () {
    const app = require('./express.js')()
    const port = 7000;

    app.listen(port, () => {
        console.log(`Running on the port ${port}`);
    })
}
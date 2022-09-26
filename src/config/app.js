module.exports.start = function () {
    const app = require('./express.js')()
    const port = 3000;

    app.listen(port, () => {
        console.log(`Running on the port ${port}`);
    })
}
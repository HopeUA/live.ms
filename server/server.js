// @flow
import loopback from 'loopback';
import boot from 'loopback-boot';

const app = module.exports = loopback();

app.start = () => {
    // start the web server
    return app.listen(() => {
        app.emit('started');
        const baseUrl = app.get('url').replace(/\/$/, '');
        console.log('Micro Service API is available at: %s', baseUrl);
    });
};

// Bootstrap the application, configure models, datasources and middleware.
boot(app, __dirname, (err) => {
    if (err) {
        throw err;
    }

    // start the server if `$ node server.js`
    if (require.main === module) {
        app.start();
    }
});

import wrap from 'common/lib/wrap';
import pkg from 'package.json';

module.exports = () => {
    const started = new Date();

    return wrap(async (req, res) => {
        res.send({
            name: pkg.name,
            version: pkg.version,
            started,
            uptime: (Date.now() - Number(started)) / 1000
        });
    });
};

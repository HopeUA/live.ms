import wrap from 'common/lib/wrap';
import fs from 'fs-extra';

module.exports = () => {
    return wrap(async (req, res, next) => {
        const match = req.path.match(/^\/([a-z\-]+)\.json$/);
        if (match === null) {
            return next();
        }

        const name = match[1];

        const fileName = `common/models/${name}/schema.json`;
        if (!await fs.pathExists(fileName)) {
            return next();
        }
        const schema = await fs.readFile(fileName);

        res.type('application/schema+json;charset=utf8');
        res.send(schema);
    });
};

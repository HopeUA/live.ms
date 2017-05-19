const HidePoweredBy = () => {
    return (req, res, next) => {
        res.removeHeader('X-Powered-By');
        next();
    };
};

module.exports = HidePoweredBy;

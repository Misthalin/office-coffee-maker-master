// Inspired by https://github.com/cornflourblue/node-mongo-signup-verification-api
// https://jasonwatmore.com/post/2020/05/13/node-mongo-api-with-email-sign-up-verification-authentication-forgot-password?fbclid=IwAR0yeIBCrrSZg3Avi7FwkRjAdJVG6Ds4Hf1vfYRTtSa-88L9U4MYDs0qSHc
// License in readme.md
const errorHandler = (err, req, res, next) => {
    switch (true) {
        case typeof err === 'string':
            // custom application error
            const is404 = err.toLowerCase().endsWith('not found');
            const statusCode = is404 ? 404 : 400;
            return res.status(statusCode).json({ message: err });
        case err.name === 'ValidationError':
            // mongoose validation error
            return res.status(400).json({ message: err.message });
        case err.name === 'UnauthorizedError':
            // jwt authentication error
            return res.status(401).json({ message: 'Unauthorized' });
        default:
            return res.status(500).json({ message: err.message });
    }
}

module.exports = errorHandler;
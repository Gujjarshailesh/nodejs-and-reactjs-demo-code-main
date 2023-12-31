const express = require('express');
const dotenv = require('dotenv');
const compression = require('compression');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const { ValidationError } = require('express-validation');
const i18next = require('i18next');
const backend = require('i18next-fs-backend');
const middleware = require('i18next-http-middleware');
const routes = require('./routes/routes');
const response = require('./helpers/response.helper');

dotenv.config();

i18next
  .use(backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    backend: {
      loadPath: './lang/{{lng}}/backend.json',
    },
  });
module.exports.clusteringApp = () => {
  const app = express();
  app.use(middleware.handle(i18next));
  app.use(cors());
  // Use JSON parser for all non-webhook routes
  app.use((req, res, next) => {
    if (req.originalUrl.startsWith(`${process.env.HOST_URL_PREFIX}webhook`)) {
      next();
    } else {
      express.json({ limit: '1024mb' })(req, res, next);
    }
  });
  // app.use('/webhook/stripe/updates', express.raw({type: "*/*"}))
  // app.use(express.json({ limit: "50mb" }));

  app.use(express.urlencoded({ extended: true, limit: '1024mb' }));
  app.use(morgan('combined'));
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
  app.use(compression());
  app.set('view engine', 'ejs');
  app.use('/assets', express.static('assets'));
  app.locals.baseURL = 'http://localhost:3003';
  // cron.run();

  routes(app);
  app.get('*', (req, res) => {
    res.status(404).send({ message: 'Not found', data: {} });
  });
  app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    if (err instanceof ValidationError) {
      console.log(err.details);
      let errorMessage = err.details.body
        ? err.details.body[0].message || 'Validation Error'
        : 'Validation Error';
      if (err.details.body) {
        errorMessage = err.details.body
          ? err.details.body[0].message || 'Validation Error'
          : 'Validation Error';
      } else if (err.details.query) {
        errorMessage = err.details.query
          ? err.details.query[0].message || 'Validation Error'
          : 'Validation Error';
      }
      // return res.status(statusCode).json(errorResponse);
      return response.errorResponse(req, res, errorMessage);
    }
    if (err.name === 'UnauthorizedError') {
      return res.status(statusCode).send({ message: err.message, data: {} });
    }
    if (err instanceof SyntaxError) {
      return response.errorResponse(req, res, err.message, {}, statusCode);
    }

    if (err) {
      return response.errorResponse(req, res, err);
    }
    return res.status(statusCode).json(err);
  });
  // app.use(response.errorResponse);

  return app;
};

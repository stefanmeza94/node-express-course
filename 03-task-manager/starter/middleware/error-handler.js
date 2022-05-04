const { CustomAPIError } = require('../errors/custom-error');

const errorHandlerMiddleware = (err, req, res, next) => {
  // instanceof opereator u ovom slucaju konkretno proverava da li je err instanca odnosno da li je err kreiran pomocu CustomAPIError konstruktora odnosno klase, vraca true/false
  // drugim recima proverava da li se prototype properti konstruktor funkcije (klase) nalazi bilo gde u prorotype lancu err objekta
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res.status(err.status).json({ msg: err.message });
};

module.exports = errorHandlerMiddleware;

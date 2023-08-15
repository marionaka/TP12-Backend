import ErrorIndex from "../utils/errors/ErrorIndex.js";

const errorMiddleware = (err, req, res, next) => {
  console.log(err.cause);
  switch (err.code) {
    case ErrorIndex.INVALID_TYPE:
      res.status(400).send({ status: "error", error: err.name });
      break;
    case ErrorIndex.DATABASE_ERROR:
      res.status(500).send({ status: "error", error: err.name });
      break;
    case ErrorIndex.ROUTING_ERROR:
      res.status(404).send({ status: "error", error: err.name });
      break;
    case ErrorIndex.INCOMPLETE_DATA:
      res.status(400).send({ status: "error", error: err.name });
      break;
    default:
      res.status(403).send({ status: "error", error: err.name });
      break;
  }
};

export default errorMiddleware;


import { Request, Response, NextFunction } from "express";

// TODO : implement errors for both Prod : dev mode here
export default (err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.statusCode || 500).json({
    status: err.status || "error",
    message: err.message || "server error",
  });
};

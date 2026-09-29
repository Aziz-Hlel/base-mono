import ErrorNames from '@/errors/data/errors.names';
import { ErrorMapper } from '@/errors/mapper';
import { type NextFunction, type Request, type Response } from 'express';

const notFoundHandler = (req: Request, res: Response, _: NextFunction) => {
  const message = `Route ${req.method} ${req.originalUrl} not found`;
  const payload = ErrorMapper.toResponse(req, {
    name: ErrorNames.NOT_FOUND,
    message,
    status: 404,
  });
  res.status(404).json(payload);
};

export default notFoundHandler;

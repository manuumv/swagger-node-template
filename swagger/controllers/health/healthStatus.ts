import { Response, Request } from 'express';

const mockHealthStatus = {
  status: 'up'
};

export const getHealthStatus = (_: Request, res: Response) => {
  res.status(200).json(mockHealthStatus);
};

import { Request, Response, NextFunction } from 'express';
import { getJoblogService, getSubmissionlogService } from '../services/log.service';

export const getJobLogsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status } = req.query || 'all';

    const data = await getJoblogService(status as string);

    res.json({
      success: true,
      message: 'Job Logs fetched successfully',
      data
    });
  } catch (error) {
    next(error);
  }
};


export const getSubmissionLogsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { submitted_by } = req.query || 'all';

    const data = await getSubmissionlogService(submitted_by as string);

    res.json({
      success: true,
      message: 'Submission Logs fetched successfully',
      data
    });
  } catch (error) {
    next(error);
  }
};



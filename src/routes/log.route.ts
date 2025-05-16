import { Router } from 'express';
import { getJobLogsController, getSubmissionLogsController } from '../controllers/logs.controller';

const router = Router();

router.get('/job-logs', getJobLogsController);
router.get('/submission-logs', getSubmissionLogsController);

export default router;

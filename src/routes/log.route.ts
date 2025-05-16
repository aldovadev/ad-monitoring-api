import { Router } from 'express';
import { getJobLogs, getSubmissionLogs } from '../controllers/logs.controller';

const router = Router();

router.get('/job-logs', getJobLogs);
router.get('/submission-logs', getSubmissionLogs);

export default router;

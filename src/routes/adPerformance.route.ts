import { Router } from 'express';
import { getUnderperformingAds, createAdPerformances } from '../controllers/adPerformance.controller';

const router = Router();

router.get('/underperforming-ads', getUnderperformingAds);
router.post('/ad-performances', createAdPerformances);

export default router;

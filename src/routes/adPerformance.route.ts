import { Router } from 'express';
import { getUnderperformingAdsController, createAdPerformancesController } from '../controllers/adPerformance.controller';

const router = Router();

router.get('/underperforming-ads', getUnderperformingAdsController);
router.post('/ad-performances', createAdPerformancesController);

export default router;

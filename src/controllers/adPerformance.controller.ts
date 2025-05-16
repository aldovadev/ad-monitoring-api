import { Request, Response, NextFunction } from 'express';
import { createAdPerformancesService, getUnderperformingAdsService } from '../services/adPerformance.service';
import { AdPerformancesPayloadDTO } from '../dtos/adPerformance.dto';

export const getUnderperformingAds = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { date, kpi_type_id, client_id } = req.query;

    const filters = {
      date: date ? new Date(date as string) : undefined,
      kpi_type_id: kpi_type_id ? Number(kpi_type_id) : undefined,
      client_id: client_id ? Number(client_id) : undefined
    };

    const data = await getUnderperformingAdsService(filters);

    res.json({
      success: true,
      message: 'Underperforming ads fetched successfully',
      data
    });
  } catch (error) {
    next(error);
  }
};


export const createAdPerformances = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload: AdPerformancesPayloadDTO = req.body;

    if (!Array.isArray(payload.data) || payload.data.length === 0) {
      return res.status(400).json({ success: false, message: 'Invalid or empty request body' });
    }

    const result = await createAdPerformancesService(payload);

    res.status(201).json({
      success: true,
      message: `${result.count} ad performance records created successfully`
    });
  } catch (error) {
    next(error);
  }
};

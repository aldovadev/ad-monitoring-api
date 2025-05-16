import { Request, Response, NextFunction } from 'express';
import { getUnderperformingAdsController } from '../../controllers/adPerformance.controller';
import * as adService from '../../services/adPerformance.service';
import { UnderperformingAdsDTO } from '../../dtos/adPerformance.dto';

describe('getUnderperformingAdsController', () => {
  const mockReq = {
    query: {
      date: '2025-05-18',
      kpi_type_id: '1',
      client_id: '1'
    }
  } as unknown as Request;

  const mockRes = {
    json: jest.fn(),
    status: jest.fn().mockReturnThis()
  } as unknown as Response;

  const mockNext: NextFunction = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return underperforming ads data', async () => {
    const mockData: UnderperformingAdsDTO[] = [
      {
        client_name: 'PT Sinar Awan',
        kpi_type: 'CTR',
        kpi_target: 0.03,
        actual_value: 0.025,
        date: new Date('2025-05-18')
      }
    ];

    jest.spyOn(adService, 'getUnderperformingAdsService').mockResolvedValue(mockData);

    await getUnderperformingAdsController(mockReq, mockRes, mockNext);

    expect(adService.getUnderperformingAdsService).toHaveBeenCalledWith({
      date: new Date('2025-05-18'),
      kpi_type_id: 1,
      client_id: 1
    });
    expect(mockRes.json).toHaveBeenCalledWith({
      success: true,
      message: 'Underperforming ads fetched successfully',
      data: mockData
    });
  });

  it('should call next with error if service throws', async () => {
    const mockError = new Error('Service error');
    jest.spyOn(adService, 'getUnderperformingAdsService').mockRejectedValue(mockError);

    await getUnderperformingAdsController(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(mockError);
  });
});

import { getAdPerformancesRepo } from '../repositories/adPerformance.repository';
import { createAdPerformancesRepo } from '../repositories/adPerformance.repository';
import { UnderperformingAdsDTO, AdPerformanceFiltersDTO, AdPerformanceWithContractAndClientDTO, AdPerformancesPayloadDTO } from '../dtos/adPerformance.dto';


export const getUnderperformingAdsService = async (filters: AdPerformanceFiltersDTO): Promise<UnderperformingAdsDTO[]> => {
  const adPerformances = await getAdPerformancesRepo(filters);

  const underperformingAds: UnderperformingAdsDTO[] = adPerformances
    .filter((item: AdPerformanceWithContractAndClientDTO) => item.actual_value < item.contract.kpi_target)
    .map((item: AdPerformanceWithContractAndClientDTO) => ({
      client_name: item.contract.client.name,
      kpi_type: item.contract.kpi_type.name,
      kpi_target: item.contract.kpi_target,
      actual_value: item.actual_value,
      date: item.date
    }));

  return underperformingAds
};

export const createAdPerformancesService = async (payload: AdPerformancesPayloadDTO) => {

  const createdAdPerformances = await createAdPerformancesRepo(payload);

  return createdAdPerformances;
};
import { ContractWithClientAndKpiTypeDTO } from "./contract.dto";


export interface UnderperformingAdsDTO {
  client_name: string;
  kpi_type: string;
  kpi_target: number;
  actual_value: number;
  date: Date;
}

export interface AdPerformanceWithContractAndClientDTO {
  id: number;
  client_id: number;
  date: Date;
  actual_value: number;
  contract: ContractWithClientAndKpiTypeDTO;
}


export interface AdPerformanceCreateDTO {
  client_id: number;
  contract_id: number;
  kpi_type_id: number;
  actual_value: number;
  date: string;
}

export interface AdPerformancesPayloadDTO {
  submitted_by: string;
  data: AdPerformanceCreateDTO[];
}


export interface AdPerformanceFiltersDTO {
  kpi_type_id?: number;
  client_id?: number;
  date?: Date;

}

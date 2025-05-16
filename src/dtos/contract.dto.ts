import { ClientDTO } from "./client.dto";
import { KpiTypeDTO } from "./kpiType.dto";

export interface ContractWithClientAndKpiTypeDTO {
  id: number;
  client_id: number;
  kpi_type_id: number;
  kpi_target: number;
  start_date: Date;
  end_date: Date;
  client: ClientDTO
  kpi_type: KpiTypeDTO
}

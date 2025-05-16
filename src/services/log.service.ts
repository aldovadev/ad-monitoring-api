import { getJobLogsRepo, getSubmissionLogsRepo } from "../repositories/log.repository";

export const getJoblogService = async (status: string) => {
  const jobLogs = await getJobLogsRepo(status);

  return jobLogs
};


export const getSubmissionlogService = async (status: string) => {
  const jobLogs = await getSubmissionLogsRepo(status);

  return jobLogs
};

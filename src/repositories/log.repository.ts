import prisma from "../config/prisma.client";

export const getJobLogsRepo = async (status: string) => {

  const jobLogs = await prisma.jobLog.findMany({
    where: {
      status: status === 'all' ? undefined : status,
    },
    orderBy: {
      imported_at: 'desc',
    },
  });
  return jobLogs
};


export const getSubmissionLogsRepo = async (submitted_by: string) => {

  const submissionLogs = await prisma.submissionLog.findMany({
    where: {
      submitted_by: submitted_by,
    },
    orderBy: {
      submitted_at: 'desc',
    },
  });
  return submissionLogs
};


export const createSubmissionLogRepo = async (submitted_by: string, rows: number) => {

  const submissionLog = await prisma.submissionLog.create({
    data: {
      submitted_by: submitted_by,
      row_count: rows,
    }
  });

  return submissionLog
};
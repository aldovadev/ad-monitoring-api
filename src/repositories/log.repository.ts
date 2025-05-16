import prisma from "../config/prisma.client";

export const getJobLogsRepo = async (status: string) => {

  const jobLogs = await prisma.jobLog.findMany({
    where: {
      status: status === 'all' ? undefined : status,
    },
    orderBy: {
      created_at: 'desc',
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
      created_at: 'desc',
    },
  });
  return submissionLogs
};


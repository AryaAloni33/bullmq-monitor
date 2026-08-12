const { Worker } = require("bullmq");
const redis = require("../config/redis");

const worker = new Worker(
  "email",
  async (job) => {
    console.log(`Processing job ${job.id}`);

    console.log("Job data:", job.data);

    // Simulate some work
    await new Promise((resolve) => {
      setTimeout(resolve, 3000);
    });

    console.log(`Job ${job.id} completed`);

    return {
      success: true,
      message: "Email processed successfully"
    };
  },
  {
    connection: redis
  }
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed successfully`);
});

worker.on("failed", (job, err) => {
  console.log(`Job ${job?.id} failed`);
  console.error(err);
});

console.log("Email worker started...");
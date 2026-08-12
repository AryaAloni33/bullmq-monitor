const express = require("express");
const emailQueue = require("../queues/emailQueue");

const router = express.Router();

// Create a new job
router.post("/jobs", async (req, res) => {
  try {
    const { email, message } = req.body;

    const job = await emailQueue.add("send-email", {
      email,
      message
    });

    res.json({
      success: true,
      jobId: job.id
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create job"
    });
  }
});

router.get("/jobs" , async(req ,res) =>{
  try{
    const jobs = await emailQueue.getJobs([
      "waiting",
      "active",
      "completed",
      "failed",
      "delayed",
      
    ])

      const formattedJobs = jobs.map((job) => ({
      id: job.id,
      name: job.name,
      data: job.data,
      status: job.finishedOn
        ? "completed" : job.failedReason ? "failed" : job.processedOn ? "active" : "waiting",
      createdAt: job.timestamp,
      processedAt: job.processedOn,
      finishedAt: job.finishedOn,
      failedReason: job.failedReason || null
    }));

    res.json(formattedJobs)
  }
  catch(error){
    console.error(error)

    res.status(500).json({
      success:false,
      message:"Failed to get jobs"
    })

  }
})

// Get queue statistics
router.get("/queues/email", async (req, res) => {
  try {
    const counts = await emailQueue.getJobCounts(
      "waiting",
      "active",
      "completed",
      "failed",
      "delayed"
    );

    res.json(counts);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to get queue statistics"
    });
  }
});

module.exports = router;
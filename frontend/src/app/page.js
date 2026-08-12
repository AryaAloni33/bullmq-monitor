"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [stats, setStats] = useState({
    waiting: 0,
    active: 0,
    completed: 0,
    failed: 0,
    delayed: 0
  });

  const [jobs, setJobs] = useState([]);

  // Fetch queue statistics
  const fetchStats = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/queues/email"
      );

      const data = await response.json();

      setStats(data);
    } catch (error) {
      console.error("Failed to fetch queue stats:", error);
    }
  };

  // Fetch actual jobs
  const fetchJobs = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/jobs"
      );

      const data = await response.json();

      setJobs(data);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    }
  };

  // Fetch data every second
  useEffect(() => {
    fetchStats();
    fetchJobs();

    const interval = setInterval(() => {
      fetchStats();
      fetchJobs();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const cards = [
    {
      title: "Waiting",
      value: stats.waiting,
      description: "Jobs waiting to be processed"
    },
    {
      title: "Active",
      value: stats.active,
      description: "Jobs currently processing"
    },
    {
      title: "Completed",
      value: stats.completed,
      description: "Successfully completed jobs"
    },
    {
      title: "Failed",
      value: stats.failed,
      description: "Jobs that failed"
    },
    {
      title: "Delayed",
      value: stats.delayed,
      description: "Jobs scheduled for later"
    }
  ];

  return (
    <main className="dashboard">

      {/* Header */}
      <header className="header">
        <div>
          <h1>BullMQ Monitor</h1>
          <p>Real-time queue monitoring</p>
        </div>

        <div className="status">
          <span className="status-dot"></span>
          System Online
        </div>
      </header>


      {/* Queue information */}
      <section className="queue-header">
        <div>
          <h2>Email Queue</h2>
          <p>Queue: Email</p>
        </div>
      </section>


      {/* Queue statistics */}
      <section className="cards">

        {cards.map((card) => (
          <div className="card" key={card.title}>

            <p className="card-title">
              {card.title}
            </p>

            <h3>
              {card.value}
            </h3>

            <p className="card-description">
              {card.description}
            </p>

          </div>
        ))}

      </section>


      {/* Queue activity */}
      <section className="activity">

        <h2>Queue Activity</h2>

        <div className="activity-box">

          <p>
            Monitoring queue every{" "}
            <strong>1 second</strong>
          </p>

          <p>
            Current processing jobs:{" "}
            <strong>{stats.active}</strong>
          </p>

          <p>
            Total Completed:{" "}
            <strong>{stats.completed}</strong>
          </p>

        </div>

      </section>


      {/* Recent jobs */}
      <section className="jobs-section">

        <h2>Recent Jobs</h2>

        <div className="jobs-table">

          {/* Table header */}
          <div className="jobs-header">

            <span>ID</span>

            <span>Type</span>

            <span>Status</span>

            <span>Email</span>

          </div>


          {/* No jobs */}
          {jobs.length === 0 ? (

            <p className="empty">
              No jobs found
            </p>

          ) : (

            /* Jobs */
            jobs.map((job) => (

              <div
                className="job-row"
                key={job.id}
              >

                <span>
                  {job.id}
                </span>

                <span>
                  {job.name}
                </span>

                <span>

                  <span
                    className={`badge ${job.status}`}
                  >
                    {job.status}
                  </span>

                </span>

                <span>
                  {job.data?.email}
                </span>

              </div>

            ))

          )}

        </div>

      </section>

    </main>
  );
}
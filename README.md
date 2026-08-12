# BullMQ Monitor

A simple web-based monitoring dashboard for applications using **BullMQ and Redis**.

## What is it?

Applications often use BullMQ to run background jobs such as:

- Sending emails
- Processing videos
- Generating reports
- Sending notifications
- Processing files

These jobs run in the background through BullMQ workers and Redis.

The problem is that developers don't always have an easy way to see what is happening with those jobs.

**BullMQ Monitor provides a dashboard to view and monitor them.**

```text
Your Application
       │
       ▼
    BullMQ
       │
       ▼
     Redis
       │
       ├──────────► Worker
       │              │
       │              ▼
       │          Process Job
       │
       ▼
BullMQ Monitor
       │
       ▼
   Web Dashboard
```

+++
title = "Real-Time Systems in Rockets"
date = 2024-09-22
template = "page.html"
+++

When you have 10ms to decide if your rocket needs to correct its trajectory, every clock cycle counts. No garbage collection, no dynamic allocation, no debugger attached.

### The Control Loop

In a GNC (Guidance, Navigation, Control) system, the loop is rigid:

1.  **Read Sensors** (IMU, GPS, Barometer)
2.  **State Estimation** (Kalman Filter)
3.  **Compute Control** (PID)
4.  **Actuate** (Servos)

If step 2 takes too long, step 4 happens too late. At Mach 0.8, latency equals instability.
+++
title = "Why Low-Level Matters"
date = 2024-10-15
template = "page.html"
+++

In un mondo di framework web, capire i puntatori sembra arcaico. Ma quando sei a Mach 1, il Garbage Collector non è tuo amico.

Ecco un esempio di gestione critica della memoria in C:

```c
void critical_loop() {
    // Non allocare mai qui dentro
    while(is_flying) {
        update_state();
        control_surfaces();
    }
}
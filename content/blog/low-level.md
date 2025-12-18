---
title: "Why Low-Level Matters"
date: 2024-10-15
draft: false
---

Quando scrivi codice per un razzo, il Garbage Collector non è tuo amico.

```c
void* ptr = malloc(1024);
// Se fallisce qui, non possiamo lanciare un'eccezione.
// Dobbiamo gestire il disastro.

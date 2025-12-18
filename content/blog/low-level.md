+++
title = "Why Low-Level Still Matters"
date = 2024-10-15
template = "page.html"
+++

In a world of abstractions and high-level frameworks, understanding how the machine actually works is what separates a programmer from a systems engineer.

When you write JavaScript, you don't worry about where your data lives. But when you write firmware for a braking system, every byte counts.

## The Core Problem

Here is an example of what I mean by memory control. If you get this wrong in a browser, you get a sad tab. If you get this wrong in a rocket, you get a crater.

```c
void* unsafe_ptr = (void*)0xDEADBEEF;
// Direct memory access requires discipline.
// In embedded systems, you are the garbage collector.
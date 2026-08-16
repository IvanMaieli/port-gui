+++
title = "Kern: a new journey"
date = 2026-08-16
draft = false
+++

Lately I’ve been in the mood for projects. I’m studying the behavior of LLMs in great detail, analyzing their responses and trying every possible way to trip them up: in effect, I’m working as a **model evaluator**. I must say it’s interesting, but not enough to outweigh the appeal of investing my time in a **side project**. The excellent _antirez_ has sparked a great deal of curiosity in me regarding inference engines, and more generally, software optimized for specific platforms rather than general-purpose software. So I decided to take the plunge and start designing an **AI inference engine** written primarily in **C++**, but which will, inevitably, need to integrate other languages for **Apple Silicon** optimization (Objective-C…). I’ve been studying things that might be useful, particularly **C++20**, so as to create a product that’s in step with the times, or at least one that inherits good practices from the language itself. In the end, I decided to call it _Kern_, which obviously refers to the ‘Kernel’ – a rather important concept in both computer science and algebra. The main goal is to create software that’s done **WELL**. 
I will develop a library (_Kern_) that deals specifically with data structures and how they interact with the hardware, as well as how they interact with one another (various tensor operations and low-level implementations), a _Kern Runtime_ for performing actual model inference (Sorry, but I’ve got limited RAM available, so for now you’ll probably only get implementations of small models <10B from me), and, of course, a **suite of tests** to verify that the software doesn’t break when modified. 
**Please support this if you’re interested!** 
(https://github.com/IvanMaieli/kern)

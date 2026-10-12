# Voice-over: What happens when you run a Java program?

Target length: ~60 seconds. [marker] = timeline event to drag onto the matching word.

| Time | Marker | Say |
|---|---|---|
| 0:00 | — | "You type **java Main** and hit enter. But what *really* happens inside? Let's break it down." |
| 0:05 | `source` | "First, you write source code. Main.java." |
| 0:08 | `javac` | "The **javac** compiler turns it into **bytecode**, a Main.class file. Not machine code. Bytecode." |
| 0:13 | `jvm` | "When you run **java Main**, the **JVM** starts up." |
| 0:17 | `anyos` | "Every OS has its own JVM, so the same .class file runs anywhere." |
| 0:21 | `inside` | "Inside the JVM, three things happen." |
| 0:23 | `classloader` | "One: the **Class Loader**." |
| 0:25 | `load` | "It **loads** your class," |
| 0:26 | `link` | "**links** it, verifying the bytecode is safe," |
| 0:29 | `init` | "and **initializes** it, running your static blocks." |
| 0:31 | `memory` | "Two: **memory** gets set up." |
| 0:33 | `metaspace` | "Class metadata goes to **Metaspace**," |
| 0:35 | `heap` | "every object you create lives on the **Heap**," |
| 0:37 | `stack` | "and each thread gets its own **Stack** for method calls," |
| 0:40 | `pc` | "plus a PC register and a native stack." |
| 0:42 | `engine` | "Three: the **Execution Engine**." |
| 0:44 | `interpreter` | "The **interpreter** runs bytecode line by line." |
| 0:47 | `jit` | "The **JIT compiler** spots hot code and compiles it to native machine code. That's why Java gets *faster* as it runs." |
| 0:51 | `gc` | "And the **Garbage Collector** cleans up objects you no longer use." |
| 0:55 | `output` | "Finally, **Hi** prints on your screen." |
| 0:59 | `outro` | "Write once, run anywhere. Follow for part 2, where we go deep into JVM memory." |

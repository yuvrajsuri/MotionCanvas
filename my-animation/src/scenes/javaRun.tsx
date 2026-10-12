import {Circle, Line, makeScene2D, Node, Rect, Txt} from '@motion-canvas/2d';
import {
  all,
  createRef,
  easeOutBack,
  sequence,
  waitFor,
  waitUntil,
} from '@motion-canvas/core';

const BG = '#0b1120';
const TEXT = '#e2e8f0';
const MUTED = '#94a3b8';
const ORANGE = '#f89820';
const BLUE = '#38bdf8';
const PURPLE = '#a78bfa';
const GREEN = '#34d399';
const PINK = '#f472b6';
const MONO = 'Consolas, JetBrains Mono, monospace';
const SANS = 'Segoe UI, Inter, sans-serif';

type RectRef = ReturnType<typeof createRef<Rect>>;

// Pop a node in: fade + slight overshoot scale.
function* pop(node: Node, d = 0.4) {
  node.scale(0.8);
  yield* all(node.opacity(1, d), node.scale(1, d, easeOutBack));
}

// Brief glow to draw the eye to something already on screen.
function* pulse(node: Rect, color: string) {
  node.shadowColor(color);
  yield* node.shadowBlur(50, 0.3).to(0, 0.6);
}

function chip(
  ref: RectRef,
  x: number,
  y: number,
  w: number,
  h: number,
  color: string,
  title: string,
  sub: string,
  titleSize = 32,
) {
  return (
    <Rect
      ref={ref}
      x={x}
      y={y}
      width={w}
      height={h}
      radius={16}
      fill={color + '22'}
      stroke={color}
      lineWidth={3}
      opacity={0}
    >
      <Txt y={-20} text={title} fontFamily={SANS} fontSize={titleSize}
           fontWeight={700} fill={TEXT} />
      <Txt y={26} text={sub} fontFamily={SANS} fontSize={24} fill={MUTED} />
    </Rect>
  );
}

function section(ref: RectRef, y: number, h: number, color: string, label: string) {
  return (
    <Rect ref={ref} y={y} width={900} height={h} radius={20}
          fill={color + '10'} stroke={color + '88'} lineWidth={2} opacity={0}>
      <Txt y={-h / 2 + 38} text={label} fontFamily={SANS} fontSize={36}
           fontWeight={700} fill={color} />
    </Rect>
  );
}

export default makeScene2D(function* (view) {
  view.fill(BG);

  // ───────────── 1. Hook ─────────────
  const hook = createRef<Txt>();
  const cmd = createRef<Rect>();
  const cmdText = createRef<Txt>();

  view.add(
    <>
      <Txt ref={hook} y={-200} text={'What really happens\nwhen you run'}
           fontFamily={SANS} fontSize={64} fontWeight={700} fill={TEXT}
           textAlign="center" lineHeight={84} opacity={0} />
      <Rect ref={cmd} y={20} padding={[28, 48]} radius={20} fill="#111827"
            stroke={ORANGE} lineWidth={4} opacity={0} layout>
        <Txt ref={cmdText} text="" fontFamily={MONO} fontSize={76} fill={ORANGE} />
      </Rect>
    </>,
  );

  yield* hook().opacity(1, 0.6);
  yield* all(cmd().opacity(1, 0.3), cmdText().text('$ java Main', 0.9));

  // ───────────── 2. Compile pipeline ─────────────
  const src = createRef<Rect>();
  const cls = createRef<Rect>();
  const jvm = createRef<Rect>();
  const jvmTitle = createRef<Txt>();
  const jvmSub = createRef<Txt>();
  const arrow1 = createRef<Line>();
  const arrow2 = createRef<Line>();
  const javacLbl = createRef<Txt>();
  const javaLbl = createRef<Txt>();
  const anyOs = createRef<Txt>();

  view.add(
    <>
      <Rect ref={src} y={-500} width={860} height={300} radius={20}
            fill={BLUE + '14'} stroke={BLUE} lineWidth={3} opacity={0}>
        <Txt y={-110} text="Main.java  (source code)" fontFamily={SANS}
             fontSize={34} fontWeight={700} fill={BLUE} />
        <Txt y={30} fontFamily={MONO} fontSize={30} fill={TEXT} lineHeight={42}
             text={'class Main {\n  public static void main(String[] a) {\n    System.out.println("Hi");\n  }\n}'} />
      </Rect>

      <Line ref={arrow1} points={[[0, -340], [0, -210]]} stroke={MUTED}
            lineWidth={6} endArrow arrowSize={18} end={0} />
      <Txt ref={javacLbl} x={120} y={-275} text="javac" fontFamily={MONO}
           fontSize={38} fill={ORANGE} opacity={0} />

      <Rect ref={cls} y={-70} width={860} height={260} radius={20}
            fill={PURPLE + '14'} stroke={PURPLE} lineWidth={3} opacity={0}>
        <Txt y={-90} text="Main.class  (bytecode)" fontFamily={SANS}
             fontSize={34} fontWeight={700} fill={PURPLE} />
        <Txt y={25} fontFamily={MONO} fontSize={30} fill={TEXT} lineHeight={40}
             text={'getstatic     System.out\nldc           "Hi"\ninvokevirtual println\nreturn'} />
      </Rect>

      <Line ref={arrow2} points={[[0, 70], [0, 200]]} stroke={MUTED}
            lineWidth={6} endArrow arrowSize={18} end={0} />
      <Txt ref={javaLbl} x={110} y={135} text="java" fontFamily={MONO}
           fontSize={38} fill={ORANGE} opacity={0} />

      <Rect ref={jvm} y={320} width={860} height={220} radius={20}
            fill={ORANGE + '10'} stroke={ORANGE} lineWidth={3} opacity={0}>
        <Txt ref={jvmTitle} y={-35} text="JVM" fontFamily={SANS} fontSize={64}
             fontWeight={800} fill={ORANGE} />
        <Txt ref={jvmSub} y={45} text="Java Virtual Machine" fontFamily={SANS}
             fontSize={32} fill={MUTED} />
      </Rect>

      <Txt ref={anyOs} y={540} text={'Same .class file\nruns on Windows • Linux • macOS'}
           fontFamily={SANS} fontSize={38} fontWeight={700} fill={GREEN}
           textAlign="center" lineHeight={54} opacity={0} />
    </>,
  );

  yield* waitUntil('source');
  yield* all(
    hook().opacity(0, 0.4),
    cmd().y(-760, 0.6),
    cmd().scale(0.7, 0.6),
  );
  yield* pop(src());

  yield* waitUntil('javac');
  yield* all(arrow1().end(1, 0.5), javacLbl().opacity(1, 0.5));
  yield* pop(cls());

  yield* waitUntil('jvm');
  yield* all(arrow2().end(1, 0.5), javaLbl().opacity(1, 0.5));
  yield* pop(jvm());

  yield* waitUntil('anyos');
  yield* pop(anyOs());

  // ───────────── 3. Inside the JVM ─────────────
  // The JVM card grows into a container that holds everything below.
  yield* waitUntil('inside');
  yield* all(
    src().opacity(0, 0.4),
    cls().opacity(0, 0.4),
    arrow1().opacity(0, 0.4),
    arrow2().opacity(0, 0.4),
    javacLbl().opacity(0, 0.4),
    javaLbl().opacity(0, 0.4),
    anyOs().opacity(0, 0.4),
    jvmSub().opacity(0, 0.4),
  );
  yield* all(
    jvm().y(-110, 0.8),
    jvm().width(980, 0.8),
    jvm().height(1140, 0.8),
    jvm().fill(ORANGE + '06', 0.8),
    jvmTitle().y(-530, 0.8),
    jvmTitle().fontSize(44, 0.8),
  );

  const clSec = createRef<Rect>();
  const memSec = createRef<Rect>();
  const exSec = createRef<Rect>();
  const load = createRef<Rect>();
  const link = createRef<Rect>();
  const init = createRef<Rect>();
  const clArrows = createRef<Node>();
  const meta = createRef<Rect>();
  const heap = createRef<Rect>();
  const stack = createRef<Rect>();
  const pc = createRef<Rect>();
  const nativeStack = createRef<Rect>();
  const interp = createRef<Rect>();
  const jit = createRef<Rect>();
  const gc = createRef<Rect>();
  const note = createRef<Txt>();

  view.add(
    <>
      {section(clSec, -475, 250, BLUE, '①  Class Loader')}
      {chip(load, -310, -450, 240, 120, BLUE, 'Load', 'find .class')}
      {chip(link, 0, -450, 240, 120, BLUE, 'Link', 'verify bytecode')}
      {chip(init, 310, -450, 240, 120, BLUE, 'Initialize', 'run static { }')}
      <Node ref={clArrows} opacity={0}>
        <Txt x={-155} y={-450} text="→" fontSize={44} fill={MUTED} />
        <Txt x={155} y={-450} text="→" fontSize={44} fill={MUTED} />
      </Node>

      {section(memSec, -110, 440, PURPLE, '②  Runtime Memory')}
      {chip(meta, -300, -170, 260, 140, PURPLE, 'Metaspace', 'class metadata')}
      {chip(heap, 0, -170, 260, 140, PINK, 'Heap', 'all objects')}
      {chip(stack, 300, -170, 260, 140, PURPLE, 'Stack', '1 per thread')}
      {chip(pc, -205, 10, 390, 120, PURPLE, 'PC Register', 'current instruction')}
      {chip(nativeStack, 205, 10, 390, 120, PURPLE, 'Native Stack', 'C/C++ calls')}

      {section(exSec, 280, 300, GREEN, '③  Execution Engine')}
      {chip(interp, -305, 300, 280, 150, GREEN, 'Interpreter', 'line by line')}
      {chip(jit, 0, 300, 280, 150, GREEN, 'JIT Compiler', 'hot code → native')}
      {chip(gc, 305, 300, 280, 150, GREEN, 'Garbage Collector', 'frees unused heap', 28)}

      <Txt ref={note} y={560} text="" fontFamily={SANS} fontSize={38}
           fontWeight={700} fill={ORANGE} textAlign="center" />
    </>,
  );

  yield* waitUntil('classloader');
  yield* pop(clSec());
  yield* waitUntil('load');
  yield* pop(load());
  yield* waitUntil('link');
  yield* all(clArrows().opacity(1, 0.4), pop(link()));
  yield* waitUntil('init');
  yield* pop(init());

  yield* waitUntil('memory');
  yield* pop(memSec());
  yield* waitUntil('metaspace');
  yield* pop(meta());
  yield* waitUntil('heap');
  yield* pop(heap());
  yield* waitUntil('stack');
  yield* pop(stack());
  yield* waitUntil('pc');
  yield* sequence(0.15, pop(pc()), pop(nativeStack()));

  yield* waitUntil('engine');
  yield* pop(exSec());
  yield* waitUntil('interpreter');
  yield* pop(interp());
  yield* waitUntil('jit');
  yield* pop(jit());
  yield* all(pulse(jit(), GREEN), note().text('Java gets faster as it runs ⚡', 0.8));
  yield* waitUntil('gc');
  yield* all(note().text('', 0.3), pop(gc()));
  yield* all(pulse(gc(), GREEN), pulse(heap(), PINK));

  // ───────────── 4. Output + outro ─────────────
  const term = createRef<Rect>();
  const l1 = createRef<Txt>();
  const l2 = createRef<Txt>();
  const l3 = createRef<Txt>();
  const outro1 = createRef<Txt>();
  const outro2 = createRef<Txt>();
  const follow = createRef<Rect>();

  view.add(
    <>
      <Rect ref={term} y={-150} width={900} height={420} radius={20}
            fill="#0d1117" stroke="#30363d" lineWidth={3} opacity={0}>
        <Circle x={-400} y={-175} size={22} fill="#ff5f57" />
        <Circle x={-365} y={-175} size={22} fill="#febc2e" />
        <Circle x={-330} y={-175} size={22} fill="#28c840" />
        <Txt ref={l1} offset={[-1, -1]} x={-400} y={-110} text=""
             fontFamily={MONO} fontSize={44} fill={TEXT} />
        <Txt ref={l2} offset={[-1, -1]} x={-400} y={-30} text=""
             fontFamily={MONO} fontSize={44} fill={TEXT} />
        <Txt ref={l3} offset={[-1, -1]} x={-400} y={50} text=""
             fontFamily={MONO} fontSize={52} fontWeight={700} fill={GREEN} />
      </Rect>

      <Txt ref={outro1} y={170} text="Write once, run anywhere."
           fontFamily={SANS} fontSize={60} fontWeight={800} fill={TEXT} opacity={0} />
      <Txt ref={outro2} y={260} text="Bytecode + JVM = portable Java"
           fontFamily={SANS} fontSize={38} fill={MUTED} opacity={0} />
      <Rect ref={follow} y={420} padding={[24, 44]} radius={50} fill={ORANGE}
            opacity={0} layout>
        <Txt text="Follow for Part 2 → JVM Memory" fontFamily={SANS}
             fontSize={38} fontWeight={800} fill={BG} />
      </Rect>
    </>,
  );

  yield* waitUntil('output');
  const jvmParts = [
    jvm(), clSec(), memSec(), exSec(), load(), link(), init(), clArrows(),
    meta(), heap(), stack(), pc(), nativeStack(), interp(), jit(), gc(),
  ];
  yield* all(...jvmParts.map(n => n.opacity(0, 0.5)));
  yield* pop(term());
  yield* l1().text('$ javac Main.java', 0.6);
  yield* l2().text('$ java Main', 0.5);
  yield* waitFor(0.2);
  yield* l3().text('Hi', 0.2);
  yield* pulse(term(), GREEN);

  yield* waitUntil('outro');
  yield* term().y(-380, 0.6);
  yield* sequence(0.25, pop(outro1()), pop(outro2()), pop(follow()));
  yield* waitFor(3);
});

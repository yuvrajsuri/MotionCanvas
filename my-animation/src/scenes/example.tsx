import {makeScene2D, Rect, Txt, Line} from '@motion-canvas/2d';
import {all, createRef, waitUntil} from '@motion-canvas/core';

export default makeScene2D(function* (view) {
  const client = createRef<Rect>();
  const server = createRef<Rect>();
  const db = createRef<Rect>();
  const toServer = createRef<Line>();
  const toDb = createRef<Line>();
  const title = createRef<Txt>();

  view.fill('#0f172a');

  view.add(
    <>
      <Txt ref={title} y={-750} fontSize={64} fontWeight={700} fill="#f8fafc"
           text="How to store API tokens" opacity={0} />

      <Rect ref={client} y={-400} width={500} height={160} radius={24}
            fill="#2563eb" opacity={0}>
        <Txt text="Client" fill="white" fontSize={52} />
      </Rect>

      <Rect ref={server} y={0} width={500} height={160} radius={24}
            fill="#7c3aed" opacity={0}>
        <Txt text="Server: SHA-256" fill="white" fontSize={48} />
      </Rect>

      <Rect ref={db} y={400} width={500} height={160} radius={24}
            fill="#059669" opacity={0}>
        <Txt text="DB: hash only" fill="white" fontSize={48} />
      </Rect>

      <Line ref={toServer} points={[[0, -310], [0, -90]]} stroke="#e2e8f0"
            lineWidth={8} endArrow end={0} />
      <Line ref={toDb} points={[[0, 90], [0, 310]]} stroke="#e2e8f0"
            lineWidth={8} endArrow end={0} />
    </>,
  );

  yield* title().opacity(1, 0.6);

  yield* waitUntil('client');
  yield* client().opacity(1, 0.5);

  yield* waitUntil('send');
  yield* toServer().end(1, 0.6);
  yield* server().opacity(1, 0.5);

  yield* waitUntil('store');
  yield* toDb().end(1, 0.6);
  yield* all(db().opacity(1, 0.5), db().scale(1.1, 0.3).to(1, 0.3));
});

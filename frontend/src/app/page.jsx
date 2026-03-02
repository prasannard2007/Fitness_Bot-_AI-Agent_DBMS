import Nav from '../components/Nav';

export default function Home() {
  return (
    <>
      <Nav />
      <section className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-8">
        <p className="mb-2 text-sm uppercase tracking-[0.18em] text-cyan-300">Autonomous Fitness Intelligence</p>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Train smarter with your AI Fitness Bot</h1>
        <p className="mt-4 max-w-2xl text-slate-300">
          Personalized workouts, nutrition tracking, progress analytics, and a ChatGPT-like AI coach experience in one responsive app.
        </p>
      </section>
    </>
  );
}

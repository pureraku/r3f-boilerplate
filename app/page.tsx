"use client";
import Scene from "@/components/Scene";

export default function Home() {
  const handleReset = () => {
    if (typeof (window as any).resetBoxPhysics === "function") {
      (window as any).resetBoxPhysics();
    }
  };

  return (
    <>
      <div className="relative flex h-screen w-screen justify-center items-center bg-zinc-950">
        
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10 text-center flex flex-col items-center gap-4">
          <h1 className="text-white text-xl font-semibold tracking-wide drop-shadow-md select-none bg-black/40 px-5 py-2 rounded-full border border-white/10 backdrop-blur-sm pointer-events-none">
            Click the box to see an explosion
          </h1>

          <button
            onClick={handleReset}
            className="pointer-events-auto bg-blue-600 hover:bg-purple-500 active:scale-95 text-white font-medium tracking-wide px-6 py-2.5 rounded-lg border border-red-500/20 shadow-lg shadow-red-950/40 transition-all duration-150 cursor-pointer text-sm"
          >
            Reset Box Position
          </button>
        </div>

        <div className="w-full h-full">
          <Scene />
        </div>

      </div>
    </>
  );
}

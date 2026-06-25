import { useState } from "react";

export default function PlayerSelect({ onSelect }) {
  const [loading, setLoading] = useState(false);

  const choosePlayer = () => {
    setLoading(true);

    localStorage.setItem("player", "1");

    onSelect(1);
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-6">

      <div className="bg-zinc-900 border border-yellow-700 rounded-2xl shadow-2xl p-10 w-full max-w-lg">

        <h1 className="text-5xl font-bold text-yellow-400 text-center mb-2">
          ELDEN RING
        </h1>

        <h2 className="text-3xl text-center mb-10">
          BINGO
        </h2>

        <button
          disabled={loading}
          onClick={choosePlayer}
          className="
            w-full
            bg-red-700
            hover:bg-red-600
            transition
            rounded-xl
            py-5
            text-2xl
            font-bold
          "
        >
          🟥 Player 1
        </button>

        <button
          disabled
          className="
            w-full
            mt-5
            bg-zinc-800
            rounded-xl
            py-5
            text-2xl
            opacity-40
            cursor-not-allowed
          "
        >
          🟦 Player 2
          <div className="text-sm mt-1">
            Coming Soon
          </div>
        </button>

      </div>

    </div>
  );
}
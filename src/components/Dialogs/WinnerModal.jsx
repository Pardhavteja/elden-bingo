export default function WinnerModal({
  winner,
  reason,
  onReset,
  isHost,
  player1Score,
  player2Score,
}) {
  if (!winner) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4">

      <div className="w-full max-w-md bg-zinc-900 border border-yellow-600 rounded-2xl shadow-2xl p-8">

        {/* Trophy */}

        <div className="text-center">

          <div className="text-6xl">
            🏆
          </div>

          <h1 className="text-4xl font-bold text-yellow-400 mt-4">
            Player {winner} Wins!
          </h1>

          <p className="text-zinc-300 mt-3 text-lg">

            {reason === "BINGO"
              ? "Victory by Bingo!"
              : "Victory by Majority (13 Objectives)."}

          </p>

        </div>

        {/* Score */}

        <div className="mt-8 border-t border-zinc-700 pt-6">

          <h2 className="text-xl font-bold text-center text-yellow-400 mb-5">
            Final Score
          </h2>

          <div className="flex justify-between items-center text-lg">

            <span className="text-red-400 font-semibold">
              Player 1
            </span>

            <span className="font-bold">
              {player1Score}
            </span>

          </div>

          <div className="flex justify-between items-center text-lg mt-3">

            <span className="text-blue-400 font-semibold">
              Player 2
            </span>

            <span className="font-bold">
              {player2Score}
            </span>

          </div>

        </div>

        {/* Button */}

        <div className="mt-8">

          {isHost ? (

            <button
              onClick={onReset}
              className="
                w-full
                bg-yellow-600
                hover:bg-yellow-500
                rounded-xl
                py-3
                text-lg
                font-bold
                transition
              "
            >
              Play Again
            </button>

          ) : (

            <div className="text-center text-zinc-400">

              Waiting for the host to
              <br />
              start a new game...

            </div>

          )}

        </div>

      </div>

    </div>
  );
}
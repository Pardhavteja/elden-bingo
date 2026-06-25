import { Link, useParams } from "react-router-dom";

import Header from "../components/Header/Header";
import PlayerCard from "../components/Player/PlayerCard";
import BingoBoard from "../components/Board/BingoBoard";
import WinnerModal from "../components/Dialogs/WinnerModal";

import useRoom from "../hooks/useRoom";

export default function Game() {
  const { roomId } = useParams();

let currentPlayer = Number(
  localStorage.getItem(`player_${roomId}`)
);

let isHost =
  localStorage.getItem(`host_${roomId}`) === "true";

// Direct link with no assigned player
if (!currentPlayer) {
  currentPlayer = 2;

  localStorage.setItem(
    `player_${roomId}`,
    "2"
  );

  localStorage.removeItem(
    `host_${roomId}`
  );

  window.location.reload();
}

console.log("Room:", roomId);
console.log("Player:", currentPlayer);
console.log("Host:", isHost);

  const {
    loading,
    roomNotFound,
    game,
    claimTile,
    resetBoard,
    completed,
  } = useRoom(roomId);

  //////////////////////////////////////
  // Loading
  //////////////////////////////////////

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        <h1 className="text-4xl font-bold text-yellow-500">
          Loading...
        </h1>
      </div>
    );
  }

  //////////////////////////////////////
  // Room Doesn't Exist
  //////////////////////////////////////

  if (roomNotFound) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-6">

        <div className="text-center">

          <h1 className="text-5xl font-bold text-red-500">
            Room Not Found
          </h1>

          <p className="text-zinc-400 mt-4">
            Ask your friend for a valid room code.
          </p>

          <Link
            to="/"
            className="
              inline-block
              mt-8
              bg-yellow-600
              hover:bg-yellow-500
              transition
              rounded-xl
              px-6
              py-3
              font-bold
            "
          >
            Back Home
          </Link>

        </div>

      </div>
    );
  }

  //////////////////////////////////////
  // Game
  //////////////////////////////////////

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      <Header
        roomCode={roomId}
        onCopy={() => {
          navigator.clipboard.writeText(window.location.href);
          alert("Invite link copied!");
        }}
        onReset={isHost ? resetBoard : undefined}
      />

      <main className="max-w-7xl mx-auto px-6 py-8">

        {/* Players */}

        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-6
            mb-8
          "
        >

         <PlayerCard
playerName="Player 1"
playerNumber={1}
completed={completed(1)}
bingos={0}
connected={game?.players?.player1?.connected ?? false
}
/>

          <PlayerCard
playerName="Player 2"
playerNumber={2}
completed={completed(2)}
bingos={0}
connected={game?.players?.player2?.connected ?? false}
/>

        </div>

        {/* Board */}

        <section
          className="
            bg-zinc-900
            border
            border-yellow-700
            rounded-2xl
            shadow-xl
            p-6
          "
        >

          <div className="flex justify-between items-center mb-6">

            <div>

              <h2 className="text-2xl font-bold text-yellow-400">
                Room {roomId}
              </h2>

              <p className="text-zinc-400">
                First player to claim an objective owns it.
              </p>

            </div>

            <div className="text-right">

              <p className="text-sm text-zinc-500">
                You are
              </p>

              <p
                className={`font-bold ${
                  currentPlayer === 1
                    ? "text-red-500"
                    : "text-blue-500"
                }`}
              >
                Player {currentPlayer}
              </p>

            </div>

          </div>

          <BingoBoard
            board={game.board}
            claimedBy={game.claimedBy}
            currentPlayer={currentPlayer}
            onTileClick={(index) =>
              claimTile(currentPlayer, index)
            }
          />

        </section>

      </main>

     <WinnerModal
    winner={game.winner}
    reason={game.winReason}
    isHost={isHost}
    onReset={resetBoard}
    player1Score={completed(1)}
    player2Score={completed(2)}
/>

    </div>
  );
}
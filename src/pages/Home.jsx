import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaDragon } from "react-icons/fa";

export default function Home() {
  const navigate = useNavigate();

  const [roomCode, setRoomCode] = useState("");

  function generateRoomCode(length = 6) {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

    let code = "";

    for (let i = 0; i < length; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }

    return code;
  }

  function createRoom() {
    const roomId = generateRoomCode();

    localStorage.setItem(`player_${roomId}`, "1");
    localStorage.setItem(`host_${roomId}`, "true");

    navigate(`/${roomId}`);
  }

 function joinRoom() {
  if (!roomCode.trim()) return;

  navigate(`/${roomCode.toUpperCase()}`);
}

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-6">

      <div className="w-full max-w-xl bg-zinc-900 border border-yellow-700 rounded-3xl shadow-2xl p-10">

        <div className="flex flex-col items-center">

          <FaDragon className="text-yellow-500 text-6xl mb-6" />

          <h1 className="text-5xl font-bold text-yellow-400">
            ELDEN RING
          </h1>

          <h2 className="text-3xl mt-2">
            BINGO
          </h2>

          <p className="text-zinc-400 text-center mt-8">
            Race your friends through Elden Ring.
            <br />
            Claim objectives before they do.
            <br />
            First player to get Bingo wins.
          </p>

          <button
            onClick={createRoom}
            className="
              w-full
              mt-10
              bg-yellow-600
              hover:bg-yellow-500
              rounded-xl
              py-4
              text-xl
              font-bold
              transition
            "
          >
            Create Room
          </button>

          <div className="w-full flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-zinc-700"></div>

            <span className="text-zinc-500">
              OR
            </span>

            <div className="flex-1 h-px bg-zinc-700"></div>
          </div>

          <input
            value={roomCode}
            maxLength={6}
            onChange={(e) =>
              setRoomCode(e.target.value.toUpperCase())
            }
            placeholder="Room Code"
            className="
              w-full
              bg-zinc-800
              border
              border-zinc-700
              rounded-xl
              p-4
              text-center
              tracking-[0.3em]
              uppercase
              outline-none
              focus:border-yellow-500
            "
          />

          <button
            onClick={joinRoom}
            className="
              w-full
              mt-5
              bg-red-700
              hover:bg-red-600
              rounded-xl
              py-4
              text-xl
              font-bold
              transition
            "
          >
            Join Room
          </button>

        </div>

      </div>

    </div>
  );
}
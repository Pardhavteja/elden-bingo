import { FaDragon } from "react-icons/fa";
import { FaRotateRight } from "react-icons/fa6";
import { MdContentCopy } from "react-icons/md";

export default function Header({
  roomCode,
  onCopy,
  onReset,
}) {
  return (
    <header className="w-full bg-zinc-900 border-b border-yellow-700 shadow-lg">

      <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Logo */}

        <div className="flex items-center gap-4">

          <FaDragon className="text-yellow-500 text-5xl" />

          <div>

            <h1 className="text-3xl font-bold text-yellow-400">
              Elden Ring Bingo
            </h1>

            <p className="text-zinc-400">
              Multiplayer Race
            </p>

          </div>

        </div>

        {/* Controls */}

        <div className="flex items-center gap-3">

          <div className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2">

            Room

            <span className="ml-2 text-yellow-400 font-bold">
              {roomCode}
            </span>

          </div>

          <button
            onClick={onCopy}
            className="
              flex
              items-center
              gap-2
              bg-zinc-800
              hover:bg-zinc-700
              rounded-lg
              px-4
              py-2
              transition
            "
          >
            <MdContentCopy />
            Invite
          </button>

          {onReset ? (

            <button
              onClick={onReset}
              className="
                flex
                items-center
                gap-2
                bg-yellow-600
                hover:bg-yellow-500
                rounded-lg
                px-4
                py-2
                font-semibold
                transition
              "
            >
              <FaRotateRight />
              Reset
            </button>

          ) : (

            <div
              className="
                px-4
                py-2
                rounded-lg
                bg-zinc-800
                text-zinc-500
                font-semibold
              "
            >
              Host Only
            </div>

          )}

        </div>

      </div>

    </header>
  );
}
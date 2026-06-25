import ProgressBar from "./ProgressBar";

export default function PlayerCard({
  playerName,
  playerNumber,
  completed,
  bingos,
  connected,
}) {
  const color =
    playerNumber === 1
      ? "bg-red-600"
      : "bg-blue-600";

  return (
    <div
      className="
      bg-zinc-900
      border
      border-yellow-700
      rounded-2xl
      shadow-xl
      p-6
      "
    >
      <div className="flex justify-between items-center">

        <div>

          <h2 className="text-2xl font-bold">
            {playerName}
          </h2>

          <div className="flex items-center gap-2 mt-1">

<div
className={`

w-3

h-3

rounded-full

${connected
?"bg-green-500"
:"bg-red-500"}

`}
/>

<p className="text-zinc-400">

{connected
?"Connected"
:"Disconnected"}

</p>

</div>

        </div>

        <div
          className={`
            ${color}
            w-10
            h-10
            rounded-full
          `}
        />

      </div>

      <div className="mt-5">

        <ProgressBar
          current={completed}
          total={25}
        />

      </div>

      <div className="flex justify-between mt-5">

        <div>

          <p className="text-zinc-500 text-sm">
            Claimed
          </p>

          <p className="text-2xl font-bold">
            {completed}
          </p>

        </div>

        <div>

          <p className="text-zinc-500 text-sm">
            Bingos
          </p>

          <p className="text-2xl font-bold text-yellow-400">
            {bingos}
          </p>

        </div>

      </div>

    </div>
  );
}
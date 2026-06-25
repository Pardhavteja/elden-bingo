export default function ProgressBar({
  current,
  total,
}) {
  const percent =
    (current / total) * 100;

  return (
    <div>

      <div className="flex justify-between text-sm text-zinc-400 mb-2">

        <span>
          Progress
        </span>

        <span>
          {current}/{total}
        </span>

      </div>

      <div className="w-full h-3 rounded-full bg-zinc-800 overflow-hidden">

        <div
          className="
            h-full
            bg-yellow-500
            transition-all
            duration-500
          "
          style={{
            width: `${percent}%`,
          }}
        />

      </div>

    </div>
  );
}
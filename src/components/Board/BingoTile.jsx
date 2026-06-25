import { motion } from "framer-motion";

export default function BingoTile({
  objective,
  owner,
  currentPlayer,
  onClick,
}) {
  let bg =
    "bg-zinc-900 border-yellow-700 hover:bg-zinc-800";

  if (owner === 1)
    bg =
      "bg-red-700 border-red-500";

  if (owner === 2)
    bg =
      "bg-blue-700 border-blue-500";

  const clickable = owner === 0;

  return (
    <motion.button
      whileHover={
        clickable
          ? { scale: 1.03 }
          : {}
      }
      whileTap={
        clickable
          ? { scale: 0.96 }
          : {}
      }
      onClick={
        clickable
          ? onClick
          : undefined
      }
      disabled={!clickable}
      className={`
        ${bg}

        aspect-square
        rounded-xl
        border-2
        shadow-lg

        p-2
        sm:p-3

        flex
        items-center
        justify-center

        text-center

        text-[11px]
        sm:text-sm
        md:text-base

        transition-all
        duration-300

        font-medium

        select-none

        disabled:cursor-default
      `}
    >
      {objective}
    </motion.button>
  );
}
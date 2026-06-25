import BingoTile from "./BingoTile";

export default function BingoBoard({
  board,
  claimedBy,
  currentPlayer,
  onTileClick,
}) {
  if (!board || !claimedBy) return null;

  return (
    <div
      className="
        grid
        grid-cols-5
        gap-3
        md:gap-4
      "
    >
      {board.map((objective, index) => (
        <BingoTile
          key={index}
          objective={objective}
          owner={claimedBy[index]}
          currentPlayer={currentPlayer}
          onClick={() => onTileClick(index)}
        />
      ))}
    </div>
  );
}
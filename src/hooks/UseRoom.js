import { useEffect, useState } from "react";

import {
  getRoom,
  createRoom,
  subscribeRoom,
  updateRoom,
  updatePlayerConnection,
} from "../firebase/firestore";

import { generateBoard } from "../utils/boardGenerator";
import { checkWinner } from "../utils/bingoChecker";

export default function useRoom(roomId) {
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [roomNotFound, setRoomNotFound] = useState(false);

  const isHost =
    localStorage.getItem(`host_${roomId}`) === "true";

  const player =
    Number(localStorage.getItem(`player_${roomId}`));

  useEffect(() => {
    let unsubscribe = null;

    async function init() {
      try {
        const room = await getRoom(roomId);

        //////////////////////////////////////
        // Room doesn't exist
        //////////////////////////////////////

        if (!room.exists()) {
          if (!isHost) {
            setRoomNotFound(true);
            setLoading(false);
            return;
          }

          await createRoom(
            roomId,
            generateBoard()
          );
        }

        //////////////////////////////////////
        // Subscribe
        //////////////////////////////////////

        unsubscribe = subscribeRoom(
          roomId,
          (snapshot) => {
            if (snapshot.exists()) {
              setGame(snapshot.data());
            }

            setLoading(false);
          }
        );

        //////////////////////////////////////
        // Connected
        //////////////////////////////////////

        if (player === 1 || player === 2) {
          await updatePlayerConnection(
            roomId,
            player,
            true
          );
        }
      } catch (err) {
        console.error(err);
      }
    }

    init();

    //////////////////////////////////////
    // Disconnect Cleanup
    //////////////////////////////////////

    return () => {
      if (player === 1 || player === 2) {
        updatePlayerConnection(
          roomId,
          player,
          false
        );
      }

      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [roomId]);

  //////////////////////////////////////////////////////
  // Claim Tile
  //////////////////////////////////////////////////////

  async function claimTile(playerNumber, index) {
    if (!game) return;

    if (game.winner) return;

    if (game.claimedBy[index] !== 0) return;

    const updated = [...game.claimedBy];

    updated[index] = playerNumber;

    const result = checkWinner(updated);

    await updateRoom(roomId, {
      claimedBy: updated,
      winner: result.winner,
      winReason: result.reason,
    });
  }

  //////////////////////////////////////////////////////
  // Reset
  //////////////////////////////////////////////////////

  async function resetBoard() {
    await updateRoom(roomId, {
      board: generateBoard(),
      claimedBy: Array(25).fill(0),
      winner: 0,
      winReason: null,
    });
  }

  //////////////////////////////////////////////////////
  // Completed Tiles
  //////////////////////////////////////////////////////

  function completed(playerNumber) {
    if (!game) return 0;

    return game.claimedBy.filter(
      (tile) => tile === playerNumber
    ).length;
  }

  //////////////////////////////////////////////////////
  // Helpers
  //////////////////////////////////////////////////////

  const player1Connected =
    game?.players?.player1?.connected ?? false;

  const player2Connected =
    game?.players?.player2?.connected ?? false;

  //////////////////////////////////////////////////////

  return {
    loading,
    roomNotFound,

    game,

    claimTile,
    resetBoard,
    completed,

    player1Connected,
    player2Connected,
  };
}
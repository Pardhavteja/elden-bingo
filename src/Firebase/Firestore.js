import {
  doc,
  getDoc,
 setDoc,
 onSnapshot,
 updateDoc,
} from "firebase/firestore";

import { db } from "./firebase";

export function roomRef(roomId) {
  return doc(db, "rooms", roomId);
}

export async function getRoom(roomId) {
  return await getDoc(roomRef(roomId));
}

export async function createRoom(roomId, board) {

  await setDoc(roomRef(roomId),{

    board,

    claimedBy:Array(25).fill(0),

    winner:0,

    winReason:null,

    players:{
      player1:{
        connected:false,
      },
      player2:{
        connected:false,
      }
    },

    createdAt:Date.now(),

  });

}
export async function updatePlayerConnection(
  roomId,
  player,
  connected
){

  await updateDoc(roomRef(roomId),{

    [`players.player${player}.connected`]:connected,

  });

}

export function subscribeRoom(roomId, callback) {
  return onSnapshot(roomRef(roomId), callback);
}

export async function updateRoom(roomId, data) {
  await updateDoc(roomRef(roomId), data);
}
<template>
  <div class="player-left">
    <el-card>
      <span>{{ roomData.leftUser?.username }}</span>
      <span>{{ roomData.leftUser?.gameStatus }}</span>
      <el-button v-if="roomData.leftUser?.gameStatus === 1" @click="onReadyClick(0)">取消准备</el-button>
      <el-button
        v-if="roomData.leftUser?.gameStatus === 0"
        type="primary"
        @click="onReadyClick(1)"
      >准备</el-button>
    </el-card>
  </div>
  <div class="player-right">
    <el-card>
      <span>{{ roomData.rightUser?.username }}</span>
      <span>{{ roomData.rightUser?.gameStatus }}</span>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, reactive } from "vue";
import { Socket } from "socket.io-client";
import { RoomData, RoomPositon } from "../../model";
import { useUserStore } from '@/store/user';

const socket = inject("socket") as Socket;
const userStore = useUserStore();
const user = userStore.user;

console.log(userStore.id);

let roomData: RoomData = reactive({
  gameData: {
    position: {},
    cardCount: {
      total: 0,
      used: 0,
    },
    cardPile: [],
  },
  leftUser: {
    id: user.id,
    username: user.username,
    gameStatus: 0
  },
  rightUser: {
    id: "",
    username: "",
    gameStatus: 0
  }
})

const renderPos: RoomPositon = {
  's': {
    right: 'n'
  },
  'n': {
    right: 's'
  }
}

onMounted(() => {
  socket.emit("game", { type: "player:join", data: roomData.leftUser });
});

window.onbeforeunload = () => {
  console.log(111);
  socket.emit("game", { type: "player:exit", data: roomData.leftUser });
};

function onReadyClick(status: number) {
  if (typeof roomData.leftUser?.gameStatus === 'number') {
    roomData.leftUser.gameStatus = status;
    send();
  }
}

function send() {
  socket.emit("game", { type: "player:update", data: roomData.leftUser });
}

socket.on("event", (res: any) => {
  if (res.type === "game") {
    console.log(res.data);
    const serveGameData = res.data.gameData;
    const serveGameUser = res.data.gameUser;
    if (serveGameData) {
      roomData.gameData = serveGameData;
    }
    if (serveGameUser) {
      const selfPos = Object.keys(roomData.gameData.position).filter(pos => roomData.gameData.position[pos] === user.id)[0];
      roomData.leftUser = serveGameUser[roomData.gameData.position[selfPos]];
      roomData.rightUser = serveGameUser[roomData.gameData.position[renderPos[selfPos].right]];
    }
  }
});
</script>

<style lang="less" scoped>
</style>

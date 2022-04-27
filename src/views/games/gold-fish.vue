<template>
  <div class="game-room">
    <div class="player-left">
      <el-card v-if="roomData.leftUser.id !== ''">
        <span v-if="roomData.leftUser.id === roomData.gameData.hostId">房主</span>
        <span>{{ roomData.leftUser.userName }}</span>
        <span>{{ roomData.gameData.cardCount[roomData.leftUser.id] || 0 }}</span>
        <span v-if="roomData.leftUser.gameStatus === 0">等待中</span>
        <span v-if="roomData.leftUser.gameStatus === 1">已准备</span>
        <span v-if="roomData.leftUser.gameStatus === 2">游戏中</span>
        <el-button v-if="roomData.leftUser.gameStatus === 1" @click="onReadyClick(0)">取消准备</el-button>
        <el-button v-if="roomData.leftUser.gameStatus === 0" type="primary" @click="onReadyClick(1)">准备</el-button>
      </el-card>
    </div>
    <div class="player-right">
      <el-card v-if="roomData.rightUser.id !== ''">
        <span v-if="roomData.rightUser.id === roomData.gameData.hostId">房主</span>
        <span>{{ roomData.rightUser.userName }}</span>
        <span>{{ roomData.gameData.cardCount[roomData.rightUser.id] }}</span>
        <span v-if="roomData.rightUser.gameStatus === 0">等待中</span>
        <span v-if="roomData.rightUser.gameStatus === 1">已准备</span>
        <span v-if="roomData.rightUser.gameStatus === 2">游戏中</span>
      </el-card>
    </div>
    <div class="used-pile">
      <transition-group name="list">
        <div class="used-pile-card" v-for="(item, index) in roomData.gameData.cardPile" :key="index"
          :style="{ color: item.color }">
          <span>{{ item.typeStr }}</span>
          <span>{{ item.valueStr }}</span>
        </div>
      </transition-group>
    </div>
    <div class="start">
      <el-button v-if="
      roomData.leftUser.gameStatus === 1 &&
      roomData.rightUser.gameStatus === 1 &&
      user.id === roomData.gameData.hostId" @click="onStartClick">
        开始游戏
      </el-button>
      <el-button v-if="roomData.leftUser.gameStatus === 2 && user.id === roomData.gameData.playId" @click="onPlayClick">
        出牌
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, reactive } from "vue";
import { Socket } from "socket.io-client";
import { GameStatus, RoomData, RoomPositon } from "../../model";
import { useUserStore } from "../../store/user";
import { ElMessageBox } from "element-plus";
import { useRoute } from "vue-router";

const socket = inject("socket") as Socket;
const userStore = useUserStore();
const user = userStore.user;
const route = useRoute();

socket.emit("room", { type: "join", data: { roomId: route.params.id, ...user } });

let roomData: RoomData = reactive({
  gameData: {
    hostId: "",
    playId: "",
    position: {},
    cardCount: {
      total: 0,
      used: 0,
    },
    cardPile: [],
  },
  leftUser: {
    id: user.id,
    userName: user.userName,
    gameStatus: 0,
  },
  rightUser: {
    id: "",
    userName: "",
    gameStatus: 0,
  },
});

const renderPos: RoomPositon = {
  s: {
    right: "n",
  },
  n: {
    right: "s",
  },
};

onMounted(() => {
  socket.emit("game", { type: "player:join", data: { roomId: route.params.id, ...roomData.leftUser } });
});

function onReadyClick(status: number) {
  if (typeof roomData.leftUser?.gameStatus === "number") {
    roomData.leftUser.gameStatus = status;
    send();
  }
}

function onStartClick() {
  socket.emit("game", { type: "game:start", data: { roomId: route.params.id } });
}

function onPlayClick() {
  socket.emit("game", { type: "game:play", data: { roomId: route.params.id, ...roomData.leftUser } });
}

function send() {
  socket.emit("game", { type: "player:update", data: { roomId: route.params.id, ...roomData.leftUser } });
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
      const selfPos = Object.keys(roomData.gameData.position).filter(
        (pos) => roomData.gameData.position[pos] === user.id
      )[0];
      roomData.leftUser = serveGameUser[roomData.gameData.position[selfPos]];
      roomData.rightUser =
        serveGameUser[roomData.gameData.position[renderPos[selfPos].right]];
    }
    if (res.data.gameOver) {
      if (res.data.gameOver === user.id) {
        ElMessageBox.alert("别灰心，再来一局吧", "游戏结束", {
          confirmButtonText: "确定",
          callback: () => {
            onReadyClick(GameStatus.wait);
          },
        });
      } else {
        ElMessageBox.alert("恭喜你，赢得了游戏", "游戏结束", {
          confirmButtonText: "确定",
          callback: () => {
            onReadyClick(GameStatus.wait);
          },
        });
      }
    }
  }
});
</script>

<style lang="less" scoped>
.game-room {
  position: relative;
  height: 100%;

  .player-left {
    position: absolute;
    top: 30%;
    left: 0;
  }

  .player-right {
    position: absolute;
    top: 30%;
    right: 0;
  }

  .used-pile {
    position: absolute;
    top: 20%;
    left: 50%;
    display: flex;
    width: 500px;
    height: 500px;
    transform: translateX(-50%);
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;

    .used-pile-card {
      width: 50px;
      height: 70px;
      border: 1px solid #ddd;
      border-radius: 6px;
      background: #fff;
      margin: 5px -10px;
    }
  }

  .start {
    position: absolute;
    bottom: 5%;
    left: 50%;
    transform: translateX(-50%);
  }

  .el-card {
    width: 200px;
    height: 400px;

    :deep(.el-card__body) {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-content: center;
      justify-content: space-evenly;
    }
  }

  .list-enter-active {
    transition: all 0.2s ease;
  }

  .list-leave-active {
    transition: all 1s ease;
  }

  .list-enter-from {
    opacity: 0;
    transform: translateX(30px);
  }

  .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
}
</style>

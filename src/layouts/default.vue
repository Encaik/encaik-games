<template>
  <el-container class="container">
    <el-header>
      <div class="header">
        <span>Encaik Games</span>
        <el-button v-if="route.params.id" @click="onReturnClick">
          返回大厅
        </el-button>
      </div>
    </el-header>
    <el-main class="main">
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { Socket } from 'dgram';
import { inject } from 'vue';
import { useRoute } from 'vue-router';
import router from '../route';
import { useChatStore } from '../store/chat';
import { useUserStore } from '../store/user';

const socket = inject("socket") as Socket;

const userStore = useUserStore();
const user = userStore.user;
const chatStore = useChatStore();
const route = useRoute();

function onReturnClick() {
  chatStore.clearMsgs();
  socket.emit("room", { type: "leave", data: { roomId: route.params.id, ...user } });
  router.push('/home');
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
}

.el-header {
  padding: 10px;
  margin: 0;
  height: 80px;
}

.header {
  padding: 0 20px;
  color: #fff;
  font-size: 40px;
  height: 60px;
  line-height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
}

.main {
  padding: 0 10px 10px 10px;
}
</style>

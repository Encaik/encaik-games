<template>
  <div id="app">
    <room>
      <game></game>
    </room>
    <el-dialog v-model="loginVisible" title="登录" width="30%">
      <el-input v-model="username" placeholder="请输入您的昵称" />
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="onLoginClick()"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, ref } from "vue";
import room from "./layouts/room.vue";
import game from "./views/game.vue";
import { Socket } from "socket.io-client";
import "element-plus/es/components/message/style/css";
import { ElMessage } from "element-plus";

const socket = inject("socket") as Socket;
let loginVisible = ref(true);
let username = ref("");

onMounted(() => {
  socket.connect();
});

function onLoginClick() {
  loginVisible.value = false;
  socket.emit(
    "message",
    { type: "login", data: { username: username.value } },
    (data: any) => {
      if (!data.code) {
        ElMessage({
          message: "登陆成功",
          type: "success",
        });
      }
    }
  );
}
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
#app {
  width: 100%;
  min-height: 100vh;
  display: flex;
  background: linear-gradient(136deg, #00cadf, #00ffc4);
}
</style>

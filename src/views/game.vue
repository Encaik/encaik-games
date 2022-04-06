<template>
  <el-container class="container">
    <el-main class="main"></el-main>
    <el-aside class="aside">
      <div class="chat">
        <div class="msg-list">
          <div v-for="item in inputList.data" :key="item">{{ item }}</div>
        </div>
        <el-row :gutter="8">
          <el-col :span="20">
            <el-input class="chat-input" v-model="input" />
          </el-col>
          <el-col :span="4">
            <el-button type="primary" class="send-btn" @click="onSendClick()">发送</el-button>
          </el-col>
        </el-row>
      </div>
    </el-aside>
  </el-container>
</template>

<script setup lang="ts">
import { inject, reactive, ref } from "vue";
import { Socket } from "socket.io-client";

const socket = inject("socket") as Socket;
const username = localStorage.getItem('username');

let input = ref("");
let inputList = reactive({
  data: [] as string[],
});

function onSendClick() {
  inputList.data.push(`${username}:${input.value}`);
  socket.emit(
    "message",
    { type: "chat", data: { username, msg: input.value } },
    (data: any) => {
      console.log(data);
    }
  );
}

socket.on("event", (res: any) => {
  inputList.data.push(`${res.data.username}:${res.data.msg}`);
});
</script>

<style lang="less" scoped>
.container {
  background: #3c3c3c;
  border-radius: 10px;
  padding: 24px;
  height: 100%;
}
.main {
  background: #4c4c4c;
  border-radius: 10px;
  padding: 16px;
  margin-right: 16px;
  box-shadow: 0 0 3px 1px #00dcd6;
}
.aside {
  width: 450px;
  background: #4c4c4c;
  border-radius: 10px;
  padding: 16px;
  box-shadow: 0 0 3px 1px #00dcd6;
  .chat {
    display: flex;
    flex-direction: column;
    height: 100%;
    .msg-list {
      flex: 1 1;
      margin-bottom: 10px;
      background: #585858;
      border-radius: 10px;
    }
    .send-btn {
      width: 100%;
      background-color: #00dcd6;
    }
  }
}
</style>

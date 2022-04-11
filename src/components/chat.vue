<template>
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
</template>

<script setup lang="ts">
import { inject, reactive, ref } from "vue";
import { Socket } from "socket.io-client";
import { ElMessage } from "element-plus";
import { useUserStore } from '@/store/user';

const socket = inject("socket") as Socket;
const userStore = useUserStore();
const user = userStore.user;

let input = ref("");
let inputList = reactive({
  data: [] as string[],
});

function onSendClick() {
  if (input.value == '') {
    ElMessage.warning('不允许发送空消息');
    return;
  }
  socket.emit(
    "message",
    { type: "chat", data: { username: user.username, msg: input.value } },
    (data: any) => {
      console.log(data);
    }
  );
  input.value = '';
}

socket.on("event", (res: any) => {
  if (res.type === 'chat') {
    inputList.data.push(`${res.data.username}:${res.data.msg}`);
  }
});
</script>

<style lang="less" scoped>
.chat {
  display: flex;
  flex-direction: column;
  height: 100%;
  .msg-list {
    flex: 1 1 calc(100vh - 212px);
    margin-bottom: 10px;
    background: #585858;
    border-radius: 10px;
    overflow-y: auto;
    color: #fff;
    div {
      padding: 5px 10px;
      word-wrap: break-word;
    }
  }
  .send-btn {
    width: 100%;
    background-color: #00dcd6;
  }
}
</style>
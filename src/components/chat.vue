<template>
  <div class="chat">
    <div class="msg-list" ref="msgList">
      <div v-for="item in msgs.list" :key="item">{{ item }}</div>
    </div>
    <el-row :gutter="8">
      <el-col :span="20">
        <el-input class="chat-input" v-model="input" @keydown.enter="onSendClick" />
      </el-col>
      <el-col :span="4">
        <el-button type="primary" class="send-btn" @click="onSendClick">发送</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { inject, nextTick, ref } from "vue";
import { Socket } from "socket.io-client";
import { ElMessage } from "element-plus";
import { useUserStore } from '../store/user';
import { getCurrentInstance } from 'vue';
import { useRoute } from "vue-router";
import { useChatStore } from "../store/chat";

const { proxy } = getCurrentInstance() as any;
const socket = inject("socket") as Socket;
const userStore = useUserStore();
const user = userStore.user;
const chatStore = useChatStore();
const msgs = chatStore.msgs;
const route = useRoute();

let input = ref("");

function onSendClick() {
  if (input.value == '') {
    ElMessage.warning('不允许发送空消息');
    return;
  }
  if (route.params.id) {
    socket.emit(
      "room",
      { type: "chat", data: { roomId: route.params.id, userName: user.userName, msg: input.value } }
    );
  } else {
    socket.emit(
      "message",
      { type: "chat", data: { userName: user.userName, msg: input.value } }
    );
  }
  input.value = '';
}

socket.on("event", (res: any) => {
  if (res.type === 'chat') {
    chatStore.addMsg(`${res.data.userName}:${res.data.msg}`)
    nextTick(() => {
      proxy.$refs.msgList.scrollTop = proxy.$refs.msgList.scrollHeight;
    })
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
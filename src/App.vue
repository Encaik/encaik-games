<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, onUnmounted } from "vue";
import { Socket } from "socket.io-client";

const socket = inject("socket") as Socket;

onMounted(() => {
  socket.connect();
});

window.onbeforeunload = () => {
  socket.disconnect();
};
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

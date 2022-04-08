<template>
  <el-container class="container">
    <el-main class="main">
      <router-view></router-view>
    </el-main>
    <el-aside class="aside">
      <chat></chat>
    </el-aside>
  </el-container>
</template>

<script lang="ts" setup>
import chat from '@/components/chat.vue';
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
}
</style>
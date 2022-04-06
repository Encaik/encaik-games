<template>
  <el-container class="container">
    <el-header>
      <div class="header">
        <span>Encaik Games</span>
      </div>
    </el-header>
    <el-main class="main">
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script setup lang="ts"></script>

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
  align-content: center;
  justify-content: space-between;
  border-radius: 10px;
}
.main {
  padding: 0 10px 10px 10px;
}
</style>

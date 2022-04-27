<template>
  <el-card v-if="user.leftUser.id !== ''">
    <span>
      <el-tag v-if="user.leftUser.id === user.gameData.hostId">房主</el-tag>
      {{ user.leftUser.userName }}
    </span>
    <span>手牌数：{{ user.gameData.cardCount[user.leftUser.id] || 0 }}</span>
    <span v-if="user.leftUser.gameStatus === 0">等待中</span>
    <span v-if="user.leftUser.gameStatus === 1">已准备</span>
    <span v-if="user.leftUser.gameStatus === 2">游戏中</span>
    <el-button v-if="user.leftUser.gameStatus === 1">取消准备</el-button>
    <el-button v-if="user.leftUser.gameStatus === 0" type="primary">准备</el-button>
  </el-card>
</template>

<script setup lang="ts">
const props = defineProps({
  user: {
    type: Object,
    default: () => {
      return {
        id: "",
        userName: "",
        gameStatus: 0,
      }
    }
  },
})
</script>
<template>
  <el-container class="container">
    <el-header>
      <div class="header">
        <span>Encaik Games</span>
        <div class="user-info" v-if="route.path !== '/login'">
          <el-avatar src='https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png' />
          <el-dropdown>
            <span class="el-dropdown-link">
              {{ user.userName }}
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="onLogoutClick()">注销</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </el-header>
    <el-main class="main">
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import router from '../route';
import { useUserStore } from '../store/user';
import { ArrowDown } from '@element-plus/icons-vue';

const userStore = useUserStore();
const user = userStore.user;
const route = useRoute();

function onLogoutClick() {
  userStore.updateUser({})
  router.push('/');
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

.user-info {
  display: flex;
  align-items: center;
  gap: 16px;
}
</style>

<template>
  <div class="room">
    <el-card>
      <el-button>创建房间</el-button>
    </el-card>
    <el-table :data="data.rooms" style="width: 100%">
      <el-table-column prop="id" label="ID" width="350" />
      <el-table-column prop="roomName" label="房间名" width="180" />
      <el-table-column prop="roomCurCount" label="当前人数" />
      <el-table-column prop="roomMaxCount" label="最大人数" />
      <el-table-column prop="roomStatus" label="当前状态" />
      <el-table-column fixed="right" label="操作" width="200">
        <template #default="scope">
          <el-button type="text" @click="onJoinClick(scope.row)">加入</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

import router from '../../route';
import { useChatStore } from '../../store/chat';
import useCurrentInstance from '../../util/useCurrentInstance';

const { globalProperties } = useCurrentInstance();
const chatStore = useChatStore();

let data = reactive({ rooms: [] });

getRooms();

function getRooms() {
  globalProperties.$http.get("/room").then((res: any) => {
    data.rooms = res
  });
}

function onJoinClick(room: any) {
  chatStore.clearMsgs();
  router.push(`/games/gold-fish/${room.id}`);
}
</script>

<style lang="less" scoped>
.room {
  .el-card {
    margin-bottom: 16px;
  }
}
</style>
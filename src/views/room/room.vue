<template>
  <div class="room">
    <el-card>
      <el-button>创建房间</el-button>
    </el-card>
    <el-table :data="data.rooms" style="width: 100%">
      <el-table-column prop="id" label="ID" width="300" />
      <el-table-column prop="roomname" label="房间名" width="180" />
      <el-table-column prop="roomcount" label="最大人数" />
      <el-table-column prop="roomstatus" label="当前状态" />
      <el-table-column fixed="right" label="操作" width="200">
        <template #default="scope">
          <el-button type="text" @click="onJoinClick(scope.row)">加入</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { Socket } from 'dgram';
import { inject, reactive } from 'vue';

import router from '../../route';
import useCurrentInstance from '../../util/useCurrentInstance';

const { globalProperties } = useCurrentInstance();
const socket = inject("socket") as Socket;

let data = reactive({ rooms: [] });

getRooms();

function getRooms() {
  globalProperties.$http.get("/room").then((res: any) => {
    data.rooms = res
  });
}

function onJoinClick(room: any) {
  socket.emit("room", { type: "join", data: { roomId: room.id } });
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
<template>
  <el-card class="login-wrap">
    <el-form label-width="80px" label-position="left" v-if="isLogin">
      <el-form-item label="用户名">
        <el-input v-model="logForm.username" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="logForm.password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onLoginClick()">登录</el-button>
        <el-button @click="onLoginSwitch(false)">注册</el-button>
      </el-form-item>
    </el-form>
    <el-form label-width="80px" label-position="left" v-if="!isLogin">
      <el-form-item label="用户名">
        <el-input v-model="signForm.username" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="signForm.password" />
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input type="password" v-model="signForm.repassword" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSignupClick()">注册</el-button>
        <el-button @click="onLoginSwitch(true)">返回</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts" setup>
import { inject, ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { Socket } from "socket.io-client";
import useCurrentInstance from "../util/useCurrentInstance";
import md5 from 'js-md5';
import { useUserStore } from '../store/user';

const socket = inject("socket") as Socket;
const { globalProperties } = useCurrentInstance();
const router = useRouter();
const userStore = useUserStore();

let isLogin = ref(true);
const user = userStore.user;

const logForm = reactive({
  username: '',
  password: '',
})

const signForm = reactive({
  username: '',
  password: '',
  repassword: '',
})

console.log(user);
if (user.id) {
  onLoginClick(user);
}

function onLoginClick(data?: any) {
  const dataObj = data || {
    username: logForm.username,
    password: md5(logForm.password),
  };
  globalProperties.$http.post("/user/login", dataObj).then((res: any) => {
    if (!res.code) {
      ElMessage.success(res.msg);
      userStore.updateUser(res.data);
      socket.emit("message", { type: "login", data: { username: dataObj.username } });
      router.push("/home");
    } else {
      ElMessage.error(res.msg);
    }
  });
}

function onSignupClick() {
  if (signForm.password !== signForm.repassword) {
    ElMessage.warning('两次输入的密码不一致，请检查');
    return;
  }
  const data = {
    username: signForm.username,
    password: md5(signForm.password),
  };
  globalProperties.$http.post("/user", data).then((res: any) => {
    if (!res.code) {
      ElMessage.success(res.msg);
      onLoginClick(data);
    } else {
      ElMessage.error(res.msg);
    }
  });
}

function onLoginSwitch(value: boolean) {
  isLogin.value = value;
}
</script>

<style lang="less" scoped>
.login-wrap {
  margin: auto;
  padding: 30px;
  width: 400px;
  margin-top: 10%;
}
</style>

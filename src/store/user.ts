import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      _id: "",
      _userName: "",
      _password: "",
      _sex: "",
      _score: "",
    };
  },
  actions: {
    updateUser(user: any) {
      this._id = user.id;
      this._userName = user.userName;
      this._password = user.password;
      this._sex = user.sex;
      this._score = user.score;
    },
  },
  getters: {
    id: (state) => {
      return state._id;
    },
    user: (state) => {
      return {
        id: state._id,
        userName: state._userName,
        password: state._password,
        sex: state._sex,
        score: state._score,
      };
    },
  },
  persist: {
    enabled: true,
  },
});

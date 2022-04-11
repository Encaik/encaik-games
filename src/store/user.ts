import { defineStore } from "pinia";

export const useUserStore = defineStore('user',{
  state: () => {
    return {
      _id: "",
      _username: "",
      _password: "",
    };
  },
  actions: {
    updateUser(user:any) {
      this._id = user.id;
      this._username = user.username;
      this._password = user.password;
    }
  },
  getters: {
   id: (state) => {
     return state._id;
   },
   user:(state)=>{
     return {
       id:state._id,
       username:state._username,
       password:state._password
     }
   }
  },
  persist: {
    enabled: true
  }
});

import { defineStore } from "pinia";

export const useChatStore = defineStore('chat',{
  state: () => {
    return {
      _type: "",
      _msgs: {
        list:[] as string[]
      },
    };
  },
  actions: {
    clearMsgs() {
      this._msgs.list = [];
    },
    addMsg(msg:string){
      this._msgs.list.push(msg);
    }
  },
  getters: {
   type: (state) => {
     return state._type;
   },
   msgs:(state)=>{
     return state._msgs;
   }
  },
  persist: {
    enabled: true
  }
});

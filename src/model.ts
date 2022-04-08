export interface RoomData {
  gameData:GameDataBody;
  leftUser?:GameUser;
  rightUser?:GameUser;
}

export interface RoomPositon {
  [key:string]:{
    [key:string]:string
  }
}

export interface SocketMessageBody<T = any> {
  type: string;
  data: T;
}

export interface ChatBody {
  username: string;
  msg: string;
}

export interface LoginBody {
  username: string;
}

export interface GameBody {
  gameData?: GameDataBody;
  gameUser?: GameUserBody;
}

export interface GameDataBody {
  position: { [key: string]: string }; // 各成员位置
  cardCount: {
    total: number; // 总共牌的数量
    used: number; // 已打出的牌的数量
    [key: string]: number; // 各成员拥有的牌数量
  };
  cardPile: string[]; // 打出的牌列表
}

export interface GameUserBody {
  [key: string]: GameUser;
}

export interface GameUser {
  id: string;
  username: string;
  gameStatus: GameStatus;
}

export enum GameStatus {
  wait,
  ready,
  start,
}

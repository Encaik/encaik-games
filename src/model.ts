export interface RoomData {
  gameData:GameDataBody;
  leftUser:GameUser;
  rightUser:GameUser;
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
  userName: string;
  msg: string;
}

export interface LoginBody {
  userName: string;
}

export interface GameBody {
  gameData?: GameDataBody;
  gameUser?: GameUserBody;
}

export interface GameDataBody {
  hostId: string;//房主玩家id
  playId: string;//当前出牌玩家id
  position: { [key: string]: string }; // 各成员位置
  cardCount: {
    total: number; // 总共牌的数量
    used: number; // 已打出的牌的数量
    [key: string]: number; // 各成员拥有的牌数量
  };
  cardPile: Card[]; // 打出的牌列表
}

export interface GameUserBody {
  [key: string]: GameUser;
}

export interface GameUser {
  id: string;
  userName: string;
  gameStatus: GameStatus;
}

export enum GameStatus {
  wait,
  ready,
  start,
}

export interface Card{
  group:number;
  number:number;
  typeStr:string;
  valueStr:string;
  color:string;
}

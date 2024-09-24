export interface Message {
  id: number;
  text: string;
  sender: "me" | "friend";
}

export interface Friend {
  id: number;
  name: string;
  messages: Message[];
}

export interface User {
  id: number;
  name: string;
  friends: Friend[];
}

import { Message } from "./types";

export const initialMessages: Message[] = [
  { type: "assistant", text: "How can we help you today? 👋" },
  { type: "user", text: "Any recommendations?", isButton: true },
];

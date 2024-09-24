import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Message } from "../types/types";

interface ChatWindowProps {
  messages: Message[];
  onSendMessage: (text: string) => void;
}

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 15px;
  overflow-y: auto;
  background: #e9f7e4;
  @media (max-width: 850px) {
    padding: 20px 10px;
  }
`;

const InputContainer = styled.div`
  display: flex;
  margin-top: auto;
  padding-top: 30px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  margin-left: 10px;
`;

const MessageBubble = styled.div<{ sender: "me" | "friend" }>`
  align-self: ${({ sender }) => (sender === "me" ? "flex-end" : "flex-start")};
  background-color: ${({ sender }) =>
    sender === "me" ? "#38944b" : "#c5c7c9"};
  color: ${({ sender }) => (sender === "me" ? "#fff" : "#000")};
  padding: 8px;
  border-radius: 10px;
  margin: 5px 0;
`;

const ChatWindow = ({ messages, onSendMessage }: ChatWindowProps) => {
  const [inputValue, setInputValue] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue("");
    }
  };

  return (
    <ChatContainer>
      {messages.map((msg) => (
        <MessageBubble key={msg.id} sender={msg.sender}>
          {msg.text}
        </MessageBubble>
      ))}
      <div ref={chatEndRef} />
      <InputContainer>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message"
        />
        <Button onClick={handleSend}>Send</Button>
      </InputContainer>
    </ChatContainer>
  );
};

export default ChatWindow;

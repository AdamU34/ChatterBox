import { useState } from "react";
import { GlobalStyles } from "../styles/GlobalStyles";
import styled from "styled-components";
import { Friend } from "../types/types";
import ChatWindow from "./ChatWindow";
import FriendList from "./FriendList";

const PageContainer = styled.div`
  max-width: 1000px;
  margin: 50px auto;
  @media (max-width: 850px) {
    margin: 50px 5px;
  }
`;

const ChatContainer = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 250px) 1fr;
  height: 50vh;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  @media (max-width: 850px) {
    grid-template-columns: minmax(0, 120px) 1fr;
    height: 60vh;
  }
`;

const mockFriends: Friend[] = [
  {
    id: 1,
    name: "Astrid",
    messages: [
      { id: 1, text: "Hi there!", sender: "friend" },
      { id: 2, text: "Hei!", sender: "me" },
      { id: 3, text: "How is going?", sender: "friend" },
    ],
  },
  {
    id: 2,
    name: "Magnus",
    messages: [{ id: 2, text: "Hey!", sender: "friend" }],
  },
];

const HomePage = () => {
  const [friends, setFriends] = useState<Friend[]>(mockFriends);
  const [selectedFriendId, setSelectedFriendId] = useState<number | null>(
    friends[0]?.id
  );

  const handleSendMessage = (text: string) => {
    if (selectedFriendId !== null) {
      setFriends((prevFriends) =>
        prevFriends.map((friend) =>
          friend.id === selectedFriendId
            ? {
                ...friend,
                messages: [
                  ...friend.messages,
                  { id: Date.now(), text, sender: "me" },
                ],
              }
            : friend
        )
      );
    }
  };

  const selectedFriend = friends.find(
    (friend) => friend.id === selectedFriendId
  );

  return (
    <>
      <GlobalStyles />
      <PageContainer>
        <h2 style={{ marginBottom: "14px" }}>ChatterBox</h2>
        <ChatContainer>
          <FriendList
            friends={friends}
            selectedFriendId={selectedFriendId}
            onSelectFriend={setSelectedFriendId}
          />

          {selectedFriend && (
            <ChatWindow
              messages={selectedFriend.messages}
              onSendMessage={handleSendMessage}
            />
          )}
        </ChatContainer>
      </PageContainer>
    </>
  );
};

export default HomePage;

import styled from "styled-components";
import { Friend } from "../types/types";

interface FriendListProps {
  friends: Friend[];
  selectedFriendId: number | null;
  onSelectFriend: (id: number) => void;
}

const ListContainer = styled.div`
  border-right: 1px solid #ccc;
  padding: 25px 15px;
  overflow-y: auto;
  background: #dcdcdc;
  @media (max-width: 850px) {
    padding: 25px 15px;
  }
`;

const FriendItem = styled.div<{ isSelected: boolean }>`
  padding: 10px;
  cursor: pointer;
  background-color: ${({ isSelected }) =>
    isSelected ? "#007bff" : "transparent"};
  color: ${({ isSelected }) => (isSelected ? "white" : "black")};
  border-radius: 4px;
  margin-bottom: 5px;
`;

const FriendList = ({
  friends,
  selectedFriendId,
  onSelectFriend,
}: FriendListProps) => {
  return (
    <ListContainer>
      {friends.map((friend) => (
        <FriendItem
          key={friend.id}
          isSelected={friend.id === selectedFriendId}
          onClick={() => onSelectFriend(friend.id)}
        >
          {friend.name}
        </FriendItem>
      ))}
    </ListContainer>
  );
};

export default FriendList;

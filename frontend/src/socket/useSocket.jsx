import { useEffect } from "react";
import { useDispatch } from "react-redux";
import socketService from "./Socket";
import { setOnlineUsers } from "../redux/reducers/chatReducer";

function useSocket({ userId }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userId) return;

    socketService.connect(userId);

    // receive message
    socketService.onReceiveMessage((msg) => {
      dispatch({
        type: "message/addMessageRealtime",
        payload: msg,
      });
    });

    //online users
    socketService.onOnlineUsers((users) => {
      dispatch(setOnlineUsers(users));
    });

    // seen message
    socketService.onSeen((data) => {
      dispatch({
        type: "message/markSeen",
        payload: data.conversationId,
      });
    });

    return () => {
      socketService.offReceiveMessage();
      socketService.offOnlineUsers();
      socketService.offSeen();
      socketService.disconnect();
    };
  }, [userId, dispatch]);
}

export default useSocket;
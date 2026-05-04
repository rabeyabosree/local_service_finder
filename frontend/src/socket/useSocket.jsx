// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import socketService from "./Socket";

// function useSocket({ userId, conversationId }) {
//     const dispatch = useDispatch();

//     useEffect(() => {
//         if (!userId) return;

//         socketService.connect(userId);

//         // receive message
//         // socketService.onReceiveMessage((msg) => {
//         //     dispatch({
//         //         type: "message/addMessage",
//         //         payload: msg,
//         //     });
//         // });

//         socketService.onReceiveMessage((msg) => {
//             console.log("🔥 REALTIME MESSAGE:", msg);
//         });

//         // online users
//         socketService.onOnlineUsers((users) => {
//             dispatch({
//                 type: "message/setOnlineUsers",
//                 payload: users,
//             });
//         });

//         // seen
//         socketService.onSeen(({ conversationId }) => {
//             dispatch({
//                 type: "message/markSeen",
//                 payload: conversationId,
//             });
//         });

//         return () => {
//             socketService.offReceiveMessage();
//             socketService.offOnlineUsers();
//             socketService.offSeen();
//         };
//     }, [userId, conversationId, dispatch]);
// }

// export default useSocket;


import { useEffect } from "react";
import { useDispatch } from "react-redux";
import socketService from "./Socket";

function useSocket({ userId }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userId) return;

    socketService.connect(userId);

    socketService.onReceiveMessage((msg) => {
      dispatch({
        type: "message/addMessage",
        payload: msg,
      });
    });

    socketService.onOnlineUsers((users) => {
      dispatch({
        type: "message/setOnlineUsers",
        payload: users,
      });
    });

    return () => {
      socketService.offReceiveMessage();
    };
  }, [userId]);
}

export default useSocket;
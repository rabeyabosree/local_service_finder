import React, { useEffect, useState, useRef } from "react";
import { Send, Paperclip } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import socketService from "../../socket/Socket";
import {
  getAllMessages,
  sendMessage,
  sendImage,
  seenMessage,
} from "../../redux/reducers/chatReducer";

function ChatPage({ conversation }) {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));

  const { messages, onlineUsers } = useSelector((state) => state.message);

  const [text, setText] = useState("");
  const fileRef = useRef();
  const bottomRef = useRef();

  const otherUser = conversation?.members?.find(
    (m) => m._id !== user._id
  );

  const conversationId = conversation?._id;

  //  load messages
  useEffect(() => {
    if (!conversationId) return;
    dispatch(getAllMessages(conversationId));
  }, [conversationId, dispatch]);

  // seen message
  useEffect(() => {
    
    if (!conversationId || !user?._id || messages.length === 0) return;
    const sendData = {
      conversationId,
      userId: user._id,
    };

    dispatch(seenMessage(sendData));
    socketService.sendSeen(sendData);

  }, [conversationId, messages.length]);

  //  scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  //  send text
  const sendMessageHandler = () => {
    if (!text.trim() || !conversationId) return;

    const msg = {
      conversationId,
      senderId: user._id,
      receiverId: otherUser._id,
      text,
      image: "",
      createdAt: Date.now(),
    };

    socketService.sendMessage(msg);
    dispatch(sendMessage(msg));

    setText("");
  };

  // send image 
  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file || !conversationId) return;

    const form = new FormData();
    form.append("image", file);
    form.append("conversationId", conversationId);
    form.append("senderId", user._id);
    form.append("receiverId", otherUser._id);

    try {
      const res = await dispatch(sendImage(form));

      const imageUrl =
        res?.payload?.data?.image ||
        res?.payload?.image;

      if (!imageUrl) return;

      const imgMsg = {
        conversationId,
        senderId: user._id,
        receiverId: otherUser._id,
        image: imageUrl,
        text: "",
        createdAt: Date.now(),
      };

      //  realtime
      socketService.sendMessage(imgMsg);

    } catch (err) {
      console.log("Image send error", err);
    }
  };

  //  format time
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  //  status
  const getStatus = (msg) => {
    if (msg.seen) return "✓✓";
    return "✓";
  };

  return (
    <div className="flex flex-col h-full bg-white">

      {/* header */}
      <div className="h-16 flex items-center px-4 shadow">
        <div className="flex items-center gap-3">
          <img
            src={
              otherUser?.avatar || `https://ui-avatars.com/api/?name=${otherUser?.name}`}
            className="h-10 w-10 rounded-full object-cover" />
          <div>
            <h2 className="text-sm font-semibold capitalize">
              {otherUser?.name}
            </h2>

            <p className="text-xs text-gray-400">
              {onlineUsers?.includes(otherUser?._id)
                ? "Online"
                : "Offline"}
            </p>
          </div>
        </div>
      </div>

      {/* messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">

        {messages?.map((msg, i) => {
          const isMe = msg.senderId === user._id;

          return (
            <div
              key={i}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`} >
              <div className="max-w-[75%]">

                {/* messages */}
                <div className={`px-3 py-2 rounded-xl text-sm break-words ${isMe ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-800"}`}>
                  {msg.text && <p>{msg.text}</p>}

                  {msg.image && (
                    <img
                      src={msg.image} className="mt-2 rounded-lg max-h-40 object-cover" />
                  )}
                </div>

                {/* time and status*/}
                <div className={`flex items-center gap-1 mt-1 text-[10px] opacity-70 ${isMe ? "justify-end" : "justify-start"} `} >
                  <span>
                    {msg.createdAt ? formatTime(msg.createdAt) : ""}
                  </span>

                  {isMe && (<span className={msg.seen ? "text-blue-400" : ""}>
                    {getStatus(msg)}
                  </span>
                  )}
                </div>

              </div>
            </div>
          );
        })}

        <div ref={bottomRef}></div>
      </div>

      {/* input */}
      <div className="p-3 shadow flex items-center gap-2">

        <button onClick={() => fileRef.current.click()}>
          <Paperclip size={18} />
        </button>

        <input
          type="file"
          hidden
          ref={fileRef}
          onChange={handleImage}
        />

        <input
          className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm outline-none"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type message..."
        />

        <button
          onClick={sendMessageHandler}
          className="bg-purple-600 text-white p-2 rounded-full"
        >
          <Send size={16} />
        </button>

      </div>
    </div>
  );
}

export default ChatPage;
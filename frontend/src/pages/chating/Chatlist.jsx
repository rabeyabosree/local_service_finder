import React, { useEffect, useState } from "react";
import ChatPage from "./ChatPage";
import { useDispatch, useSelector } from "react-redux";
import { getConversation } from "../../redux/reducers/chatReducer";

function Chatlist() {
  const { conversations, onlineUsers } = useSelector((state) => state.message);
  const user = JSON.parse(localStorage.getItem("user"));

  const dispatch = useDispatch();

  const [selectedConversation, setSelectedConversation] = useState(null);

  // // if user role === provider filtered customers conv and if user role === customer filterd provider conv
  // const filteredConversation = conversations?.map((conv)=>{
  //   conv.members?.find()
  // })

  // fetch conversation
  useEffect(() => {
    if (!user?._id) return;
    dispatch(getConversation({ userId: user._id }));
  }, [dispatch, user?._id]);

  return (
    <div className="h-screen bg-gray-100 flex">

      {/* ================= SIDEBAR ================= */}
      <div className="w-[320px] bg-white flex flex-col">

        {/* HEADER */}
        <div className="p-4 border-b bg-purple-600 text-white">
          <h2 className="text-lg font-semibold">Messages</h2>
          <p className="text-xs text-purple-100">Your chats</p>
        </div>

        {/* CHAT LIST */}
        <div className="flex-1 overflow-y-auto">

          {conversations?.map((conv) => {
            const otherUser = conv.members.find(
              (m) => m._id !== user._id
            );

            const isOnline = onlineUsers?.includes(otherUser?._id);

            return (
              <div
                key={conv._id}
                onClick={() => setSelectedConversation(conv)}   // ✅ FIX HERE
                className={`flex items-center gap-3 p-3 cursor-pointer  transition
                  ${selectedConversation?._id === conv._id ? "bg-gray-100" : "hover:bg-gray-50"}
                `}
              >

                {/* AVATAR */}
                <div className="relative">
                  <img
                    src={
                      otherUser?.avatar ||
                      `https://ui-avatars.com/api/?name=${otherUser?.name}`
                    }
                    className="w-10 h-10 rounded-full object-cover"
                  />

                  {isOnline && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full "></span>
                  )}
                </div>

                {/* INFO */}
                <div className="flex-1">
                  <h4 className="text-sm font-semibold">
                    {otherUser?.name}
                  </h4>

                  <p className="text-xs text-gray-500 truncate">
                    {conv?.lastMessage || "Start conversation"}
                  </p>

                  <p>
                    {new Date(conv?.updatedAt).toLocaleTimeString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

              </div>
            );
          })}

        </div>
      </div>

      {/* ================= CHAT BOX ================= */}
      <div className=" flex-1 flex flex-col ">

        {selectedConversation ? (
          <ChatPage conversation={selectedConversation} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            Select a chat
          </div>
        )}
      </div>

      

    </div>
  );
}

export default Chatlist;
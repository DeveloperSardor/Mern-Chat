import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ChatState } from "../context/ChatProvider";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";
const Chat = () => {
  const { user } = ChatState();
   const [fetchAgain, setFetchAgain] = useState(false);
  return <div className="chat" style={{ width: "100%" }}>
    {user && <SideDrawer/>}
    <Box
    display={'flex'}
    justifyContent={'space-between'}
    w ={'95%'}
    m='0 auto'
    h={'91.5vh'}
    p={'10px'}
    >
        {user && <MyChats fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/> } 
         {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/> }
    </Box>
  </div>;
};

export default Chat;

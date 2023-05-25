import {
  Container,
  Box,
  Text,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Login from "../components/authentication/Login";
import Register from "../components/authentication/Register";
const Home = () => {

const history = useHistory();

useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('userInfo'));

    if(user) history.push('/chats')
}, [history]);



  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={0}
        bg={"white"}
        w="100%"
        m="25px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text
          fontSize="4xl"
          fontFamily="Work sans"
          fontWeight={'medium'}
          textAlign={"center"}
          color="black "
        >
          Telegram
        </Text>
      </Box>

      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px" color={'black'}>
        <Tabs variant="soft-rounded">
          <TabList mb='1em'>
            <Tab width='50%'>Login</Tab>
            <Tab width='50%'>Register</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
             <Login/>
            </TabPanel>
            <TabPanel>
              <Register/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Home;

import  {IconButton}  from "@chakra-ui/react"
import { ViewIcon} from '@chakra-ui/icons';
import { Button } from '@chakra-ui/button';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter,useDisclosure, ModalHeader, ModalOverlay , Image, Text} from '@chakra-ui/react';
import React from 'react';

const ProfileModal = ({user, children}) => {
    const {isOpen, onOpen, onClose}  = useDisclosure()
    return (
        <>   

         { children ? (
            <span onClick={onOpen}>{children}</span>
         ) : (
            <IconButton display={{base : "flex"}} icon={<ViewIcon/>} onClick={onOpen}/>
         )
            
         }
           
           <Modal size={'lg'} isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay/>
             <ModalContent h={'430px'}>
                <ModalHeader
                fontSize={'40px'}
                fontFamily='Work sans'
                display={'flex'}
                justifyContent='center'
                >{user.username}</ModalHeader>
                <ModalCloseButton/>
                <ModalBody
                display={'flex'}
                flexDirection='column'
                alignItems={'center'}
                textAlign='center'
                justifyContent='space-between'
                >
                 <Image
                 borderRadius={'full'}
                 boxSize='150px'
                 src={user.img_path}
                 alt = {user.username}
        
                 />
                 <Text fontSize={{base : '20px', md : "30px"}}
                 fontFamily ='Poppins sans-serif' fontWeight={'700'}>
                    Email : {user.email}
                 </Text>
                </ModalBody>
                 <ModalFooter>
                    <Button colorScheme={'blue'}  mr={3} onClick={onClose}>
                    Close
                    </Button>
                 </ModalFooter>
             </ModalContent>
           </Modal>
        </>
    );
};

export default ProfileModal; 
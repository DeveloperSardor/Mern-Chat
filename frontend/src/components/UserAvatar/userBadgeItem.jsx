import { CloseIcon } from '@chakra-ui/icons';
import { Box } from '@chakra-ui/react';
import React from 'react';

const UserBadgeItem = ({user, handleFunction}) => {
    return (
       <Box
       px={2}
       py={1}
       borderRadius="lg"
       m={1}
       mb={2}
       variant="solid"
       fontSize={12}
       background="purple"
       color={'white'}
       cursor="pointer"
       onClick={handleFunction}
       >

{user.username}
<CloseIcon pl={1}/>
       </Box>
    );
};

export default UserBadgeItem;
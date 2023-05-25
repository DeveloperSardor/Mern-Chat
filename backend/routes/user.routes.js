const {Router} = require('express');
const {registerUser, authUser, allUsers} = require('../controllers/userController')
const {protect} = require('../middlewares/authMiddlewaire')





const userRouter = Router()


userRouter.route('/')
  .post(registerUser)
  .get(protect, allUsers);
userRouter.post('/login', authUser);  


// userRouter.route('/').post(registerUser).get(allUsers)
// // userRouter.post('/',registerUser )
// userRouter.post('/login', protect, authUser);
// userRouter.get('', allUsers)

module.exports = userRouter; 
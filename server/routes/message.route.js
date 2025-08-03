import express from 'express';
import { 
  sendMessage, 
  sendGroupMessage, 
  getMessages, 
  getGroupMessages, 
  getAllUsers 
} from '../controllers/message.controllers.js';
import { verifyToken } from '../middleware/JWT.middleware.js';

const router = express.Router();

router.use(verifyToken);

router.post('/send/:receiverId', sendMessage);
router.get('/conversation/:otherUserId', getMessages);

router.post('/group/send', sendGroupMessage);
router.get('/group/messages', getGroupMessages);

router.get('/users', getAllUsers);

export default router;

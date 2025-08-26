import express from 'express';
import bodyParser from 'body-parser';
import { 
  saveMessage, 
  getConversations, 
  getConversationMessages, 
  createConversation, 
  deleteConversation 
} from '../controller/chatController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(bodyParser.json());

// All chat routes require authentication
router.use(authenticateToken);

// Conversation management
router.post('/conversations', createConversation);
router.get('/conversations', getConversations);
router.get('/conversations/:conversationId/messages', getConversationMessages);
router.delete('/conversations/:conversationId', deleteConversation);

// Message management
router.post('/messages', saveMessage);

export default router;


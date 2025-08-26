import Message from '../models/message.js';
import { v4 as uuidv4 } from 'uuid';

export const saveMessage = async (req, res) => {
  try {
    const { text, conversationId, messageType = 'user' } = req.body;
    const userId = req.user.id; 

    if (!text || !conversationId) {
      return res.status(400).json({ 
        success: false, 
        error: 'Text and conversationId are required' 
      });
    }

    const message = new Message({
      text,
      user: userId,
      conversationId,
      messageType,
    });

    await message.save();

    res.status(201).json({
      success: true,
      message: 'Message saved successfully',
      data: message
    });

  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to save message'
    });
  }
};

export const getConversations = async (req, res) => {
  try {
    const userId = req.user.id;

    const conversations = await Message.aggregate([
      { $match: { user: userId } },
      { $group: { 
        _id: '$conversationId',
        lastMessage: { $last: '$text' },
        lastTimestamp: { $last: '$timestamp' },
        messageCount: { $sum: 1 }
      }},
      { $sort: { lastTimestamp: -1 } }
    ]);

    res.json({
      success: true,
      conversations
    });

  } catch (error) {
    console.error('Error fetching conversations:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch conversations'
    });
  }
};

export const getConversationMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const userId = req.user.id;

    const messages = await Message.find({
      user: userId,
      conversationId: conversationId
    }).sort({ timestamp: 1 });

    res.json({
      success: true,
      messages
    });

  } catch (error) {
    console.error('Error fetching conversation messages:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch conversation messages'
    });
  }
};

export const createConversation = async (req, res) => {
  try {
    const conversationId = uuidv4();
    
    res.json({
      success: true,
      conversationId
    });

  } catch (error) {
    console.error('Error creating conversation:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create conversation'
    });
  }
};

export const deleteConversation = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const userId = req.user.id;

    const result = await Message.deleteMany({
      user: userId,
      conversationId: conversationId
    });

    res.json({
      success: true,
      message: 'Conversation deleted successfully',
      deletedCount: result.deletedCount
    });

  } catch (error) {
    console.error('Error deleting conversation:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete conversation'
    });
  }
};


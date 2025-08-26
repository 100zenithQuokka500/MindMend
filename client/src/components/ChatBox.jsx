import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useAuth } from '../context/useAuth';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [currentConversationId, setCurrentConversationId] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const messagesEndRef = useRef(null);
  const { user } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (user) {
      loadConversations();
    }
  }, [user]);

  useEffect(() => {
    if (currentConversationId) {
      loadConversationMessages(currentConversationId);
    }
  }, [currentConversationId]);

  const loadConversations = async () => {
    try {
      const response = await axios.get('/api/v1/chat/conversations', {
        withCredentials: true
      });
      if (response.data.success) {
        setConversations(response.data.conversations);
      }
    } catch (error) {
      console.error('Error loading conversations:', error);
    }
  };

  const loadConversationMessages = async (conversationId) => {
    try {
      const response = await axios.get(`/api/v1/chat/conversations/${conversationId}/messages`, {
        withCredentials: true
      });
      if (response.data.success) {
        const formattedMessages = response.data.messages.map(msg => ({
          text: msg.text,
          user: msg.messageType === 'user' ? 'You' : 'Gemini',
          timestamp: new Date(msg.timestamp).toLocaleTimeString()
        }));
        setMessages(formattedMessages);
      }
    } catch (error) {
      console.error('Error loading conversation messages:', error);
    }
  };

  const createNewConversation = async () => {
    try {
      const response = await axios.post('/api/v1/chat/conversations', {}, {
        withCredentials: true
      });
      if (response.data.success) {
        setCurrentConversationId(response.data.conversationId);
        setMessages([]);
        await loadConversations(); 
      }
    } catch (error) {
      console.error('Error creating conversation:', error);
    }
  };

  const deleteConversation = async (conversationId) => {
    try {
      await axios.delete(`/api/v1/chat/conversations/${conversationId}`, {
        withCredentials: true
      });
      await loadConversations();
      if (currentConversationId === conversationId) {
        setCurrentConversationId(null);
        setMessages([]);
      }
    } catch (error) {
      console.error('Error deleting conversation:', error);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    if (!currentConversationId) {
      await createNewConversation();
      return; 
    }

    const userMessage = { text: input, user: 'You', timestamp: new Date().toLocaleTimeString() };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setInput('');

    try {
      const response = await axios.post('/api/v1/user/gemini', 
        { 
          prompt: input, 
          conversationId: currentConversationId 
        },
        {
          withCredentials: true
        }
      );
      
      if (response.data.success && response.data.response) {
        const assistantMessage = { 
          text: response.data.response, 
          user: 'Gemini', 
          timestamp: new Date().toLocaleTimeString() 
        };
        setMessages(prev => [...prev, assistantMessage]);
        await loadConversations(); 
      } else {
        throw new Error('Invalid response format from API');
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = error.response?.data?.error || error.message || 'Unable to get a response from the API';
      setMessages(prev => [...prev, { 
        text: `Error: ${errorMessage}`, 
        user: 'System', 
        timestamp: new Date().toLocaleTimeString() 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatConversationTitle = (lastMessage) => {
    return lastMessage.length > 30 ? lastMessage.substring(0, 30) + '...' : lastMessage;
  };

  if (!user) {
    return (
      <div className="chat-container max-w-md mx-auto p-8 m-10 bg-white shadow-lg rounded-lg text-center">
        <p className="text-gray-600">Please sign in to use the chat feature.</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`w-80 bg-white shadow-lg transition-transform duration-300 ${showSidebar ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">Chat History</h2>
            <button
              onClick={() => setShowSidebar(false)}
              className="md:hidden text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          <button
            onClick={createNewConversation}
            className="w-full mt-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-blue-600 transition duration-300"
          >
            New Chat
          </button>
        </div>
        
        <div className="overflow-y-auto h-full">
          {conversations.map((conv) => (
            <div
              key={conv._id}
              className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                currentConversationId === conv._id ? 'bg-purple-50 border-purple-200' : ''
              }`}
              onClick={() => setCurrentConversationId(conv._id)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {formatConversationTitle(conv.lastMessage)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(conv.lastTimestamp).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-gray-400">
                    {conv.messageCount} messages
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteConversation(conv._id);
                  }}
                  className="text-red-500 hover:text-red-700 text-sm ml-2"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="bg-white shadow-sm p-4 flex items-center justify-between">
          <button
            onClick={() => setShowSidebar(true)}
            className="md:hidden text-gray-500 hover:text-gray-700"
          >
            ☰
          </button>
          <h1 className="text-xl font-semibold text-gray-800">MindMend Chat</h1>
          <div className="text-sm text-gray-500">
            {user.firstname} {user.lastname}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {messages.length === 0 && !currentConversationId ? (
            <div className="text-center text-gray-500 mt-20">
              <p className="text-lg mb-4">Welcome to MindMend Chat!</p>
              <p>Start a new conversation to begin chatting with our AI assistant.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.user === 'You' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      msg.user === 'You'
                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                        : msg.user === 'System'
                        ? 'bg-red-200 text-red-800'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p className="text-xs opacity-70 mt-1">{msg.timestamp}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-200 text-gray-800 max-w-xs lg:max-w-md px-4 py-2 rounded-lg">
                    <p className="text-sm">Gemini is thinking...</p>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="bg-white border-t p-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:from-purple-600 hover:to-blue-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Sending...' : 'Send'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;

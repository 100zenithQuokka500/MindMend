import { useState } from 'react';
import axios from 'axios';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return; 
    setMessages([...messages, { text: input, user: 'You' }]);
    setIsLoading(true);
    try {
      const response = await axios.post(`/api/v1/user/gemini`, { prompt: input });
      if (response.data.success && response.data.response) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: response.data.response, user: 'Gemini' },
        ]);
      } else {
        throw new Error('Invalid response format from API');
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = error.response?.data?.error || error.message || 'Unable to get a response from the API';
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: `Error: ${errorMessage}`, user: 'System' },
      ]);
    } finally {
      setIsLoading(false);
      setInput('');
    }
  };

  return (
    <div className="chat-container max-w-md mx-auto p-8 m-10 bg-white shadow-lg rounded-lg" style={{ height: '600px' }}>
      <div className="messages mb-4 overflow-y-auto" style={{ height: 'calc(100% - 150px)' }}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.user === 'You' ? 'bg-blue-500 text-white' : msg.user === 'System' ? 'bg-red-200 text-red-800' : 'bg-gray-200 text-black'} p-3 rounded-lg mb-2`}
          >
            <p>{msg.text}</p>
          </div>
        ))}
        {isLoading && (
          <div className="message bg-gray-200 text-black p-3 rounded-lg mb-2">
            <p>Gemini is thinking...</p>
          </div>
        )}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
        disabled={isLoading}
      />
      <button
        onClick={sendMessage}
        disabled={isLoading || !input.trim()}
        className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-lg shadow-lg hover:from-purple-600 hover:to-blue-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Sending...' : 'Send'}
      </button>
    </div>
  );
};

export default ChatBox;

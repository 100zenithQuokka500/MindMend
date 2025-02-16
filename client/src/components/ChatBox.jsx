import { useState } from 'react';
import axios from 'axios';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return; // Prevent sending empty messages

    // Add the user's message to the chat
    setMessages([...messages, { text: input, user: 'You' }]);

    try {
      // Send the message to the Gemini API
      const response = await axios.post('/api/gemini', { prompt: input });

      // Add the API's response to the chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: response.data.response, user: 'Gemini' },
      ]);
    } catch (error) {
      console.error('Error:', error);
      // Optionally, add an error message to the chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Error: Unable to get a response from the API', user: 'System' },
      ]);
    }

    // Clear the input field
    setInput('');
  };

  return (
    <div className="chat-container max-w-md mx-auto p-8 m-10 bg-white shadow-lg rounded-lg" style={{ height: '600px' }}>
      <div className="messages mb-4 overflow-y-auto" style={{ height: 'calc(100% - 150px)' }}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.user === 'You' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'} p-3 rounded-lg mb-2`}
          >
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
      />
      <button
        onClick={sendMessage} // Corrected onClick attribute
        className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-lg shadow-lg hover:from-purple-600 hover:to-blue-600 transition duration-300"
      >
        Send
      </button>
    </div>
  );
};

export default ChatBox;

import { useState } from 'react';
import {
  ArrowLeft,
  Mic,
  MoreHorizontal,
  PaperclipIcon,
  Send,
  Square,
} from 'lucide-react';
import { HiOutlineSpeakerWave } from 'react-icons/hi2';

export default function TravelAIBot() {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content:
        "Hello! 👋\nI'm your new friend, Travel AI bot, here to help you explore the world! 🌍 Ready to plan your next adventure? 🗺️🧳",
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [attachment, setAttachment] = useState(null);

  // Handle sending messages
  const handleSend = () => {
    if (inputText || attachment) {
      if (attachment) {
        setMessages([
          ...messages,
          { type: 'user', content: attachment.name, messageType: 'file' },
        ]);
      } else {
        setMessages([
          ...messages,
          { type: 'user', content: inputText, messageType: 'text' },
        ]);
      }

      setInputText('');
      setAttachment(null);

      // Simulate bot response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            type: 'bot',
            content:
              'Thanks for your message! How can I assist you with your travel plans?',
          },
        ]);
      }, 1000);
    }
  };

  // Handle recording toggle
  const handleRecordToggle = () => {
    setIsRecording(!isRecording);
    if (isRecording) {
      // Simulate sending audio
      handleSend('Audio message', 'audio');
    }
  };

  // Handle file attachment
  const handleAttachment = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachment(file);
    }
  };

  return (
    <div className="flex text-white justify-center items-center min-h-screen w-full bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg w-full h-full max-w-7xl mx-auto">
        <div className="flex flex-row items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-4">
            <button className="md:hidden">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="rounded-full overflow-hidden bg-gray-200 h-10 w-10 flex items-center justify-center">
              <img
                src="/images/chatbot logooo.jpg"
                alt="AI"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-8 text-black items-center">
                <div>
                  <h2 className="text-base text-black font-semibold">
                    Travel AI bot
                  </h2>
                  <p className="text-xs text-gray-500">@official</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <HiOutlineSpeakerWave className="h-6 w-6 text-black" />
            <MoreHorizontal className="h-6 w-6 text-black" />
          </div>
        </div>

        <div className="p-4 h-[500px] overflow-y-auto">
          <div className="flex items-center justify-center overflow-hidden">
            <img
              src="/images/chatbot logooo.jpg"
              alt="AI"
              className="h-28 w-28 object-cover bg-gray-200 mb-8 rounded-full border border-black"
            />
          </div>
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start space-x-4 ${
                  message.type === 'user' ? 'justify-end' : ''
                }`}
              >
                {message.type === 'bot' && (
                  <div className="rounded-full overflow-hidden bg-gray-200 h-10 w-10 flex items-center justify-center">
                    <img
                      src="/images/chatbot logooo.jpg"
                      alt="AI"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div
                  className={`rounded-lg p-4 max-w-[80%] ${
                    message.type === 'bot' ? 'bg-[#00b4d8]' : 'bg-[#006d91]'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  {message.messageType === 'audio' && (
                    <p className="text-xs text-gray-500 mt-1">🎤 Audio message</p>
                  )}
                  {message.messageType === 'file' && (
                    <p className="text-xs text-gray-500 mt-1">📎 {message.content}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border-t">
          <form
            className="flex w-full text-black items-center space-x-2"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <input
              type="file"
              id="file-attachment"
              className="hidden"
              onChange={handleAttachment}
            />
            <button
              type="button"
              className="text-black"
              onClick={() =>
                document.getElementById('file-attachment')?.click()
              }
            >
              <PaperclipIcon className="h-8 w-8" />
            </button>
            {attachment && (
              <span className="text-xs text-gray-500">File: {attachment.name}</span>
            )}
            <input
              type="text"
              className="flex-1 px-3 py-2 border border-[#00b4d8] rounded-lg focus:outline-none focus:ring-[#00b4d8]"
              placeholder="Send message..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button
              type="button"
              className="text-black mr-8"
              onClick={handleRecordToggle}
            >
              {isRecording ? (
                <Square className="h-5 w-5 text-red-500" />
              ) : (
                <Mic className="h-8 w-8" />
              )}
            </button>
            <button
              type="submit"
              className="p-2 rounded-md text-black"
            >
              <Send className="h-8 w-8" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

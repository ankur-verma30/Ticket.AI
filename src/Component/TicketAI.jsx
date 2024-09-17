
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useState } from 'react';


const initialUsersData = {
  John: {
    name: 'Travel.AI bot',
    status: '@Official',
    id: '12345',
    icon: '👨',
    blocked: false,
    muted: false, // Add muted property
    messages: [
      { sender: 'bot', text: 'Hello! How can I assist you today?', time: '10:00 AM' },
      { sender: 'user', text: 'I need some help.', time: '10:01 AM' }
    ]
  }
};

function TicketAI() {
  const [usersData, setUsersData] = useState(initialUsersData);
  const [activeUser, setActiveUser] = useState('John');
  const [input, setInput] = useState('');
  const [showCard, setShowCard] = useState(false); // State to show/hide card

  const messages = usersData[activeUser].messages;
  const isBlocked = usersData[activeUser].blocked;
  const isMuted = usersData[activeUser].muted;

  const handleSendMessage = () => {
    if (!isBlocked && input.trim()) {
      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setUsersData({
        ...usersData,
        [activeUser]: {
          ...usersData[activeUser],
          messages: [...usersData[activeUser].messages, { sender: 'user', text: input, time }]
        }
      });
      setInput('');

      setTimeout(() => {
        setUsersData((prevData) => ({
          ...prevData,
          [activeUser]: {
            ...prevData[activeUser],
            messages: [
              ...prevData[activeUser].messages,
              { sender: 'bot', text: 'Thanks for your message!', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
            ]
          }
        }));
      }, 1000);
    }
  };

  const handleIconClick = () => {
    setShowCard(!showCard); // Toggle card visibility
  };

  // Handle "Enter" keypress to send message
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="chat-container">
      {/* Sidebar */}
      <div className="chat-sidebar">
        <div className="icons-and-line">
          <div className="vertical-icons">
            <i className="fas fa-comment"></i>
            <i className="fas fa-bell"></i>
            <i className="fas fa-arrow-down"></i>
            <i className="fas fa-headphones"></i>

            <div className="sidebar-item bottom-icon">
              <i className="fa-solid fa-gear"></i>
            </div>

            <div className="sidebar-item bottom-icon">
              <img src="src\assets\images\image1.jpg" className="circle-icon" alt="Icon" onClick={handleIconClick} />
            </div>
          </div>

          <div className="vertical-line"></div>

          {/* Profile section */}
          <div className="profile-section">
            <div className="profile-pic">{usersData[activeUser].icon}</div><br />
            <div className="profile-name">{usersData[activeUser].name}</div>
          </div>

          <div className="settings-container">
            {/* Voice Section */}
            <div className="settings-item">
              <div className="icon-and-label">
                <i className="fas fa-microphone"></i>
                <span>Voice</span>
              </div>
              <div className="settings-value">EnergeticYouth</div>
            </div>

            {/* Language Section */}
            <div className="settings-item">
              <div className="icon-and-label">
                <i className="fas fa-globe"></i>
                <span>Language</span>
              </div>
              <div className="settings-value">English</div>
            </div>

            {/* Clear Chat Section */}
            <div className="settings-item clear-chat">
              <div className="icon-and-label">
                <i className="fas fa-trash"></i>
                <span>Clear Chat</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Window */}
      {activeUser ? (
        <div className="chat-window">
          <div className="chat-header">
            <div className="profile-pic-large">{usersData[activeUser].icon}</div>
            <div className="profile-info">
              <div className="profile-name">{usersData[activeUser].name}</div>
              <div className="profile-status">{usersData[activeUser].status}</div>
            </div>
            <div className="icon-wrapper">
              <i className={`fas fa-volume-up ${isMuted ? 'muted' : ''}`} onClick={() => { }}></i>
              <i className="fas fa-ellipsis-v" onClick={() => { }}></i>
            </div>
          </div>

          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-bubble ${msg.sender}`}>
                <div className="message-text">{msg.text}</div>
                <div className="message-time">{msg.time}</div>
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message"
              onKeyPress={handleKeyPress} // Send message on "Enter" key press
            />
            <div className="icon-buttons">
              <i className="fas fa-microphone"></i>
              <div className="circle-button" onClick={handleSendMessage}>
                <i className="fas fa-plus"></i>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="chat-window no-chat-selected">
          <p>Select a chat to start messaging</p>
        </div>
      )}

      {/* Card that appears when icon.png is clicked */}
      {showCard && (
        <div className="profile-card">
          <div className="card-header">
            <div className="card-left">
              <img src="src\assets\images\image1.jpg" className="circle-icon-large" alt="User Icon" />
            </div>
            <div className="card-center">
              <div className="card-name">Starry Sia</div>
            </div>
            <div className="card-right">
              <i className="fas fa-edit"></i>
            </div>
          </div>
          <div className="card-footer">
            <div className="input-group">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" placeholder="Starry Sia" />
            </div>
            <div className="input-group">
              <label htmlFor="id">ID:</label>
              <input type="text" id="id" defaultValue={usersData[activeUser].id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TicketAI;

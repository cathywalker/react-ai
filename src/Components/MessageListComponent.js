const MessageList = ({ messages }) => (
    <div>
      {messages.map((message, index) => (
        message.role && (
          <div key={index} className={`message ${message.role}`}>
            {message.content}
          </div>)
      ))}
    </div>
  );

  export default MessageList;
  
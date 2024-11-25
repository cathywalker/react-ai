import React, { useState, useEffect, useCallback } from 'react';
import { fetchComedians, fetchJoke } from './apiService';
import MessageList from './MessageListComponent';
import InputForm from './InputFormComponent';
import ComedianButton from './ComedianComponent';
import LoadingSpinner from './LoadingSpinnerComponent';

const ChatComponent = () => {
  const [loading, setLoading] = useState(true);
  const [gettingData, setGettingData] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [comedians, setComedians] = useState([]);
  const [displayNoInputWarning, setDisplayNoInputWarning] = useState(false);
  const [chosenComedian, setChosenComedian] = useState('Mitch Hedberg');

  // Fetch comedians list on component mount
  useEffect(() => {
    const loadComedians = async () => {
      setLoading(true);
      const comediansList = await fetchComedians();
      setComedians(comediansList);
      setLoading(false);
    };
    loadComedians();
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    setDisplayNoInputWarning(!value);
  };

  // Handle comedian selection
  const handleChooseComedian = useCallback((comedian) => {
    setChosenComedian(comedian);
  }, []);

  // Handle sending the message
  const handleSendMessage = async (event) => {
    event.preventDefault();
    if (!input) {
      setDisplayNoInputWarning(true);
      return;
    }

    setGettingData(true);
    const joke = await fetchJoke(input, chosenComedian);
    setMessages((prevMessages) => [...prevMessages, { role: 'assistant', content: joke }]);
    setGettingData(false);
    setInput('');
  };

  return (
    <>
      {loading ? (
        <LoadingSpinner color="#36D7B7" size={150} />
      ) : (
        <div>
          {gettingData && <LoadingSpinner color="#36D7B7" size={40} />}
          <MessageList messages={messages} />
          <InputForm
            input={input}
            onInputChange={handleInputChange}
            handleSubmit={handleSendMessage}
            displayWarning={displayNoInputWarning}
          />
          <div className="button-container">
            {comedians.map((comedian, index) => (
              <ComedianButton
                key={index}
                comedian={comedian}
                isSelected={comedian === chosenComedian}
                onSelect={() => handleChooseComedian(comedian)}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ChatComponent;

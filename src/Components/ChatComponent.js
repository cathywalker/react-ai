import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MessageList from './MessageListComponent';
import InputForm from './InputFormComponent';
import ComedianButton from './ComedianComponent';
import LoadingSpinner from './LoadingSpinnerComponent';

const ChatComponent = () => {
  const [loading, setLoading] = useState(true);
  const [gettingData, setGettingData] = useState(false);
  const [input, setInput] = useState('');
  const [payload, setPayload] = useState('');
  const [messages, setMessages] = useState([]);
  // set default comedians in case server call fails
  const [comedians, setComedians] = useState([ 'Mitch Hedberg', 
    'George Carlin', 'Dave Chappelle', 'Taylor Tomlinson',
    'Sarah Silverman', 'John Mulaney', 'Bo Burnham', 'Bill Burr',
    'Iliza Shlesinger', 'Jim Gaffigan', 'Kevin Hart', 'Ali Wong',
    'Hannah Gadsby', 'Trevor Noah', 'Chris Rock', 'Eddie Murphy',
    'Richard Pryor', 'Jerry Seinfeld', 'Robin Williams', 'Amy Schumer',
    'Gabriel Iglesias', 'Russell Peters', 'Jo Koy', 'Dave Attell',
    'Patton Oswalt', 'Maria Bamford', 'Brian Regan', 'Jim Jefferies',
    'Tom Segura', 'Bill Hicks', 'Doug Stanhope', 'Anthony Jeselnik']);
  const [displayNoInputWarning, setDisplayNoInputWarning] = useState(false);
  const [chosenComedian, setChosenComedian] = useState('Mitch Hedberg');
  const prefix = 'Give me a joke about ';
  const suffix = ' in the style of ';

  const getComedians = async () => {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model:"gpt-3.5-turbo",
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: `give me an list of 25 comedians names in the style of ['name 1', 'name 2'] with no other text in the response and exclude Ellen Degeneres and Louis C.K.` },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer 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`
        },
      }
    );
    
    if(response.data.choices[0].message.content){
      const comedianNames = response.data.choices[0].message.content.match(/'([^']+)'/g);
      const comediansArray = comedianNames.map(name => name.replace(/'/g, ''));
      setComedians(comediansArray);
    }
    setLoading(false);
  };

  useEffect(() => {
    getComedians();
  }, []); 
  
  const handleInputChange = async (e) => {
    if(e.target.value === ''){
      setDisplayNoInputWarning(true);
    } else {
      setDisplayNoInputWarning(false);
      setInput(e.target.value);
      setPayload(prefix + e.target.value + suffix + chosenComedian);
    } 
  };

  const handleChooseComedian = (comedianName) => {
    setChosenComedian(comedianName);
    setPayload(prefix + input + suffix + comedianName);
  };

  const handleSendMessage = async (event) => {
    event.preventDefault(); 
    if(input === ''){
      setDisplayNoInputWarning(true);
      return;
    }
    setGettingData(true);
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model:"gpt-3.5-turbo",
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: payload },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer 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`
        },
      }
    );

    setMessages([{}, { role: 'assistant', content: response.data.choices[0].message.content }]);
    setGettingData(false);
    setInput('');
  };

  return (
    <>
      {loading ? (
        <LoadingSpinner color={"#36D7B7"} size={150} />
      ) : (
        <div>
          {gettingData && <LoadingSpinner color={"#36D7B7"} size={40} />}
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
                onSelect={handleChooseComedian}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ChatComponent;
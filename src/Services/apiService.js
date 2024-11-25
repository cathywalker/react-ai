import axios from 'axios';

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
const apiEndpoint = 'https://api.openai.com/v1/chat/completions';

const axiosInstance = axios.create({
  baseURL: apiEndpoint,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  },
});

// Fetch a list of comedians
export const fetchComedians = async () => {
  try {
    const response = await axiosInstance.post('', {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        {
          role: 'user',
          content: `Give me a list of 25 comedians names in the format ['name 1', 'name 2'] with no other text.`,
        },
      ],
    });
    const comedianData = response.data.choices[0]?.message?.content;
    if (comedianData) {
      const comedianNames = comedianData.match(/'([^']+)'/g);
      return comedianNames?.map(name => name.replace(/'/g, '')) || [];
    }
    return [];
  } catch (error) {
    console.error('Error fetching comedians:', error);
    return [];
  }
};

// Fetch a joke based on user input and selected comedian
export const fetchJoke = async (input, comedian) => {
  const payload = `Give me a joke about ${input} in the style of ${comedian}`;
  try {
    const response = await axiosInstance.post('', {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: payload },
      ],
    });
    return response.data.choices[0]?.message?.content || 'No joke found.';
  } catch (error) {
    console.error('Error fetching joke:', error);
    return 'Sorry, something went wrong.';
  }
};

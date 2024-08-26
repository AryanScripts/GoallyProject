// src/api.js

import axios from 'axios';

const API_URL = 'https://devapi.getgoally.com/v1/api/reminders/all';
const AUTH_TOKEN = '2aaed08b-2f37-4547-8ef7-372ff1adad3a';

export const fetchTasks = async (page = 1, limit = 10, searchTerm = '') => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: AUTH_TOKEN,
      },
      params: {
        page,
        limit,
        search: searchTerm,
      },
    });
    return response.data; // Adjust based on the actual API response structure
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

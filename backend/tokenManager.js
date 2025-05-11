const axios = require('axios');
require('dotenv').config();

let cachedToken = null;
let tokenExpiresAt = 0;

async function fetchToken() {
  try {
    const response = await axios.post('https://rest.contabilium.com/token', new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: process.env.API_KEY,
      client_secret: process.env.API_KEY_SECRET
    }).toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const data = response.data;
    cachedToken = data.access_token;
    tokenExpiresAt = Date.now() + data.expires_in * 1000;

    return cachedToken;
  } catch (error) {
    console.error('Error obteniendo token:', error.response?.data || error.message);
    return null;
  }
}

async function getToken() {
  if (cachedToken && Date.now() < tokenExpiresAt) {
    return cachedToken;
  }
  return await fetchToken();
}

module.exports = { getToken };

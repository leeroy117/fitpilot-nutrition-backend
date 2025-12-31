import axios from 'axios';

const BASE_URL = 'http://localhost:3000/v1';

async function verifyAuth() {
  try {
    const timestamp = Date.now();
    const email = `testuser${timestamp}@example.com`;
    const password = 'password123';

    console.log(`--- Testing Auth Flow for ${email} ---`);

    // 1. Signup
    console.log('\n1. Testing Signup...');
    const signupRes = await axios.post(`${BASE_URL}/auth/signup`, {
      name: 'Test User',
      email,
      password,
    });
    console.log('Signup Successful:', signupRes.data.access_token ? 'Token Received' : 'No Token');
    const signupTokens = signupRes.data;

    // 2. Login
    console.log('\n2. Testing Login...');
    const loginRes = await axios.post(`${BASE_URL}/auth/login`, {
      email,
      password,
    });
    console.log('Login Successful:', loginRes.data.access_token ? 'Token Received' : 'No Token');
    const loginTokens = loginRes.data;

    // 3. Protected Route
    console.log('\n3. Testing Protected Route (Profile)...');
    const profileRes = await axios.get(`${BASE_URL}/auth/profile`, {
      headers: { Authorization: `Bearer ${loginTokens.access_token}` },
    });
    console.log('Profile Access Successful:', profileRes.data.email === email);

    // 4. Refresh Token
    console.log('\n4. Testing Refresh Token...');
    const refreshRes = await axios.post(`${BASE_URL}/auth/refresh`, {
      refresh_token: loginTokens.refresh_token,
    });
    console.log('Refresh Successful:', refreshRes.data.access_token ? 'New Token Received' : 'No Token');

    console.log('\n--- Auth Verification Complete: SUCCESS ---');
  } catch (error: any) {
    console.error('\n--- Auth Verification FAILED ---');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else {
      console.error(error.message);
    }
    process.exit(1);
  }
}

verifyAuth();

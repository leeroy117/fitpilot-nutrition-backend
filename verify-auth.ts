import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:3000/v1';

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

    // Decode and log token payload for verification
    let userId;
    if (loginTokens.access_token) {
        const base64Url = loginTokens.access_token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        const payload = JSON.parse(jsonPayload);
        console.log('Token Payload (Initial):', payload);
        userId = payload.sub;

        // 2.1 Update Role
        console.log(`\n2.1. Updating User Role for ID ${userId}...`);
        try {
            await axios.patch(`${BASE_URL}/users/${userId}`, {
                role: 'CLIENT'
            });
            console.log('Role Update Successful');

            // 2.2 Re-Login
            console.log('\n2.2. Re-Logging in...');
            const loginRes2 = await axios.post(`${BASE_URL}/auth/login`, {
              email,
              password,
            });
            const loginTokens2 = loginRes2.data;

             if (loginTokens2.access_token) {
                const base64Url2 = loginTokens2.access_token.split('.')[1];
                const base642 = base64Url2.replace(/-/g, '+').replace(/_/g, '/');
                const jsonPayload2 = decodeURIComponent(atob(base642).split('').map(function(c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
                const payload2 = JSON.parse(jsonPayload2);
                console.log('Token Payload (After Role Update):', payload2);
             }

             // 2.3 Create Professional Client Relationship to test Derived Roles
             // We need another user to be the client
             console.log('\n2.3. Testing Professional Client Roles...');
             // Create a dummy client
             const clientEmail = `client${Date.now()}@example.com`;
             const clientRes = await axios.post(`${BASE_URL}/auth/signup`, {
                 name: 'Test Client',
                 email: clientEmail,
                 password: 'password123'
             });
             const clientId = clientRes.data.access_token ? JSON.parse(atob(clientRes.data.access_token.split('.')[1])).sub : null;
             
             if (clientId) {
                 console.log(`Created Client ID: ${clientId}`);
                 // Make our main user a PROFESSIONAL first
                 await axios.patch(`${BASE_URL}/users/${userId}`, { role: 'PROFESSIONAL' });
                 
                 // Assign a professional client relationship
                 // Note: We need an endpoint to create this. Assuming one exists or we can't test this easily without direct DB access or specific endpoint.
                 // Checking routes... we saw ProfessionalClientsController.
                 try {
                     await axios.post(`${BASE_URL}/professional-clients`, {
                         professional_id: userId,
                         client_id: clientId,
                         service_type: 'BOTH' // Should give TRAINER and NUTRITIONIST
                     });
                     console.log('Professional Client Relationship Created');

                     // Re-login main user to check roles
                      const loginRes3 = await axios.post(`${BASE_URL}/auth/login`, {
                          email,
                          password,
                        });
                        const loginTokens3 = loginRes3.data;
                         if (loginTokens3.access_token) {
                            const base64Url3 = loginTokens3.access_token.split('.')[1];
                            const base643 = base64Url3.replace(/-/g, '+').replace(/_/g, '/');
                            const jsonPayload3 = decodeURIComponent(atob(base643).split('').map(function(c) {
                                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                            }).join(''));
                            const payload3 = JSON.parse(jsonPayload3);
                            console.log('Token Payload (After Prof Client Add):', payload3);
                         }

                 } catch (err: any) {
                     console.log('Failed to create professional client relationship', err.message);
                      if (err.response) console.log(err.response.data);
                 }
             }

        } catch (e: any) {
             console.log('Failed to update role or re-login', e.message);
             if (e.response) console.log(e.response.data);
        }
    }

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
      console.error('Data:', JSON.stringify(error.response.data, null, 2));
    } else if (error.request) {
      console.error('No response received:', error.message);
    } else {
      console.error('Error:', error.message);
    }
    process.exit(1);
  }
}

verifyAuth();

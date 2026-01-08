// This script verifies the logic used in AuthService.generateTokens for aggregating professional roles.

function aggregateRoles(user: any) {
  const professionalRoles = new Set<string>();

  // 1. Add professional roles from user_professional_roles
  if (user.user_professional_roles) {
    user.user_professional_roles.forEach((userRole: any) => {
      if (userRole.role) {
        professionalRoles.add(userRole.role);
      }
    });
  }

  // 2. Derive roles from professional_clients
  if (user.professional_clients_professional_clients_professional_idTousers) {
    user.professional_clients_professional_clients_professional_idTousers.forEach((client: any) => {
      if (client.service_type === 'NUTRITION' || client.service_type === 'BOTH') {
        professionalRoles.add('NUTRITIONIST');
      }
      if (client.service_type === 'TRAINING' || client.service_type === 'BOTH') {
        professionalRoles.add('TRAINER');
      }
    });
  }

  return Array.from(professionalRoles);
}

// Test Case 1: Multiple roles in user_professional_roles
const user1 = {
  user_professional_roles: [
    { role: 'NUTRITIONIST' },
    { role: 'TRAINER' }
  ],
  professional_clients_professional_clients_professional_idTousers: []
};
console.log('Test Case 1 (Multiple roles):', aggregateRoles(user1));
// Expected: ['NUTRITIONIST', 'TRAINER']

// Test Case 2: Mixed roles (one static, one derived)
const user2 = {
  user_professional_roles: [
    { role: 'NUTRITIONIST' }
  ],
  professional_clients_professional_clients_professional_idTousers: [
    { service_type: 'TRAINING' }
  ]
};
console.log('Test Case 2 (Mixed roles):', aggregateRoles(user2));
// Expected: ['NUTRITIONIST', 'TRAINER']

// Test Case 3: Duplicate roles (one static, one derived)
const user3 = {
  user_professional_roles: [
    { role: 'NUTRITIONIST' }
  ],
  professional_clients_professional_clients_professional_idTousers: [
    { service_type: 'NUTRITION' }
  ]
};
console.log('Test Case 3 (Duplicate roles):', aggregateRoles(user3));
// Expected: ['NUTRITIONIST']

// Test Case 4: BOTH service type
const user4 = {
  user_professional_roles: [],
  professional_clients_professional_clients_professional_idTousers: [
    { service_type: 'BOTH' }
  ]
};
console.log('Test Case 4 (BOTH service type):', aggregateRoles(user4));
// Expected: ['NUTRITIONIST', 'TRAINER']

// Initial static data to simulate database
let selectedServices = new Set([
  // Electronics > Smartphones > iPhone
  '1-1-1-1', // Screen Repair
  '1-1-1-2', // Battery Replacement
  // Home Appliances > Refrigerators > Samsung
  '2-1-1-1', // Cooling System Repair
  // Smart Home > Security Systems > Ring
  '3-1-1-1', // Camera Installation
  '3-1-1-2', // Doorbell Setup
]);

export const fetchUserPreferences = async () => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  return Array.from(selectedServices);
};

export const saveUserPreferences = async (services) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  selectedServices = new Set(services);
};
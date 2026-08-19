const crypto = require('crypto');

const API_URL = 'http://127.0.0.1:3000/api/telemetry';
const VEHICLES = ['veh-sim-01', 'veh-sim-02', 'veh-sim-03'];

const generateEvent = (vehicleId) => {
  // Restored random speed generation (60-130 km/h)
  const speedKmh = Math.floor(Math.random() * 70) + 60;
  const fuelLevelPercent = Math.floor(Math.random() * 95) + 5;

  return {
    eventId: crypto.randomUUID(),
    vehicleId,
    timestamp: new Date().toISOString(),
    location: {
      lat: 12.9716 + (Math.random() * 0.01),
      lng: 77.5946 + (Math.random() * 0.01)
    },
    speedKmh,
    fuelLevelPercent,
    engineStatus: 'on'
  };
};

const sendTelemetry = async () => {
  const vehicleId = VEHICLES[Math.floor(Math.random() * VEHICLES.length)];
  const event = generateEvent(vehicleId);
  
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event)
    });

    if (response.ok) {
      console.log(`[DELIVERED] ${vehicleId} | Speed: ${event.speedKmh}km/h | Fuel: ${event.fuelLevelPercent}%`);
    } else {
      console.error(`[REJECTED] Payload failed validation: ${response.status}`);
    }
  } catch (err) {
    console.error(`[NETWORK ERROR] Is your API server running on port 3000?`);
  }
};

// Removed specific company branding
console.log('Starting Generic Fleet Telemetry Simulator...');
console.log('Press Ctrl+C to stop.\n');

setInterval(sendTelemetry, 2000);
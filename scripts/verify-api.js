// verify-api.js
// Simple script to verify the API is accessible

const baseUrl = "https://admin-antim.vercel.app";
const endpoints = [
  "/api",
  "/api/test",
  "/api/checkout"
];

async function checkEndpoint(url) {
  try {
    console.log(`Checking ${url}...`);
    const response = await fetch(url);
    const status = response.status;
    let body = null;
    
    try {
      body = await response.json();
    } catch (e) {
      console.log(`Error parsing JSON: ${e.message}`);
    }
    
    console.log(`Status: ${status}`);
    if (body) {
      console.log(`Response: ${JSON.stringify(body, null, 2)}`);
    }
    
    console.log("----------------------------");
    return { url, status, body };
  } catch (error) {
    console.log(`Error: ${error.message}`);
    console.log("----------------------------");
    return { url, error: error.message };
  }
}

async function main() {
  console.log("API Verification Tool");
  console.log("===========================");
  
  for (const endpoint of endpoints) {
    await checkEndpoint(`${baseUrl}${endpoint}`);
  }
  
  console.log("Verification complete");
}

main();

import { NextRequest, NextResponse } from "next/server";

// For troubleshooting, use a more permissive CORS configuration
export const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // Allow all origins temporarily for debugging
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With, Origin, Accept",
  "Access-Control-Allow-Credentials": "true",
};

export function corsMiddleware(req: NextRequest, res: NextResponse) {
  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return new NextResponse(null, { headers: corsHeaders });
  }

  // Add CORS headers to all responses
  const response = res;
  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

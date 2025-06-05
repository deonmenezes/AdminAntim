import { NextRequest, NextResponse } from "next/server";
import { corsHeaders } from "@/lib/cors";

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET() {
  try {
    console.log("[test_GET] Test endpoint called");
    
    return NextResponse.json(
      { message: "Test endpoint working correctly", timestamp: new Date().toISOString() },
      { headers: corsHeaders }
    );
  } catch (err: any) {
    console.log("[test_GET] Error:", err);
    return NextResponse.json(
      { error: "Test endpoint error", details: err.message },
      { 
        status: 500,
        headers: corsHeaders 
      }
    );
  }
}

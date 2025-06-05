import { NextRequest, NextResponse } from "next/server";
import { corsHeaders } from "@/lib/cors";

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET() {
  try {
    return NextResponse.json(
      { 
        status: "ok", 
        message: "API is running", 
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
        endpoints: [
          "/api/checkout",
          "/api/collections",
          "/api/products",
          "/api/orders",
          "/api/test"
        ]
      }, 
      { headers: corsHeaders }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "API Error", details: error.message },
      { 
        status: 500,
        headers: corsHeaders 
      }
    );
  }
}

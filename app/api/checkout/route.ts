import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { corsHeaders } from "@/lib/cors";
import { debugLog } from "@/lib/debug";

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: NextRequest) {
  try {
    console.log("[checkout_POST] Starting request processing");
    const { cartItems, customer } = await req.json();
    
    console.log("[checkout_POST] Request data:", { 
      cartItemsCount: cartItems?.length, 
      hasCustomer: !!customer 
    });
    
    if (!cartItems || !customer) {
      return NextResponse.json(
        { error: "Not enough data to checkout" }, 
        { 
          status: 400,
          headers: corsHeaders 
        }
      );    }

    console.log("[checkout_POST] Creating Stripe session with data:", {
      paymentMethodTypes: ["card"],
      mode: "payment",
      allowedCountries: ["US", "CA", "AE", "IN"],
      itemCount: cartItems.length,
      currency: "aed"
    });
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "AE", "IN"],
      },
      shipping_options: [
        { shipping_rate: "shr_1MfufhDgraNiyvtnDGef2uwK" },
        { shipping_rate: "shr_1OpHFHDgraNiyvtnOY4vDjuY" },
      ],
      line_items: cartItems.map((cartItem: any) => ({
        price_data: {
          currency: "aed",
          product_data: {
            name: cartItem.item.title,
            metadata: {
              productId: cartItem.item._id,
              ...(cartItem.size && { size: cartItem.size }),
              ...(cartItem.color && { color: cartItem.color }),
            },
          },
          unit_amount: cartItem.item.price * 100,
        },
        quantity: cartItem.quantity,
      })),
      client_reference_id: customer.clerkId,
      success_url: `${process.env.ECOMMERCE_STORE_URL}/payment_success`,
      cancel_url: `${process.env.ECOMMERCE_STORE_URL}/cart`,    });    return NextResponse.json(session, { headers: corsHeaders });  } catch (err: any) {
    console.log("[checkout_POST]", err);
    debugLog("checkout_error", { 
      error: err.message, 
      stack: err.stack 
    });
    return NextResponse.json(
      { error: "Internal Server Error", details: err.message },
      { 
        status: 500,
        headers: corsHeaders 
      }
    );
  }
}

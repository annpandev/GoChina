import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { callType, tag } = body;

    if (!callType || !["voice", "video"].includes(callType)) {
      return NextResponse.json(
        { error: "Valid callType is required." },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("live_help_sessions")
      .insert({
        call_type: callType,
        tag: tag || null,
        status: "searching",
      })
      .select()
      .single();

    if (error) {
      console.error("Create live help session error:", error);

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      session: data,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to create live help session." },
      { status: 500 }
    );
  }
}
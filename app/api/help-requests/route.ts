import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      city,
      category,
      description,
      preferredLanguage,
      helpType,
    } = body;

    if (!city || !category || !description) {
      return NextResponse.json(
        { error: "City, category, and description are required." },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("help_requests")
      .insert({
        city,
        category,
        description,
        preferred_language: preferredLanguage || "English",
        help_type: helpType || "voice",
        status: "pending",
      })
      .select()
      .single();

    if (error) {
      console.error("Help request error:", error);

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      helpRequest: data,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to create help request." },
      { status: 500 }
    );
  }
}
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      originCountry,
      cities,
      startDate,
      endDate,
      budget,
      interests,
      travelStyle,
    } = body;

    if (!cities || cities.length === 0) {
      return NextResponse.json(
        { error: "Please select at least one city." },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("trips")
      .insert({
        origin_country: originCountry || null,
        cities,
        start_date: startDate || null,
        end_date: endDate || null,
        budget: budget || null,
        interests: interests || [],
        travel_style: travelStyle || null,
        status: "draft",
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      trip: data,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}

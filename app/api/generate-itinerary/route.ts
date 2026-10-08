import { NextResponse } from "next/server";
import OpenAI from "openai";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { tripId } = body;

    if (!tripId) {
      return NextResponse.json(
        { error: "tripId is required" },
        { status: 400 }
      );
    }

    const { data: trip, error: tripError } = await supabaseAdmin
      .from("trips")
      .select("*")
      .eq("id", tripId)
      .single();

    if (tripError || !trip) {
      return NextResponse.json(
        { error: tripError?.message || "Trip not found" },
        { status: 404 }
      );
    }

    const prompt = `
Create a practical China travel itinerary for an international traveler.

Trip details:
- Origin country: ${trip.origin_country || "Unknown"}
- Cities: ${trip.cities?.join(", ")}
- Start date: ${trip.start_date}
- End date: ${trip.end_date}
- Budget: ${trip.budget}
- Interests: ${trip.interests?.join(", ")}
- Travel style: ${trip.travel_style}

Important:
- Focus on practical travel in China.
- Include transportation suggestions.
- Mention reservations when relevant.
- Mention useful local apps or payment considerations when helpful.
- Keep the plan realistic, not overloaded.
- Write for a first-time international traveler.

Return JSON only in this shape:

{
  "summary": "short trip summary",
  "days": [
    {
      "day": 1,
      "date": "YYYY-MM-DD",
      "city": "Shanghai",
      "theme": "Arrival and easy city introduction",
      "activities": [
        {
          "time": "09:00",
          "title": "Activity name",
          "description": "What to do and why",
          "transport": "How to get there",
          "tips": ["tip 1", "tip 2"]
        }
      ]
    }
  ]
}
`;

    const response = await openai.responses.create({
      model: "gpt-5-mini",
      input: prompt,
    });

    const text = response.output_text;

    let itinerary;

    try {
      itinerary = JSON.parse(text);
    } catch {
      return NextResponse.json(
        {
          error: "AI returned invalid JSON",
          raw: text,
        },
        { status: 500 }
      );
    }

    const { data: savedItinerary, error: saveError } =
      await supabaseAdmin
        .from("itineraries")
        .insert({
          trip_id: tripId,
          content: itinerary,
        })
        .select()
        .single();

    if (saveError) {
      return NextResponse.json(
        { error: saveError.message },
        { status: 500 }
      );
    }

    await supabaseAdmin
      .from("trips")
      .update({
        itinerary,
        status: "planned",
      })
      .eq("id", tripId);

    return NextResponse.json({
      success: true,
      itinerary: savedItinerary,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to generate itinerary" },
      { status: 500 }
    );
  }
}
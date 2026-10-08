import Link from "next/link";
import { notFound } from "next/navigation";

import ItineraryView from "@/components/ItineraryView";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export default async function TripPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: trip, error } = await supabaseAdmin
    .from("trips")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !trip) {
    notFound();
  }

  if (!trip.itinerary) {
    return (
      <main className="tripPage">
        <Link href="/plan" className="backLink">
          ← Plan another trip
        </Link>

        <div className="emptyTrip">
          <div className="kicker">TRIP CREATED</div>
          <h1>Your itinerary is still being prepared.</h1>
          <p>
            The trip exists, but there is no generated itinerary yet.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="tripPage">
      <div className="tripTopbar">
        <Link href="/" className="backLink">
          ← GoChina
        </Link>

        <Link href="/help" className="btn">
          Help Me Now
        </Link>
      </div>

      <ItineraryView itinerary={trip.itinerary} />

      <section className="tripHelpCard">
        <div>
          <div className="kicker">NEED A PERSON?</div>
          <h2>AI can plan the trip. Real people can help when things get messy.</h2>
          <p>
            Request bilingual help for hotels, transportation, translation,
            payments, or other local problems.
          </p>
        </div>

        <Link href="/help" className="btn primary">
          Get Human Help
        </Link>
      </section>
    </main>
  );
}
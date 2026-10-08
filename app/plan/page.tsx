"use client";

import { useRouter } from "next/navigation";

import { FormEvent, useState } from "react";

export default function PlanPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    const form = new FormData(e.currentTarget);

    const payload = {
      originCountry: form.get("originCountry"),
      cities: String(form.get("cities") || "")
        .split(",")
        .map((city) => city.trim())
        .filter(Boolean),
      startDate: form.get("startDate"),
      endDate: form.get("endDate"),
      budget: form.get("budget"),
      interests: String(form.get("interests") || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      travelStyle: form.get("travelStyle"),
    };

    try {
      // 1. Create trip
      const response = await fetch("/api/trips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to create trip.");
      }

      setMessage("Trip created. Generating your itinerary...");

      // 2. Generate itinerary
      const itineraryResponse = await fetch("/api/generate-itinerary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tripId: result.trip.id,
        }),
      });

      const itineraryResult = await itineraryResponse.json();

      if (!itineraryResponse.ok) {
        throw new Error(
          itineraryResult.error || "Failed to generate itinerary."
        );
      }

      setMessage("Your itinerary is ready!");
      router.push(`/trip/${result.trip.id}`);
    } catch (error) {
      console.error(error);

      setMessage(
        error instanceof Error ? error.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <div className="kicker">MVP FLOW 01</div>

      <h1>Plan My China Trip</h1>

      <p>
        Tell us where you want to go. We&apos;ll build your trip around your
        dates, budget, interests, and travel style.
      </p>

      <form onSubmit={handleSubmit}>
        <label>Where are you traveling from?</label>
        <input
          name="originCountry"
          placeholder="United States"
        />

        <label>Cities in China</label>
        <input
          name="cities"
          placeholder="Shanghai, Hangzhou"
          required
        />

        <label>Start date</label>
        <input
          name="startDate"
          type="date"
        />

        <label>End date</label>
        <input
          name="endDate"
          type="date"
        />

        <label>Budget</label>
        <select name="budget">
          <option value="budget">Budget</option>
          <option value="mid-range">Mid-range</option>
          <option value="premium">Premium</option>
        </select>

        <label>Interests</label>
        <textarea
          name="interests"
          placeholder="Food, history, nature, nightlife..."
          rows={4}
        />

        <label>Travel style</label>
        <select name="travelStyle">
          <option value="independent">Independent</option>
          <option value="relaxed">Relaxed</option>
          <option value="fast-paced">Fast-paced</option>
          <option value="luxury">Luxury</option>
        </select>

        <div className="actions">
          <button
            className="btn primary"
            type="submit"
            disabled={loading}
          >
            {loading ? "Building your trip..." : "Generate itinerary"}
          </button>
        </div>

        {message && (
          <p style={{ marginTop: "20px" }}>
            {message}
          </p>
        )}
      </form>
    </main>
  );
}

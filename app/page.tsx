"use client";

import { FormEvent, useState } from "react";

export default function PlanPage() {
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

      setMessage(`Trip created! ID: ${result.trip.id}`);
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ maxWidth: 700, margin: "60px auto", padding: 24 }}>
      <h1>Plan My China Trip</h1>

      <p>
        Tell us where you want to go. We’ll build your trip around your dates,
        budget, and interests.
      </p>

      <form
        onSubmit={handleSubmit}
        style={{ display: "grid", gap: 18, marginTop: 32 }}
      >
        <label>
          Where are you traveling from?
          <input
            name="originCountry"
            placeholder="United States"
            style={{ width: "100%", padding: 12 }}
          />
        </label>

        <label>
          Cities
          <input
            name="cities"
            placeholder="Shanghai, Hangzhou"
            required
            style={{ width: "100%", padding: 12 }}
          />
        </label>

        <label>
          Start date
          <input
            name="startDate"
            type="date"
            style={{ width: "100%", padding: 12 }}
          />
        </label>

        <label>
          End date
          <input
            name="endDate"
            type="date"
            style={{ width: "100%", padding: 12 }}
          />
        </label>

        <label>
          Budget
          <select
            name="budget"
            style={{ width: "100%", padding: 12 }}
          >
            <option value="budget">Budget</option>
            <option value="mid-range">Mid-range</option>
            <option value="premium">Premium</option>
          </select>
        </label>

        <label>
          Interests
          <input
            name="interests"
            placeholder="Food, culture, hiking"
            style={{ width: "100%", padding: 12 }}
          />
        </label>

        <label>
          Travel style
          <select
            name="travelStyle"
            style={{ width: "100%", padding: 12 }}
          >
            <option value="independent">Independent</option>
            <option value="relaxed">Relaxed</option>
            <option value="fast-paced">Fast-paced</option>
            <option value="luxury">Luxury</option>
          </select>
        </label>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: 14,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          {loading ? "Creating trip..." : "Create My Trip"}
        </button>

        {message && <p>{message}</p>}
      </form>
    </main>
  );
}
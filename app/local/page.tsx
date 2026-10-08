"use client";

import { useEffect, useState } from "react";

type Session = {
  id: string;
  call_type: string;
  tag: string | null;
  status: string;
  created_at: string;
};

export default function LocalDashboard() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadSessions() {
    try {
      const response = await fetch("/api/local/sessions");
      const text = await response.text();

let result;

try {
  result = JSON.parse(text);
} catch {
  console.error("Non-JSON response:", text);

  throw new Error(
    `Server returned ${response.status}. Check the terminal for the real error.`
  );
}

      if (!response.ok) {
        throw new Error(result.error);
      }

      setSessions(result.sessions || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function acceptSession(id: string) {
  try {
    const response = await fetch(
      `/api/local/sessions/${id}/accept`,
      {
        method: "POST",
      }
    );

    const text = await response.text();

    let result;

    try {
      result = JSON.parse(text);
    } catch {
      console.error("Non-JSON response:", text);
      throw new Error(`Server returned ${response.status}`);
    }

    if (!response.ok) {
      throw new Error(result.error || "Failed to accept.");
    }

    await loadSessions();
  } catch (error) {
    alert(
      error instanceof Error
        ? error.message
        : "Something went wrong."
    );
  }
}


  useEffect(() => {
    loadSessions();

    const timer = setInterval(loadSessions, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: 40 }}>
      <div className="kicker">LOCAL DASHBOARD</div>
      <h1>Incoming requests</h1>

      {loading && <p>Loading...</p>}

      {!loading && sessions.length === 0 && (
        <p>No one is looking for help right now.</p>
      )}

      <div style={{ display: "grid", gap: 16, marginTop: 30 }}>
        {sessions.map((session) => (
          <article
            key={session.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 18,
              padding: 22,
            }}
          >
            <div style={{ fontSize: 13, color: "#666" }}>
              {new Date(session.created_at).toLocaleString()}
            </div>

            <h2 style={{ marginBottom: 8 }}>
              {session.call_type === "voice" ? "Voice call" : "Video call"}
            </h2>

            <p>
              {session.tag
                ? `Traveler wants help with ${session.tag}`
                : "General travel help"}
            </p>

            <button
              className="btn primary"
              onClick={() => acceptSession(session.id)}
            >
              Accept
            </button>
          </article>
        ))}
      </div>
    </main>
  );
}
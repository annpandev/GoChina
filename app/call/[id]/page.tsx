"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Session = {
  id: string;
  call_type: "voice" | "video";
  status: string;
  connected_at: string | null;
};

export default function CallPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const [session, setSession] = useState<Session | null>(null);
  const [seconds, setSeconds] = useState(0);
  const [loading, setLoading] = useState(true);

  const ratePerMinute = 6;

  const currentCost = useMemo(() => {
    return ((seconds / 60) * ratePerMinute).toFixed(2);
  }, [seconds]);

  useEffect(() => {
    async function connectCall() {
      const response = await fetch(`/api/live-help/${params.id}/connect`, {
        method: "POST",
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.error || "Failed to connect call.");
        return;
      }

      setSession(result.session);
      setLoading(false);
    }

    connectCall();
  }, [params.id]);

  useEffect(() => {
    if (!session || session.status !== "connected") return;

    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [session]);

  async function endCall() {
    const response = await fetch(`/api/live-help/${params.id}/end`, {
      method: "POST",
    });

    const result = await response.json();

    if (!response.ok) {
      alert(result.error || "Failed to end call.");
      return;
    }

    router.push(`/call/${params.id}/summary`);
  }

  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");

  if (loading) {
    return (
      <main className="callPage">
        <p>Connecting...</p>
      </main>
    );
  }

  return (
    <main className="callPage">
      <section className="callRoom">
        <div className="kicker">LIVE LOCAL HELP</div>

        <h1>
          {session?.call_type === "video" ? "Video Call" : "Voice Call"}
        </h1>

        <div className="callAvatar">人</div>

        <p className="callStatus">Connected to a bilingual local</p>

        <div className="callTimer">
          {minutes}:{secs}
        </div>

        <div className="callPricing">
          <span>¥{ratePerMinute}/min</span>
          <strong>¥{currentCost}</strong>
        </div>

        <button
          className="endCallButton"
          onClick={endCall}
        >
          End Call
        </button>
      </section>
    </main>
  );
}
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function TalkToLocalPage() {
  const [callType, setCallType] = useState<"voice" | "video">("voice");
  const [tag, setTag] = useState("");
  const [status, setStatus] = useState<"idle" | "searching">("idle");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [matched, setMatched] = useState(false);

  async function startCall() {
    setStatus("searching");

    try {
      const response = await fetch("/api/live-help", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          callType,
          tag: tag || null,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to find a local.");
      }

      setSessionId(result.session.id);
      console.log("Live help session:", result.session);
    } catch (error) {
      console.error(error);
      setStatus("idle");
      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    }
  }

  useEffect(() => {
    if (!sessionId) return;

    const timer = setInterval(async () => {
      try {
        const response = await fetch(`/api/live-help/${sessionId}`);
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Failed to check session.");
        }

        if (result.session?.status === "matched") {
          setMatched(true);
          clearInterval(timer);
        }
      } catch (error) {
        console.error(error);
      }
    }, 2000);

    return () => clearInterval(timer);
  }, [sessionId]);


  return (
    <main className="liveHelpPage">
      <header className="liveHelpHeader">
        <Link href="/" className="backLink">
          ← Back
        </Link>
      </header>

      <section className="liveHelpHero">
        <div className="kicker">LIVE LOCAL HELP</div>

        <h1>Talk to a Local</h1>

        <p>
          Get live help from a real bilingual local whenever you&apos;re stuck.
        </p>
      </section>

      <section className="callPanel">
        {status === "idle" ? (
          <>
            <div className="callSection">
              <span className="callLabel">How do you want to talk?</span>

              <div className="callTypeGrid">
                <button
                  type="button"
                  className={`callTypeCard ${
                    callType === "voice" ? "selectedCallType" : ""
                  }`}
                  onClick={() => setCallType("voice")}
                >
                  <span className="callIcon">☎</span>
                  <strong>Voice</strong>
                  <small>Quickest for translation and conversations</small>
                </button>

                <button
                  type="button"
                  className={`callTypeCard ${
                    callType === "video" ? "selectedCallType" : ""
                  }`}
                  onClick={() => setCallType("video")}
                >
                  <span className="callIcon">▣</span>
                  <strong>Video</strong>
                  <small>Let the local see what you&apos;re seeing</small>
                </button>
              </div>
            </div>

            <div className="callSection">
              <div className="optionalLabel">
                <span>Need someone familiar with something specific?</span>
                <small>Optional</small>
              </div>

              <div className="quickTags">
                {["Transport", "Restaurant", "Shopping", "Medical"].map(
                  (item) => (
                    <button
                      key={item}
                      type="button"
                      className={tag === item ? "activeTag" : ""}
                      onClick={() => setTag(tag === item ? "" : item)}
                    >
                      {item}
                    </button>
                  )
                )}
              </div>
            </div>

            <button
              type="button"
              className="btn primary callNowButton"
              onClick={startCall}
            >
              Talk to a Local Now
            </button>

            <p className="pricingHint">
              You&apos;ll see the rate before the call starts. Billing begins
              only after you&apos;re connected.
            </p>
          </>
        ) : (
          <div className="searchingLocal">
            <div className="searchingAnimation">
              <span className="searchRing" />
              <span className="searchRing ringTwo" />
              <span className="localAvatar">人</span>
            </div>

            <div className="kicker">MATCHING</div>
<h2>
  {matched
    ? "A local accepted your request!"
    : "Finding a bilingual local…"}
</h2>

<p>
  {matched
    ? "Your local helper is ready. You can start the call now."
    : `We're looking for someone available to join your ${
        callType === "voice" ? "voice" : "video"
      } call${tag ? ` who is familiar with ${tag.toLowerCase()}` : ""}.`}
</p>
{matched && sessionId && (
  <button
    type="button"
    className="btn primary callNowButton"
    onClick={() => {
      window.location.href = `/call/${sessionId}`;
    }}
  >
    Start {callType === "voice" ? "Voice" : "Video"} Call
  </button>
)}

           {!matched && (
  <button
    type="button"
    className="cancelCallButton"
    onClick={() => setStatus("idle")}
  >
    Cancel
  </button>
)}
          </div>
        )}
      </section>

      <section className="liveHelpSafety">
        <strong>Not an emergency service</strong>
        <p>
          For urgent medical, police, or fire emergencies, contact local
          emergency services directly.
        </p>
      </section>
    </main>
  );
}
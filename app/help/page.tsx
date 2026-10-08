import Link from "next/link";

export default function HelpPage() {
  return (
    <main className="helpHubPage">
      <div className="helpTopbar">
        <Link href="/" className="backLink">
          ← GoChina
        </Link>
      </div>

      <section className="helpHubHero">
        <div className="kicker">REAL LOCAL HELP</div>
        <h1>How can a local help?</h1>
        <p>
          Get quick live help now, or book more time with a bilingual local
          when you need deeper support.
        </p>
      </section>

      <section className="helpChoiceGrid">
        <Link href="/help/now" className="helpChoiceCard primaryChoice">
          <div className="choiceTop">
            <span className="liveDot" />
            <span>AVAILABLE NOW</span>
          </div>

          <h2>Talk to a Local</h2>

          <p>
            Need help right now? Start a voice or video call with a real
            bilingual local.
          </p>

          <div className="choiceExamples">
            Translation · Hotel · Payment · Directions · Everyday situations
          </div>

          <span className="choiceLink">Connect now →</span>
        </Link>

        <Link href="/help/book" className="helpChoiceCard">
          <div className="choiceTop">
            <span>BOOK AHEAD</span>
          </div>

          <h2>Book a Local</h2>

          <p>
            Need more time? Schedule a local for itinerary review, trip
            planning, research, or longer travel support.
          </p>

          <div className="choiceExamples">
            30 min · 60 min · 90 min
          </div>

          <span className="choiceLink">Schedule help →</span>
        </Link>
      </section>
    </main>
  );
}
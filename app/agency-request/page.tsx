export default function AgencyRequestPage() {
  return (
    <main>
      <div className="kicker">MVP flow 03</div>
      <h1>Request a Travel Agency Quote</h1>
      <p>Collect a qualified request first; manually match agencies behind the scenes before building a full marketplace.</p>
      <form>
        <label>Trip length</label><input placeholder="8 days" />
        <label>Cities</label><input placeholder="Beijing, Xi'an, Chengdu" />
        <label>Travelers</label><input placeholder="2" />
        <label>Budget</label><input placeholder="¥12,000" />
        <label>What do you need?</label><textarea rows={5} placeholder="English-speaking guide, private driver, food-focused itinerary..." />
        <div className="actions"><button className="btn primary" type="button">Request quotes</button></div>
      </form>
    </main>
  )
}

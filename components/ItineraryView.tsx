type Activity = {
  time?: string;
  title?: string;
  description?: string;
  transport?: string;
  tips?: string[];
};

type Day = {
  day: number;
  date?: string;
  city?: string;
  theme?: string;
  activities?: Activity[];
};

type Itinerary = {
  summary?: string;
  days?: Day[];
};

export default function ItineraryView({
  itinerary,
}: {
  itinerary: Itinerary;
}) {
  return (
    <div>
      {itinerary.summary && (
        <section className="tripSummary">
          <div className="kicker">YOUR TRIP</div>
          <h1>Your China itinerary</h1>
          <p>{itinerary.summary}</p>
        </section>
      )}

      <div className="itineraryDays">
        {itinerary.days?.map((day) => (
          <section className="dayCard" key={day.day}>
            <div className="dayHeader">
              <div>
                <span className="dayNumber">DAY {day.day}</span>
                <h2>{day.city || `Day ${day.day}`}</h2>
              </div>

              <div className="dayMeta">
                {day.date && <span>{day.date}</span>}
                {day.theme && <span>{day.theme}</span>}
              </div>
            </div>

            <div className="activityList">
              {day.activities?.map((activity, index) => (
                <article className="activityItem" key={index}>
                  <div className="activityTime">
                    {activity.time || "Flexible"}
                  </div>

                  <div className="activityContent">
                    <h3>{activity.title}</h3>

                    {activity.description && (
                      <p>{activity.description}</p>
                    )}

                    {activity.transport && (
                      <div className="activityNote">
                        <strong>Transport:</strong> {activity.transport}
                      </div>
                    )}

                    {activity.tips && activity.tips.length > 0 && (
                      <div className="activityTips">
                        <strong>Tips</strong>
                        <ul>
                          {activity.tips.map((tip, tipIndex) => (
                            <li key={tipIndex}>{tip}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
import { useEffect, useState } from "react";
import API from "../api";

function AnalyticsCard() {
  const [data, setData] = useState({});

  useEffect(() => {
    API.get("/analytics/summary").then(res => setData(res.data));
  }, []);

  return (
    <div className="analytics-card">
      <h3>Queue Analytics</h3>
      <p>Total Tokens: {data.totalTokens}</p>
      <p>Served Tokens: {data.servedTokens}</p>
    </div>
  );
}

export default AnalyticsCard;

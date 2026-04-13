import { useEffect, useState } from "react";
import api from "../api";

function UserDashboard() {

  const [token, setToken] = useState(null);
  const [currentServing, setCurrentServing] = useState("-");
  const [peopleAhead, setPeopleAhead] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(0);
  const [loading, setLoading] = useState(false);
  const [notified, setNotified] = useState(false);

  const generateToken = async () => {

    try {

      setLoading(true);

      const res = await api.post("/tokens/generate");

      setToken(res.data.tokenNumber);

      fetchStatus(res.data.tokenNumber);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }

  };

  const fetchStatus = async (tokenNum) => {

    if (!tokenNum) return;

    try {

      const res = await api.get(`/tokens/status/${tokenNum}`);

      const serving = res.data.currentlyServing || "-";
      const ahead = res.data.peopleAhead || 0;

      setCurrentServing(serving);
      setPeopleAhead(ahead);

      const avgServiceTime = 2;
      setEstimatedTime(ahead * avgServiceTime);

      // 🔔 ALERT WHEN TOKEN IS SERVED
      if (serving === tokenNum && !notified) {
        alert("🎉 Your token is now being served. Please proceed to the counter.");
        setNotified(true);
      }

    } catch (err) {
      console.error(err);
    }

  };

  useEffect(() => {

    if (!token) return;

    const interval = setInterval(() => {
      fetchStatus(token);
    }, 3000);

    return () => clearInterval(interval);

  }, [token]);

  return (

    <div className="container mt-5">

      <h2 className="text-center mb-4">User Dashboard</h2>

      <div className="row text-center">

        <div className="col-md-3">
          <div className="card p-3 shadow">
            <h5>Your Token</h5>
            <h2>{token || "-"}</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 shadow">
            <h5>Currently Serving</h5>
            <h2>{currentServing}</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 shadow">
            <h5>People Ahead</h5>
            <h2>{peopleAhead}</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 shadow">
            <h5>Estimated Wait</h5>
            <h2>{estimatedTime} min</h2>
          </div>
        </div>

      </div>

      <div className="text-center mt-4">

        <button
          className="btn btn-primary"
          onClick={generateToken}
          disabled={loading || token}
        >
          {loading ? "Generating..." : token ? "Token Generated" : "Generate Token"}
        </button>

      </div>

      <div className="card mt-4 shadow">

        <div className="card-body text-center">

          <h5>Queue Status</h5>

          <p><strong>Current Serving:</strong> {currentServing}</p>
          <p><strong>Your Token:</strong> {token || "Not generated yet"}</p>
          <p><strong>People Ahead:</strong> {peopleAhead}</p>
          <p><strong>Estimated Wait:</strong> {estimatedTime} minutes</p>

        </div>

      </div>

    </div>

  );

}

export default UserDashboard;
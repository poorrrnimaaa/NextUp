import { useEffect, useState } from "react";
import api from "../api";

function AdminDashboard() {

  const [currentServing, setCurrentServing] = useState("-");
  const [waitingCount, setWaitingCount] = useState(0);
  const [queue, setQueue] = useState([]);
  const [history, setHistory] = useState([]);
  const [analytics, setAnalytics] = useState({
    total: 0,
    waiting: 0,
    completed: 0
  });

  const fetchData = async () => {

    try {

      const queueRes = await api.get("/tokens/queue");
      const historyRes = await api.get("/tokens/history");
      const analyticsRes = await api.get("/tokens/analytics");

      setQueue(queueRes.data.queue || []);
      setWaitingCount(queueRes.data.waiting || 0);
      setCurrentServing(queueRes.data.currentServing || "-");

      setHistory(historyRes.data || []);
      setAnalytics(analyticsRes.data || {});

    } catch (err) {
      console.error(err);
    }

  };

  const callNext = async () => {

    try {

      await api.put("/tokens/next");

      fetchData();

    } catch (err) {
      console.error(err);
      alert("Failed to call next token");
    }

  };

  const resetQueue = async () => {

    if (!window.confirm("Reset Queue?")) return;

    try {

      await api.delete("/tokens/reset");

      fetchData();

    } catch (err) {
      console.error(err);
      alert("Failed to reset queue");
    }

  };

  useEffect(() => {

    fetchData();

  }, []);

  return (

    <div className="container mt-5">

      <h2 className="text-center mb-4">Admin Dashboard</h2>

      <div className="row text-center mb-4">

        <div className="col-md-4">
          <div className="card shadow p-3">
            <h5>Currently Serving</h5>
            <h2>{currentServing}</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow p-3">
            <h5>People Waiting</h5>
            <h2>{waitingCount}</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow p-3">
            <h5>Total Tokens</h5>
            <h2>{analytics.total}</h2>
          </div>
        </div>

      </div>

      <div className="text-center mb-4">

        <button
          className="btn btn-success me-3"
          onClick={callNext}
        >
          Call Next Token
        </button>

        <button
          className="btn btn-danger"
          onClick={resetQueue}
        >
          Reset Queue
        </button>

      </div>

      <div className="card shadow mb-4">

        <div className="card-body">

          <h5>Queue List</h5>

          <table className="table">

            <thead>
              <tr>
                <th>Token</th>
                <th>Status</th>
                <th>Created</th>
              </tr>
            </thead>

            <tbody>

              {queue.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center">
                    No tokens in queue
                  </td>
                </tr>
              ) : (
                queue.map((t) => (
                  <tr key={t._id}>
                    <td>{t.tokenNumber}</td>
                    <td>{t.status}</td>
                    <td>{new Date(t.createdAt).toLocaleTimeString()}</td>
                  </tr>
                ))
              )}

            </tbody>

          </table>

        </div>

      </div>

      <div className="card shadow">

        <div className="card-body">

          <h5>Token History</h5>

          <table className="table">

            <thead>
              <tr>
                <th>Token</th>
                <th>Status</th>
                <th>Created</th>
              </tr>
            </thead>

            <tbody>

              {history.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center">
                    No history yet
                  </td>
                </tr>
              ) : (
                history.map((t) => (
                  <tr key={t._id}>
                    <td>{t.tokenNumber}</td>
                    <td>{t.status}</td>
                    <td>{new Date(t.createdAt).toLocaleTimeString()}</td>
                  </tr>
                ))
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}

export default AdminDashboard;
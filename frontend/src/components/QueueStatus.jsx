function QueueStatus({ token, ahead, serving }) {
  return (
    <div className="queue-card">
      <p><strong>Your Token:</strong> {token}</p>
      <p><strong>People Ahead:</strong> {ahead}</p>
      <p><strong>Now Serving:</strong> {serving}</p>
    </div>
  );
}

export default QueueStatus;

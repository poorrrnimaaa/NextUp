function FeatureCard({ title, description }) {
  return (
    <div className="col-md-6 col-lg-3">
      <div className="card feature-card h-100">
        <div className="card-body">
          <h5 className="card-title fw-semibold">{title}</h5>
          <p className="card-text text-muted">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default FeatureCard;

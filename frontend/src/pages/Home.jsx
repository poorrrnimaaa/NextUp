import Hero from "../components/Hero";
import FeatureCard from "../components/FeatureCard";

function Home() {
  return (
    <>
      <Hero />

      <div className="container my-5">
        <div className="row g-4">
          <FeatureCard
            title="Digital Token System"
            description="Generate queue tokens digitally and eliminate physical waiting lines."
          />
          <FeatureCard
            title="Real-Time Queue Updates"
            description="Track live queue status and know exactly when your turn arrives."
          />
          <FeatureCard
            title="Contactless Service"
            description="Join queues remotely and return only when service is ready."
          />
          <FeatureCard
            title="Admin Monitoring"
            description="Administrators manage queues efficiently through live dashboards."
          />
        </div>
      </div>

      <div className="container text-center my-5">
        <h4 className="fw-bold">Industries We Support</h4>
        <p className="text-muted">
          Healthcare • Banking • Education • Government Offices • Retail
        </p>
      </div>
    </>
  );
}

export default Home;

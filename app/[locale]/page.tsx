import { Header } from "@/components/layout/header";
import { ThreatLevel } from "@/components/dashboard/threat-level";
import { JourneyOf100 } from "@/components/dashboard/journey-of-100";
import { Ticker } from "@/components/dashboard/ticker";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Tricolore stripe — top */}
      <div className="flex h-1">
        <div className="flex-1 bg-tricolore-blue" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-tricolore-red" />
      </div>

      {/* Header */}
      <Header />

      {/* Main content */}
      <main className="flex-1">
        <ThreatLevel />
        <JourneyOf100 />
      </main>

      {/* Ticker */}
      <Ticker />

      {/* Tricolore stripe — bottom */}
      <div className="flex h-1">
        <div className="flex-1 bg-tricolore-blue" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-tricolore-red" />
      </div>
    </div>
  );
}

import type { Metadata } from "next";

import { MonitoringList } from "@features/monitoring";

export const metadata: Metadata = {
  title: "Monitoring | Yokai App",
  description: "test task from Green City Real Estate",
};

export default function MonitoringPage() {
  return <MonitoringList />;
}

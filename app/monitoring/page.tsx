import { MonitoringList } from "@features/monitoring";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Monitoring | Yokai App",
  description: "test task from Green City Real Estate",
};

export default function MonitoringPage() {
  return <MonitoringList />;
}

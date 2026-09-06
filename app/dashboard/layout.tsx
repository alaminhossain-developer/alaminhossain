export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  // Dashboard uses its own localStorage-based data, no server context needed
  return <>{children}</>
}

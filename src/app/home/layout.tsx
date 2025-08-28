import { ThemeProvider } from "@/components/global/theme-provider";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="velora-home-theme">
      {children}
    </ThemeProvider>
  );
}

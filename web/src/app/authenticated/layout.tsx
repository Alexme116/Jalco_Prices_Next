import "../globals.css";
import { UserProvider } from "@/context/UserContext";
import NavBar from "@/components/NavBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <section className="h-svh w-svw flex flex-col overflow-hidden">
        <NavBar />
        <section className="flex-1 overflow-auto">
          <div className="h-full w-full">
            {children}
          </div>
        </section>
      </section>
    </UserProvider>
  );
}

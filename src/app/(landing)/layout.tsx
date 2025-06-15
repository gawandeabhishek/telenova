import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <main>
      <Navbar />
      {children}
      <Footer />
    </main>
  );
};

export default Layout;

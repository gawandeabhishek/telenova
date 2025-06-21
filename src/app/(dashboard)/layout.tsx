import { PropsWithChildren } from "react";
import { Navbar } from "./_components/navbar";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
};

export default Layout;

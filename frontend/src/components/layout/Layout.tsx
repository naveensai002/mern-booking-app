import Header from "../Header";
import Hero from "../Hero";
import Footer from "./../Footer";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        <Hero />
        <div className="container mx-auto py-10 flex-1">{children}</div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;

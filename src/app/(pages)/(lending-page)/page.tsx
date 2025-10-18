import { Partners, Hero, AboutLogistic,ServicesSection, Footer } from "@/shared/modules/lending-page";
import WareHouseLocations from "@/shared/modules/lending-page/ui/ware-house-locations";
import { Navbar } from "@/widgets/headers/navbar-lending-page/ui/Navbar";

export default function Home() {
  return (
    <div className="">
      <Navbar />
     <div className="container mx-auto w-full flex flex-col gap-24">
     <Hero />
      <Partners />
      <AboutLogistic />
      <ServicesSection />
      <WareHouseLocations />
     </div>
      <Footer />
    </div>
  );
}

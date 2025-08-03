import Image from "next/image";
import heroImage from "../assets/img/Intro1.png";
import DealsCarousel from "./components/DealsCarousel";

export default function Home() {
  return (
    <main>
      <section className="w-[85%] m-auto py-3">
        <div className="flex justify-between items-center bg-neutral-50 rounded-xl border border-black/20 pl-14 pr-14">
          <div className="w-[40%] flex flex-col gap-3">
            <h4 className="text-slate-950 text-base font-normal font-['Poppins'] leading-[66px]">
              Order Restaurant food, takeaway and groceries.
            </h4>
            <h1 className="text-slate-950 text-5xl font-semibold font-['Poppins'] leading-[66px]">
              Feast Your Senses,
              <br />
              <span className="text-amber-500 text-5xl font-semibold font-['Poppins'] leading-[66px]">
                Fast and Fresh
              </span>
            </h1>
            <div>
              <p className="text-slate-950 text-xs font-normal font-['Poppins'] leading-[66px]">
                Enter a postcode to see what we deliver
              </p>
              <div className="flex items-center mt-2">
                <input
                  title="search"
                  type="text"
                  className="bg-white h-14 rounded-[120px] border border-black/40 p-2.5"
                  placeholder="ex: AZ1045"
                />
                <button
                  type="button"
                  title="searchButton"
                  className="bg-orange-400 h-14 rounded-[120px] px-6 ml-2 text-white text-base font-medium font-['Poppins'] cursor-pointer hover:bg-orange-500 transition duration-300"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          <div>
            <Image src={heroImage} alt="Hero Image" />
          </div>
        </div>
      </section>
      <section>
        <div>
          <DealsCarousel />
        </div>
      </section>
    </main>
  );
}

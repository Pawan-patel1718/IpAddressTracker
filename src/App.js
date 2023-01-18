import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import React, { useState, useEffect } from "react";
import MarkerPosition from "./components/MarkerPosition";
import Arrow from "./images/icon-arrow.svg";
import background from "./images/pattern-bg.png";

function App() {
  const [address, setAddress] = useState(null);
  const [ipAddress, setIpAddress] = useState("");
  const checkIpAddress =
    /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;
  const checkDomain =
    /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/;

  useEffect(() => {
    try {
      const getInitialData = async () => {
        const res = await fetch(
          `https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.REACT_APP_API_KEY}&ipAddress=	8.8.8.8 `
        );
        const data = await res.json();
        setAddress(data);
      };
      getInitialData();
    } catch (error) {
      console.trace(error);
    }
  }, []);
  async function getEnteredAddress() {
    const res = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=${
        process.env.REACT_APP_API_KEY
      }&${
        checkIpAddress.test(ipAddress)
          ? `ipAddress=${ipAddress}`
          : checkDomain.test(ipAddress)
          ? `domain=${ipAddress}`
          : alert("ip address is wrong!")
      }`
    );
    const data = await res.json();
    setAddress(data);
  }
  function handleSubmit(e) {
    e.preventDefault();
    getEnteredAddress();
    setIpAddress("")
  }
  return (
    <>
      <section>
        <div className="absolute w-full -z-10">
          <img src={background} alt="" className="w-full lg:h-80 h-72 " />
        </div>
        <article className="p-7">
          <h1 className="pb-6 text-center text-2xl lg:text-3xl text-white font-bold ">
            IP Address Tracker
          </h1>
          <form
            autoComplete="off"
            onSubmit={handleSubmit}
            action=""
            className="flex justify-center "
          >
            <input
              type="text"
              name="ipaddress"
              id="ipaddress"
              placeholder="Search for any IP address or domain"
              className="py-2 px-4 rounded-l-xl w-96 "
              value={ipAddress}
              onChange={(e) => setIpAddress(e.target.value)}
            />
            <button
              type="submit"
              className="hover:opacity-70 py-[13px] px-4 rounded-r-xl text-base bg-black"
            >
              <img src={Arrow} alt="" />
            </button>
          </form>
        </article>

        {address && (
          <>
            <article
              className="bg-white mx-10 text-center lg:text-left lg:mx-44 py-2  lg:py-6 rounded-xl lg:pl-11 grid grid-cols-1  lg:grid-cols-4 -mb-44 lg:-mb-16  relative"
              style={{ zIndex: 9999 }}
            >
              <div className="lg:border-r lg:border-slate-400 my-3  lg:pr-8">
                <h3 className="text-sm font-bold text-gray-500">IP ADDRESS </h3>
                <p className=" font-bold text-slate-900 text-xl ">
                  {address.ip}
                </p>
              </div>
              <div className="lg:border-r lg:border-slate-400 my-3 lg:ml-6 lg:pr-8">
                <h3 className="text-sm font-bold text-gray-500">Location</h3>
                <p className=" font-bold text-slate-900 text-xl ">
                  {address.location.city} , {address.location.region}
                </p>
              </div>
              <div className="lg:border-r lg:border-slate-400 my-3 lg:ml-6 lg:pr-8">
                <h3 className="text-sm font-bold text-gray-500">Timezone</h3>
                <p className=" font-bold text-slate-900 text-xl ">
                  UTC{address.location.timezone}
                </p>
              </div>
              <div className="my-3 lg:ml-6 lg:pr-8">
                <h3 className="text-sm font-bold text-gray-500">ISP</h3>
                <p className=" font-bold text-slate-900 text-xl ">
                  {address.isp}
                </p>
              </div>
            </article>
            <MapContainer
              center={[address.location.lat, address.location.lng]}
              zoom={13}
              scrollWheelZoom={false}
              style={{ height: "40rem", width: "99.9vw" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MarkerPosition address={address} />
            </MapContainer>
          </>
        )}
      </section>
    </>
  );
}

export default App;

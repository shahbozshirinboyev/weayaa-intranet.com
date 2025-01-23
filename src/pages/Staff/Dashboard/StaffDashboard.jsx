import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import { Fragment } from "react";

import noneuser from "/img/noneuser.png";

import http from "../../../services/http";

function StaffDashboard() {
  const [dashboards, setDashboards] = useState([]);
  useEffect(() => {
    http
      .get("users/announcements/", {
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      })
      .then((dashboad) => {
        // toast.success("Dashboardga ma'lumotlar yuklandi!");
        setDashboards(dashboad.data.results);
      })
      .catch((error) => {
        console.log(error);
        // toast.error("Error :(");
      });
  }, []);

  const renderContent = (content) => {
    // Yangi qatorlarni ajratish
    const lines = content.split("\n");

    return lines.map((line, lineIndex) => {
      // Har bir qatorni bo'shliqlarga bo'lish
      const words = line.split(" ");

      return (
        <Fragment key={lineIndex}>
          {words
            .map((word, wordIndex) => {
              const urlMatch = word.match(/(https?:\/\/[^\s]+)/g);
              if (urlMatch) {
                const url = urlMatch[0];
                const baseUrl = url.split("/").slice(0, 3).join("/"); // Asosiy URL
                const shortUrl = `${baseUrl}/...`; // Qisqartirilgan ko'rinish

                return (
                  <Fragment key={`${lineIndex}-${wordIndex}`}>
                    <a
                      href={url}
                      className="text-sky-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {shortUrl}
                    </a>
                  </Fragment>
                );
              }
              // Agar so'z bo'sh bo'lmasa, uni ko'rsatamiz
              if (word.trim()) {
                return (
                  <Fragment key={`${lineIndex}-${wordIndex}`}>{word}</Fragment>
                );
              }
              // Agar so'z bo'sh bo'lsa, hech narsa qaytarmaymiz
              return null;
            })
            .reduce((prev, curr) => [prev, " ", curr])}
          <br /> {/* Har bir qator oxirida <br /> qo'shamiz */}
        </Fragment>
      );
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">

      {/* Cards map START */}
      {dashboards.map((dashboard) => (
        // {/* CARD 1 START */}
        <div
            key={dashboard.id}
            className="bg-custom-green-10 rounded-[10px] p-4 text-custom-green-dark relative group transition-all duration-300 ease-in-out"
          >
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="flex justify-start items-center text-[16px] font-bold mb-4">
                  <span className="line-clamp-1">{dashboard.title}</span>
                </div>

                <span className="text-justify h-full text-[15px] opacity-90 font-semibold">
                  {renderContent(dashboard.description)}
                </span>
              </div>

              <div className="flex justify-between items-center text-[14px] font-bold mt-4">
                <div className="flex justify-start items-center gap-2">
                  <img
                    src={dashboard.author.image || noneuser}
                    className="w-[25px] h-[25px] object-cover rounded-full"
                    alt={dashboard.author.first_name}
                  />
                  <span className="whitespace-nowrap">
                    {dashboard.author.first_name} {dashboard.author.last_name}
                  </span>
                </div>
                <div className="flex justify-end items-center gap-2">
                  <i className="bi bi-calendar3"></i>
                  <span
                    className="tooltip"
                    data-tip={new Date(
                      dashboard.published_at
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  >
                    {dashboard.published_at.split("T")[0]}{" "}
                  </span>
                </div>
              </div>
            </div>
          </div>
        // {/* CARD 1 END */}
      ))}
      {/* Cards map END */}
      
    </div>
  );
}

export default StaffDashboard;

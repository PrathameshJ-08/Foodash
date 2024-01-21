import React, { useState, useEffect } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { BiLogoSpringBoot } from "react-icons/bi";
import { SiTailwindcss } from "react-icons/si";

const Contact = () => {
  const [userInfo, setUserInfo] = useState({
    name: "placeholder",
    avatar_url: "aa",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch("https://api.github.com/users/PrathameshJ-08");
        const json = await data.json();
        setUserInfo({
          name: json.name,
          avatar_url: "https://avatars.githubusercontent.com/u/104358556?v=4",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  const { name, avatar_url } = userInfo;

  return (
    <div
      className="flex justify-center items-center h-screen p-8 md:p-16 -mt-24 md:mt-0"
      style={{
        backgroundImage:
          "url('https://4kwallpapers.com/images/walls/thumbs_3t/1022.jpg')",
        height: "100vh",
      }}
    >
      <div className="md:h-96 md:p-6 w-full md:w-3/4 relative rounded-3xl  xl:-mt-32 overflow-clip ">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-200 to-lime-200 opacity-80 filter blur-md shadow-lg rounded-2xl "></div>
        <div className="md:flex md:flex-row md:justify-center items-center relative z-10 ">
          <div className="md:w-1/3 flex justify-center items-center">
            <div className="flex flex-col justify-center items-center md:items-start p-6">
              <img
                src={avatar_url}
                alt={name}
                className="h-40 w-40 object-cover object-center rounded-full mb-4 md:mb-6"
              />
              <h2 className="text-lg font-semibold">{name}</h2>
            </div>
          </div>

          <div className="md:w-2/3">
            <div className="p-6 text-center md:text-left -mt-9 sm:mt-auto">
              <h3 className="text-2xl font-bold mb-4">Web Developer</h3>
              <p className="text-justify">
                Hello there! I'm {name}, a passionate web developer with a keen
                eye for detail and a love for crafting clean, user-friendly web
                experiences. My journey is guided by continuous learning and a
                dedication to delivering high-quality solutions.
              </p>
            </div>
            <div className="flex justify-center md:justify-start mb-6 md:mb-0 ">
              <div className="p-4 grid grid-cols-4 sm:grid-cols-9 gap-4">
                <div className="flex items-center justify-center bg-gray-800 rounded-lg">
                  <i className="fab fa-html5 text-orange-500 px-4 py-2"></i>
                </div>
                <div className="flex items-center justify-center bg-gray-800 rounded-lg">
                  <i className="fab fa-css3-alt text-blue-500 px-4 py-2"></i>
                </div>
                <div className="flex items-center justify-center bg-gray-800 rounded-lg">
                  <i className="fab fa-js text-yellow-500 px-3 py-2"></i>
                </div>
                <div className="flex items-center justify-center bg-gray-800 rounded-lg">
                  <i className="fab fa-bootstrap text-purple-500 px-3 py-2"></i>
                </div>
                <div className="flex items-center justify-center bg-gray-800 rounded-lg">
                  <i className="fab fa-react text-blue-400 px-3 py-2"></i>
                </div>
                <div className="flex items-center justify-center bg-gray-800 rounded-lg">
                  <i className="fab fa-java text-red-500 px-4 py-2"></i>
                </div>
                <div className="flex items-center justify-center bg-gray-800 rounded-lg text-green-500 px-4 py-2">
                  <BiLogoSpringBoot />
                </div>
                <div className="flex items-center justify-center bg-gray-800 rounded-lg text-sky-400 px-4 py-2">
                  <SiTailwindcss />
                </div>
              </div>
            </div>
            <div className="flex justify-center md:justify-start">
              <div className="p-4">
                <a
                  href="https://github.com/PrathameshJ-08"
                  className="pr-6"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitHubIcon />
                </a>
                <a
                  href="https://www.linkedin.com/in/prathamesh-j08"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedInIcon />
                </a>
              </div>
            </div>
            <div className="flex sm:ml-5 sm:justify-start justify-center text-xs font-extralight">
              <span className="">jadhavprathamesh957@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

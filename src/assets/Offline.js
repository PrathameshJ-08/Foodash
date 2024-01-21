import ChromeDinoGame from "react-chrome-dino";
import WifiOffIcon from "@mui/icons-material/WifiOff";
function Offline() {
  return (
    <div className="flex flex-col items-center justify-center bg-slate-200 h-screen">
      <h1>Hit Spacebar to play!!</h1>
      <p>
        Online Status <WifiOffIcon className="text-red-400 animate-ping" />
      </p>
      <div className="w-full bg-gradient-to-t from-sky-200 via-sky-300  border-b-[24px] border-lime-400 h-[210px] ">
        <div className="border-8 border-slate-950">
          <ChromeDinoGame />
        </div>
      </div>
      <h1 className="text-4xl font-bold mb-4 mt-4">No internet</h1>
      <p className="mb-1 -ml-72">Try:</p>
      <ul className="list-disc pl-6 mb-4">
        <li>Checking the network cables, modem, and router</li>
        <li>Reconnecting to Wi-Fi</li>
        <li>Running Windows Network Diagnostics</li>
      </ul>
      <p className="text-red-500">
        <span className="font-bold">ERR_INTERNET_DISCONNECTED</span>
      </p>
    </div>
  );
}

export default Offline;

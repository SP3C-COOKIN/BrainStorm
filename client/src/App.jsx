import { useState } from "react";
import left from "../images/left.jpg";
import bg from "../images/bg.jpg";
import axios from "axios"

function App() {

  // =========================================================
  // MODE STATE
  // Handles switching between signup and login
  // =========================================================
  const [mode, setMode] = useState("signup");

  // =========================================================
  // FORM STATE
  // =========================================================
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    console.log("sending data...");
     
    const url =
      mode === "signup"
        ? "http://localhost:5000/api/auth/signup"
        : "http://localhost:5000/api/auth/login"; 

    const data =
      mode === "signup"
        ? {
            email,
            username,
            password,
          }
        : {
            identifier: email,
            password,
          };
    
      const response  = await axios.post(url, data);
    
      console.log(response.data)
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
};

  return (
    <div
      className="absolute inset-0 min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >

      {/* =====================================================
          MAIN CONTAINER
          Glass card holding left + right sections
      ===================================================== */}
      <div className="w-[900px] rounded-2xl backdrop-saturate-150 bg-white/8 backdrop-blur-xl border border-white/10 text-white flex overflow-hidden shadow-2xl shadow-purple-900/30">

        {/* =====================================================
            LEFT SIDE
            Image section
        ===================================================== */}
        <div className="w-1/2 relative rounded-2xl">

          <img
            src={left}
            alt="Image"
            className="w-full h-full object-cover r"
          />

          {/* Image Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#2B2E78]/25" />
        </div>

        {/* =====================================================
            RIGHT SIDE
            Form section
        ===================================================== */}
        <div className="w-1/2 p-8 flex flex-col mb-5">

          {/* ================= HEADER ================= */}
          <h1 className="text-4xl font-bold mb-1 font-black leading-tight tracking-tight">
            Welcome to BrainStorm
          </h1>

          <p className="text-pink-100/70 mb-10 text-sm tracking-wide">
            Your second brain for creative ideas
          </p>

          {/* ================= EMAIL INPUT ================= */}
          <div className="flex flex-col gap-2 mb-2">
            <p className="font-semibold text-white text-lg tracking-wide">
              Email
            </p>

            <input
              className="bg-[#23232F] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4 border border-white/10"
              placeholder="Enter your Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          {/* ================= USERNAME INPUT ================= */}
          {mode === "signup" && (
            <>
              <div className="flex flex-col gap-2 mb-2">
                <p className="font-semibold text-white text-lg tracking-wide">
                  Username
                </p>

                <input
                  className="bg-[#23232F] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4 border border-white/10"
                  placeholder="Enter a Username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </div>
            </>
          )}

          {/* ================= PASSWORD INPUT ================= */}
          <div className="flex flex-col gap-2 mb-2">
            <p className="font-semibold text-white text-lg tracking-wide">
              Password
            </p>

            <input
              className="bg-[#23232F] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-5 border border-white/10"
              placeholder="Enter a Password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          {/* ================= SUBMIT BUTTON ================= */}
          <div className="flex justify-center">
            <button onClick={handleSubmit}
            className="w-full p-3 m-3 rounded-xl cursor-pointer font-semibold text-white bg-gradient-to-r from-fuchsia-500 via-purple-500 to-blue-500 shadow-lg shadow-fuchsia-500/20 hover:scale-[1.02] hover:shadow-fuchsia-500/40 transition-all duration-300 backdrop-blur-md border border-white/10">
              {mode === "signup"
                ? "Create Account"
                : "Login"}
            </button>
          </div>

          {/* ================= MODE TOGGLE ================= */}
          <button
            className="text-white/80 hover:text-cyan-200 font-semibold transition-all duration-200 hover:drop-shadow-[0_0_8px_rgba(125,211,252,0.5)]"
            onClick={() =>
              setMode(
                mode === "signup"
                  ? "login"
                  : "signup"
              )
            }
          >
            {mode === "signup"
              ? "Already have an account?"
              : "Need an account?"}
          </button>

        </div>
      </div>
    </div>
  );
}

export default App;
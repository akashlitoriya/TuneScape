import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { io } from "socket.io-client";
import { useMemo, useState, useEffect, useRef } from "react";
import bgVideo from "./assets/bg.mp4";
import LandingPage from "./components/LandingPage";
import CreateLobby from "./components/CreateLobby";
import JoinPublicLobby from "./components/JoinPublicLobby";
import ApiTester from "./components/testing/ApiTester";
import rootReducer from "./reducers/reducers";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import Lobby from "./components/core/lobby/Lobby";

const store = configureStore({
  reducer: rootReducer,
});

function App() {
  const socket = useMemo(() => io("http://localhost:3000"), []);
  const [songUrl, setSongUrl] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id);
    });

    socket.on("sendSong", (songurl) => {
      console.log("song recieved" + songurl);
      setSongUrl(songurl);
    });

    socket.on("startPlay", (data) => {
      console.log("Playing song : " + data);
      audio.current.play();
    });

    socket.on("pauseSong", (data) => {
      console.log("Pausing song : " + data);
      audio.current.pause();
    });

    return () => {
      console.log(socket);
      socket.disconnect();
    };
  }, []);

  return (
    <Provider store={store}>
      <div className="flex justify-center">
        <video
          src={bgVideo}
          autoPlay="{true}"
          loop
          muted
          className="absolute -z-10 w-auto min-w-full max-h-full max-w-none "
        ></video>
        <RouterProvider router={appRouter} />
      </div>
    </Provider>
  );
}

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/createLobby",
    element: <CreateLobby />,
  },
  {
    path: "/joinPublicLobby",
    element: <JoinPublicLobby />,
  },
  {
    path: "/lobbyId/:id",
    element: <Lobby />,
  },
  {
    path: "/testing",
    element: <ApiTester />,
  },
]);

export default App;

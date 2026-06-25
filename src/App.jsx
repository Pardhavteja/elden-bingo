import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Game from "./pages/Game";

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Room */}
        <Route path="/:roomId" element={<Game />} />

        {/* Invalid URL */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
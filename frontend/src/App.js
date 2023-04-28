import React from "react";
import Hangman from "./components/Hangman/Hangman";
import Auth from "./components/Auth/Auth";
import Home from "./components/Home/Home";
import Leaderboard from "./components/Leaderboard/Leaderboard";
import { Route, Routes, Navigate, useSearchParams } from "react-router-dom";
import Sharable from "./components/Sharable/Sharable";
import SharePage from "./components/Sharable/SharePage";

function App() {
  const user = JSON.parse(localStorage.getItem('userh'));
  const [queryParameters] = useSearchParams()
  return (
    <div >
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="home" /> : <Navigate to="../auth" />}
          // element={<Auth />}
        />
        <Route
          path="/auth"
          element={user ? <Navigate to="../home" /> : <Auth />}
          // element={<Auth />}
        />
        <Route
          path="/home"
          element={user ? <Home /> : <Navigate to="../auth" />}
        
        />
        <Route
          path="/leaderboard"
          element={user ? <Leaderboard /> : <Navigate to="../auth" />}
        />
        <Route
          path="/play"
          element={user ? <Hangman /> : <Navigate to="../auth" />}
        />   
        <Route
          path="/sharable/:word"
          element={user ? <Sharable /> : <Navigate to="../auth" />}
        />   
        <Route
          path="/sharable"
          element={user ? <SharePage /> : <Navigate to="../auth" />}
        />   
      </Routes>
      
    </div>
  );
}

export default App;
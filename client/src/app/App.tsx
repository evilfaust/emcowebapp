import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { LoadingSpinner } from "shared/UI";
import { Navbar } from "widgets";

const Main = React.lazy(() => import("pages/Main/index"));
const News = React.lazy(() => import("pages/News/index"));
const Map = React.lazy(() => import("pages/Map/index"));

function App() {
  return (
    <Suspense
      fallback={
        <div className="centered">
          <LoadingSpinner />
        </div>
      }
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/news" element={<News />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </Suspense>
  );
}

export default App;

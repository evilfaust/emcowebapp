import { CssBaseline } from "@mui/material";
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { LoadingSpinner } from "shared/UI";
import { Footer, MobileNavigation, Navbar } from "widgets";

const Main = React.lazy(() => import("pages/Main/index"));
const Map = React.lazy(() => import("pages/Map/index"));
const News = React.lazy(() => import("pages/News/index"));
const Newsletter = React.lazy(() => import("pages/Newsletter/index"));

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
      <MobileNavigation />
      <CssBaseline />
      <Footer />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/news" element={<News />}>
          <Route path=":newsId" element={<Newsletter />} />
        </Route>
        <Route path="/map" element={<Map />} />
        <Route path="*" element={<Main />} />
      </Routes>
    </Suspense>
  );
}

export default App;

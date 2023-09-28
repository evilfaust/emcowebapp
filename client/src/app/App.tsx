import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { LoadingSpinner } from "shared/UI";

const Main = React.lazy(() => import("pages/Main/index"));
const News = React.lazy(() => import("pages/News/index"));

function App() {
  return (
    <Suspense
      fallback={
        <div className="centered">
          <LoadingSpinner />
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/news" element={<News />} />
      </Routes>
    </Suspense>
  );
}

export default App;

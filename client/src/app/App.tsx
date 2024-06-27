// app/App.tsx
import { CssBaseline } from "@mui/material";
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { LoadingSpinner } from "shared/UI";
import { Footer, MobileNavigation, Navigation } from "widgets";
import AdminRoute from "shared/hooks/AdminRoute";
import Moderation from "pages/Moderation/index";
import { NotificationProvider } from "shared/notifications/NotificationContext";

const Main = React.lazy(() => import("pages/Main/index"));
const Map = React.lazy(() => import("pages/Map/index"));
const News = React.lazy(() => import("pages/News/index"));
const NewsDetail = React.lazy(() => import("pages/News/NewsDetail"));
const Register = React.lazy(() => import("pages/Register/index"));
const Login = React.lazy(() => import("pages/Login/index"));
const Profile = React.lazy(() => import("pages/Profile/index"));

function App() {
  return (
    <NotificationProvider>
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
        <CssBaseline />
        <Navigation />
        <MobileNavigation />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="news" element={<News />} />
          <Route path="news/:id" element={<NewsDetail />} />
          <Route path="map" element={<Map />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
          <Route path="moderation/*" element={<AdminRoute />}>
            <Route path="*" element={<Moderation />} />
          </Route>
          <Route path="*" element={<Main />} />
        </Routes>
        <Footer />
      </Suspense>
    </NotificationProvider>
  );
}

export default App;

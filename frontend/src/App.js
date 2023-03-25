import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Routes
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import AdminRoute from "./routes/AdminRoute";

// Components
import Home from "./components/Home/Home";
import MyRatings from "./components/MyRatings/MyRatings";
import History from "./components/History/History";
import CoffeeMaker from "./components/Coffee/CoffeeMaker/CoffeeMaker";
import Manage from "./components/Manage/Manage";
import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";
import Register from "./components/Register/Register";
import VerifyEmail from "./components/Register/Account/VerifyEmail";
import ForgotPassword from "./components/Register/Account/ForgotPassword";
import ResetPassword from "./components/Register/Account/ResetPassword";
import Loading from "./components/Loading/Loading";
import Footer from "./components/Footer/Footer";
import ScrollTop from "./components/ScrollTop/ScrollTop";
import Header from "./components/Header/Header";
import NotFound from './components/NotFound/NotFound'

// HOCS
import manageHoc from "./components/HOC/ManageHOC";
import homeHoc from "./components/HOC/HomeHOC";
import brewHoc from "./components/HOC/BrewHOC";
import coffeeMakerHoc from "./components/HOC/CoffeeMakerHOC";

const ManageHOC = manageHoc(Manage);
const HomeHOC = homeHoc(Home);
const MyRatingsHOC = brewHoc(MyRatings);
const HistoryHOC = brewHoc(History);
const CoffeeMakerHOC = coffeeMakerHoc(CoffeeMaker);

const App = () => {
  return (
    <>
      <Toaster toastOptions={{ style: { minHeight: "100px", maxWidth: "340px", width: "100%", border: "3px solid var(--background)", background: "var(--foreground)", color: "var(--background)" }, textAlign: "center"}} position="top-center" />
      <ScrollTop />
      <Header />
      <main className="container" id="main-content">
        <Suspense fallback={<Loading />}>
          <Routes>
            {/* ACCESSIBLE FOR ALL */}
            <Route exact path="/" element={<HomeHOC />} />

            {/* ONLY ACCESSIBLE AS PUBLIC/ANON */}
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/account/verify-email" element={<VerifyEmail />} />
              <Route path="/account/forgot-password" element={<ForgotPassword />} />
              <Route path="/account/reset-password" element={<ResetPassword />} />
            </Route>

            {/* ONLY ACCESSIBLE WHEN LOGGED IN */}
            <Route element={<PrivateRoute />}>
              <Route path="logout" element={<Logout />} />
              <Route path="my-ratings" element={<MyRatingsHOC />} />
              <Route path="history" element={<HistoryHOC />} />
              <Route path="coffee-maker/*" element={<CoffeeMakerHOC />} />
            </Route>

            {/* ONLY ACCESSIBLE AS ADMIN */}
            <Route element={<AdminRoute />}>
              <Route path="manage/*" element={<ManageHOC />} />
            </Route>

            {/* IF NO ROUTES MATCH THE ABOVE */}
            <Route path="*" element={<NotFound />} />

          </Routes>
        </Suspense>
      </main>
      <Suspense fallback={<Loading />}>
        <Footer />
      </Suspense>
    </>
  );
};

export default App;

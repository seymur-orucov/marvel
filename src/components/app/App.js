import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";

const MainPage = lazy(() => import("../../pages/MainPage"));
const ComicsPage = lazy(() => import("../../pages/ComicsPage"));
const SingleComicPage = lazy(() =>
  import("../../pages/SingleComicPage/SingleComicPage")
);
const Page404 = lazy(() => import("../../pages/Page404"));

const App = () => {
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <Suspense fallback={<div>Loading...</div>}>
          <main>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/comics" element={<ComicsPage />} />
              <Route path="/comics/:comicId" element={<SingleComicPage />} />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </main>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;

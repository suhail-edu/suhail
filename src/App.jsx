import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';

// Every page but the home page loads on demand, so the first visit downloads only what it shows.
const Login = lazy(() => import('./pages/Login.jsx'));
const Signup = lazy(() => import('./pages/Signup.jsx'));
const Quiz = lazy(() => import('./pages/Quiz.jsx'));
const Branches = lazy(() => import('./pages/Branches.jsx'));
const MajorsBranch = lazy(() => import('./pages/MajorsBranch.jsx'));
const MajorDetail = lazy(() => import('./pages/MajorDetail.jsx'));
const Universities = lazy(() => import('./pages/Universities.jsx'));
const University = lazy(() => import('./pages/University.jsx'));
const Search = lazy(() => import('./pages/Search.jsx'));
const Team = lazy(() => import('./pages/Team.jsx'));
const ComingSoon = lazy(() => import('./pages/ComingSoon.jsx'));

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Suspense fallback={null}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="majors" element={<Branches />} />
          <Route path="majors/:branch" element={<MajorsBranch />} />
          <Route path="majors/:branch/:major" element={<MajorDetail />} />
          <Route path="universities" element={<Universities />} />
          <Route path="universities/:slug" element={<University />} />
          <Route path="graduates" element={<ComingSoon title="تجارب الخريجين" />} />
          <Route path="team" element={<Team />} />
          <Route path="soon/:slug" element={<ComingSoon />} />
          <Route path="search" element={<Search />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

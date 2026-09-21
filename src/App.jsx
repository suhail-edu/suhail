import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Quiz from './pages/Quiz.jsx';
import Branches from './pages/Branches.jsx';
import MajorsBranch from './pages/MajorsBranch.jsx';
import MajorDetail from './pages/MajorDetail.jsx';
import Universities from './pages/Universities.jsx';
import University from './pages/University.jsx';
import Search from './pages/Search.jsx';
import Team from './pages/Team.jsx';
import ComingSoon from './pages/ComingSoon.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

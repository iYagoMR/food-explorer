import { Routes, Route } from 'react-router-dom';

import { SignIn } from '../pages/SignIn';
//import { SignUp } from '../pages/SignUp/index.jsx';

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      {/* <Route path="/register" element={<SignUp />} /> */}
    </Routes>
  );
}
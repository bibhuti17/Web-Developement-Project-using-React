import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./routes/Home";
import Feed from "./routes/Feed";
import Question from "./routes/Question";

const App = () => (
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/questions" element={<Feed />} />
        <Route path="/questions/:id" element={<Question />} />
      </Routes>
    </Layout>
  </BrowserRouter>
);

export default App;

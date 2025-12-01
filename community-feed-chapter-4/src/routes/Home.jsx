import React from "react";
import { Link } from "react-router-dom";
import SeoHelmet from "../seo/SeoHelmet";

const Home = () => (
    <>
        <SeoHelmet
            title="Community Feed Home"
            description="Welcome to the ReactJS community feed built with SSR and Vite."
        />
        <h1>Home</h1>
        <p>
            Go to the <Link to="/questions">ReactJS questions feed</Link>.
        </p>
    </>
);

export default Home;

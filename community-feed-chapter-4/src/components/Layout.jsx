import React from "react";
import { Link } from "react-router-dom";

const Layout = ({ children }) => (
    <div>
        <header>
            <nav>
                <Link to="/">Home</Link> | <Link to="/questions">Feed</Link>
            </nav>
        </header>
        <main>{children}</main>
    </div>
);

export default Layout;

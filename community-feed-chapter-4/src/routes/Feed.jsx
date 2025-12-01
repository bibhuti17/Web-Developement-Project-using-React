import React, { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import SeoHelmet from "../seo/SeoHelmet";

const PAGE_SIZE = 20;

const Feed = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const page = Number(searchParams.get("page") || "1");
    const [questions, setQuestions] = useState([]);
    const [hasMore, setHasMore] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        async function load() {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(
                    `https://api.stackexchange.com/2.3/questions?order=desc&sort=creation&tagged=reactjs&site=stackoverflow&page=${page}&pagesize=${PAGE_SIZE}`
                );
                if (!res.ok) throw new Error("Failed to fetch questions");
                const json = await res.json();
                if (!cancelled) {
                    setQuestions(json.items || []);
                    setHasMore(json.has_more || false);
                    setLoading(false);
                }
            } catch (e) {
                if (!cancelled) {
                    setError(e);
                    setLoading(false);
                }
            }
        }

        load();
        return () => {
            cancelled = true;
        };
    }, [page]);

    const goToPage = (nextPage) => {
        setSearchParams({ page: String(nextPage) });
    };

    return (
        <>
            <SeoHelmet
                title={`ReactJS Questions – Page ${page}`}
                description="Community feed of recent ReactJS questions from Stack Overflow."
            />
            <h1>ReactJS Community Feed</h1>

            {loading && <p>Loading…</p>}
            {error && <p>Failed to load questions.</p>}

            {!loading &&
                !error &&
                questions.map((q) => (
                    <article key={q.question_id}>
                        <h2>
                            <Link to={`/questions/${q.question_id}`}>{q.title}</Link>
                        </h2>
                        <p>Score: {q.score}</p>
                    </article>
                ))}

            <div style={{ marginTop: "1rem" }}>
                <button
                    onClick={() => goToPage(page - 1)}
                    disabled={page <= 1 || loading}
                >
                    Previous
                </button>
                <span style={{ margin: "0 0.5rem" }}>Page {page}</span>
                <button
                    onClick={() => goToPage(page + 1)}
                    disabled={!hasMore || loading}
                >
                    Next
                </button>
            </div>
        </>
    );
};

export default Feed;

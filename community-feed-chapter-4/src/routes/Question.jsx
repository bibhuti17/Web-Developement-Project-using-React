import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SeoHelmet from "../seo/SeoHelmet";

const Question = () => {
    const { id } = useParams();
    const [question, setQuestion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        async function load() {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(
                    `https://api.stackexchange.com/2.3/questions/${id}?order=desc&sort=activity&site=stackoverflow&filter=withbody`
                );
                if (!res.ok) throw new Error("Failed to load question");
                const json = await res.json();
                if (!cancelled) {
                    setQuestion(json.items?.[0] || null);
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
    }, [id]);

    if (loading) return <p>Loading question…</p>;
    if (error || !question) return <p>Question not found.</p>;

    return (
        <>
            <SeoHelmet
                title={question.title}
                description={`Stack Overflow question about React: ${question.title}`}
            />
            <article>
                <h1>{question.title}</h1>
                <p>Score: {question.score}</p>
                <a href={question.link} target="_blank" rel="noreferrer">
                    View on Stack Overflow
                </a>
            </article>
        </>
    );
};

export default Question;

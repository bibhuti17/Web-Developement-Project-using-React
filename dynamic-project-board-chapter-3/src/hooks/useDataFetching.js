import { useEffect, useState } from "react";

const useDataFetching = (dataSource) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                // For local JSON via Vite, import with dynamic import
                const module = await import(dataSource);
                const json = module.default;
                if (!cancelled) {
                    setData(json);
                    setLoading(false);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err);
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            cancelled = true;
        };
    }, [dataSource]);

    return { data, loading, error };
};

export default useDataFetching;
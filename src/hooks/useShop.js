import React, { useState, useEffect } from "react";

export const useShop = (url, options) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const res = await fetch(url, options);
        const json = await res.json();
        if (json.message == "Not Found") {
          setError(true);
        }
        setResponse(json);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);
  return { response, error, loading };
};

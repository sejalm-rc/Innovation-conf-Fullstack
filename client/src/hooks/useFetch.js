import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Runs an async fetcher(signal) on mount (and whenever deps change),
 * tracking loading / error / data state, and exposes a retry() function.
 * Aborts the in-flight request if the component unmounts or deps change again.
 */
export function useFetch(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [meta, setMeta] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | success | error
  const [error, setError] = useState(null);
  const controllerRef = useRef(null);

  const run = useCallback(() => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    setStatus("loading");
    setError(null);

    fetcher(controller.signal)
      .then((res) => {
        if (controller.signal.aborted) return;
        setData(res?.data ?? res ?? null);
        setMeta(res?.meta ?? null);
        setStatus("success");
      })
      .catch((err) => {
        if (controller.signal.aborted || err.name === "AbortError") return;
        setError(err);
        setStatus("error");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    run();
    return () => controllerRef.current?.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [run]);

  return { data, meta, status, error, retry: run, isLoading: status === "loading", isError: status === "error" };
}

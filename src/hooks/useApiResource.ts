import { useCallback, useEffect, useRef, useState } from "react";

import type { ApiRequestOptions, ApiResponse } from "@/services";

type ResourceState<T> =
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "empty" }
  | { status: "error"; message: string };

export function useApiResource<T>(
  fetcher: (options?: ApiRequestOptions) => Promise<ApiResponse<T>>,
  options?: ApiRequestOptions,
) {
  const [state, setState] = useState<ResourceState<T>>({ status: "loading" });
  const optionsRef = useRef(options);

  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  const applyResponse = useCallback((response: ApiResponse<T>) => {
    switch (response.status) {
      case "success":
        setState({ status: "success", data: response.data });
        break;
      case "empty":
        setState({ status: "empty" });
        break;
      case "error":
        setState({ status: "error", message: response.message });
        break;
    }
  }, []);

  const reload = useCallback(async () => {
    setState({ status: "loading" });
    const response = await fetcher(optionsRef.current);
    applyResponse(response);
  }, [fetcher, applyResponse]);

  useEffect(() => {
    let cancelled = false;

    fetcher(optionsRef.current).then((response) => {
      if (!cancelled) applyResponse(response);
    });

    return () => {
      cancelled = true;
    };
  }, [fetcher, applyResponse]);

  return { ...state, reload };
}

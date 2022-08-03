import { objectClean } from "lab/utils";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export const resetRoute = () => {
  window.location.href = window.location.origin;
};

/**
 * 返回url 中指定的参数值
 * @param {string[]} name 参数名
 */
export const useUrlQueryParam = (keys) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const paramsValues = useMemo(() => {
    return keys.reduce((prev, key) => {
      return {
        ...prev,
        [key]: searchParams.get(key),
      };
    }, {});
  }, [searchParams, keys]);

  const cleanObj = (params) => {
    const cleanedParams = objectClean({
      ...Object.fromEntries(searchParams),
      ...params,
    });

    return setSearchParams(cleanedParams);
  };

  return [paramsValues, cleanObj];
};

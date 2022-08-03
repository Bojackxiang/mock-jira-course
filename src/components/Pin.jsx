import { Rate } from "antd";
import React from "react";

const Pin = (props) => {
  const { checked, onCheckedChange, ...restProps } = props;

  return (
    <Rate
      count={1}
      value={checked ? 1 : 0}
      // 如果没有 onCheckChange 那就什么也不干
      onChange={(num) => onCheckedChange?.(!!num)}
      {...restProps}
    />
  );
};

export default Pin;

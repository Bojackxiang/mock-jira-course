import { Select } from "antd";
import React from "react";

/**
 *
 * @param {
 *  value: string | number | null | undefined
 *  onchange: (value?: number) => void
 *  defaultOption?: string
 *  options: {name: string, id: number}[]
 * } props
 * @returns
 */
const IdSelector = (props) => {
  const { value, onChange, defaultOption, options, ...restProps } = props;
  return (
    <Select
      value={toNumber(value)}
      onChange={(value) => onChange(toNumber(value))}
      {...restProps}
    >
      {/* 所有没有意义的东西会被转化为0， 来匹配这个 default option */}
      {defaultOption ? (
        <Select.Option value={0}>{defaultOption}</Select.Option>
      ) : null}

      {options.map((option) => (
        <Select.Option value={option.id}>{option.name}</Select.Option>
      ))}
    </Select>
  );
};

const toNumber = (value) => (isNaN(Number(value)) ? 0 : Number(value));

export default IdSelector;

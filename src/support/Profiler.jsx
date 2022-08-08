import React from "react";

const PHASES = ["mounte", "update"];

const Profiler = (props) => {
  const { ...restProps } = props;

  const reportProfile = ({ id, phase }) => {
    if (PHASES.includes(phase) || !phase) {
      console.log(`${id} ${phase}`);
    }
  };

  return <Profiler onRender={reportProfile} {...restProps} />;
};

export default Profiler;

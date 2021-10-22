import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Test = () => {
  const { push } = useHistory();
  useEffect(() => {
    push("/plants");
  }, []);
  return <div className="test"></div>;
};
export default Test;

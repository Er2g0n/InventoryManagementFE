import { Button } from "antd";
import { PoweroffOutlined } from "@ant-design/icons";

import React, { useState } from "react";

export default function Loading () {
  const [loadings, setLoadings] = useState<boolean[]>([false, false, false, false]);

  function enterLoading (index: number): void {
    const newLoadings = [...loadings];

    newLoadings[index] = true;
    setLoadings(newLoadings);
    setTimeout(() => {
      newLoadings[index] = false;
      setLoadings([...newLoadings]);
    }, 2000);
  }

  return <Button
    type="primary"
    icon={<PoweroffOutlined />}
    loading={loadings[3]}
    onClick={() => enterLoading(3)}
  >
          Loading Icon
  </Button>;
}

import { Input, Select } from "antd";
import { useMemo, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SwapIcon from "./icons/SwapIcon";

const FormSwap = () => {
  const [selectedToken, setSelectedToken] = useState(null);
  const [amountSend, setAmountSend] = useState(0);
  const [image, setImage] = useState("");
  const { data: listToken } = useQuery({
    queryKey: ["FetchToken"],
    queryFn: () =>
      axios.get("https://interview.switcheo.com/prices.json").then((res) => {
        const tempdata = res.data.map((item, index) => {
          return {
            key: index,
            value: item.price,
            label: item.currency.toUpperCase(),
          };
        });

        return tempdata;
      }),
  });
  const amountReceive = useMemo(() => {
    return amountSend * selectedToken || 0;
  }, [amountSend, selectedToken]);
  const handleOnChange = (value, item) => {
    setSelectedToken(value);
    setImage(item?.label || "");
  };
  const handleReset = () => {
    setAmountSend(0);
    setSelectedToken(null);
  };
  return (
    <div className=" h-screen flex justify-center items-center bg-[#121212] ">
      <div className=" w-[600px] h-[400px] bg-white rounded-2xl flex flex-col   px-4 pt-12 gap-6 ">
        <div className="flex justify-center items-center  h-[50px]">
          {image && (
            <img
              src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${image}.svg`}
              width={50}
              height={50}
            />
          )}
        </div>
        <div className="flex flex-col gap-3">
          <p>Choose token for change</p>
          <Select
            showSearch
            placeholder="Select a token"
            optionFilterProp="label"
            onChange={(value, item) => handleOnChange(value, item)}
            options={listToken}
            allowClear
            value={selectedToken}
            onClear={() => handleReset()}
            style={{ width: "30%" }}
          />
        </div>
        <div className="flex flex-row w-full items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <p className="">Amount send (USD)</p>
            <Input
              onChange={(e) => setAmountSend(e.target.value)}
              placeholder="Amount send"
              disabled={!selectedToken}
              value={amountSend}
            />
          </div>
          <div className="flex justify-center items-center">
            <SwapIcon />
          </div>
          <div className="flex flex-col gap-2">
            <p className="">Amount received</p>
            <Input placeholder=" amount received" value={amountReceive} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormSwap;

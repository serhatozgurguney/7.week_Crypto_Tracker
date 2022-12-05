import React, { useState, useEffect } from "react";
import EzReactTable from "ez-react-table";

export default function App() {
  const [coins, setCoins] = useState([]);
  const fetchCoins = async () => {
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      );
      const data = await res.json();
      setCoins(data);
    } catch (e) {
      alert("Api error");
    }
  };
  useEffect(() => {
    fetchCoins();
  }, []);
  const columns = [
    {
      title: "İsim",
      key: "name",
      width: 200,
      render: (value, object) => {
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <img height="40px" width="40px" src={object?.image} alt="coin" />
            <span style={{ marginLeft: "10px" }}>{object?.name}</span>
          </div>
        );
      },
    },
    {
      title: "ID",
      center: true,
      key: "symbol",
      width: 50,
      render: (value, object) => <div>{value.toUpperCase()}</div>,
    },
    {
      title: "Fiyat",
      key: "current_price",
      width: 200,
      render: (value, object) => <div>{`=>        ${value}  ₺`}</div>,
    },
    {
      title: "24 Saatlik Değişim",
      key: "price_change_percentage_24h",
      width: 100,
      render: (value, object) => {
        return (
          <div style={{ color: /-/i.test(value) ? "#ff0000" : "#003300" }}>
            %   {value}
          </div>
        );
      },
    },
  ];
  return (
    <EzReactTable
      cols={columns}
      data={coins}
      
      title="ilk 100 kripto / YTD"
      defaultSort="name"
      accentColor="#00cc66"
      tableHeight={800}
    />
  );
}

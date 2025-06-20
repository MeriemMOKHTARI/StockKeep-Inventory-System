import { ResponsivePie } from "@nivo/pie";
import axios from "axios";
import { useState, useEffect } from "react";

function Chart() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/consom/bondecommandeinterne/listcreate/"
        );
        const orders = response.data;

        const statusCounts = orders.reduce((acc, order) => {
          acc[order.status] = (acc[order.status] || 0) + 1;
          return acc;
        }, {});

        const chartData = Object.keys(statusCounts).map((status) => ({
          id: status,
          label: status,
          value: statusCounts[status],
        }));

        setData(chartData);
      } catch (error) {
        setError("An error occurred while fetching data.");
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const MyResponsivePie = ({ data }) => (
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 150, bottom: 100, left: 150 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "Delivered",
          },
          id: "dots",
        },
        {
          match: {
            id: "Created succesfully",
          },
          id: "lines",
        },
        {
          match: {
            id: "Consulted by the responsable",
          },
          id: "dots",
        },
        {
          match: {
            id: "Consulted by the director",
          },
          id: "lines",
        },
      ]}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );

  return (
    <div className="bg-white mb-3 h-[500px] w-[530px] rounded-3xl flex flex-col items-center gap-2 ">
      {error && <p>{error}</p>}
      {!error && <MyResponsivePie data={data} />}
    </div>
  );
}

export default Chart;

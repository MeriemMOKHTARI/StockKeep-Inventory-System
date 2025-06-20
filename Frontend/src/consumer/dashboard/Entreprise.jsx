import { ResponsiveLine } from "@nivo/line";
import { useState, useEffect } from "react";
import axios from "axios";
import { Select, MenuItem } from "@mui/material";

function Entreprise() {
  //   {
  //     "bon_de_commande": 12,
  //     "etapes": [
  //         {
  //             "etape": "consommateur",
  //             "items": [
  //                 {
  //                     "item": "Product",
  //                     "quantite": 2
  //                 }
  //             ]
  //         },
  //         {
  //             "etape": "responsable",
  //             "items": [
  //                 {
  //                     "item": "Product",
  //                     "quantite": 2
  //                 }
  //             ]
  //         },
  //         {
  //             "etape": "directeur",
  //             "items": [
  //                 {
  //                     "item": "Product",
  //                     "quantite": 2
  //                 }
  //             ]
  //         }
  //     ]
  // }

  const data = [
    {
      id: "japan",
      data: [
        {
          x: "plane",
          y: 213,
        },
        {
          x: "helicopter",
          y: 81,
        },
        {
          x: "boat",
          y: 54,
        },
        {
          x: "train",
          y: 119,
        },
        {
          x: "subway",
          y: 103,
        },
        {
          x: "bus",
          y: 14,
        },
        {
          x: "car",
          y: 267,
        },
        {
          x: "moto",
          y: 127,
        },
        {
          x: "bicycle",
          y: 192,
        },
        {
          x: "horse",
          y: 173,
        },
        {
          x: "skateboard",
          y: 222,
        },
        {
          x: "others",
          y: 244,
        },
      ],
    },
  ];

  const MyResponsiveLine = ({ data /* see data tab */ }) => (
    <ResponsiveLine
      data={data}
      margin={{ top: 10, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "transportation",
        legendOffset: 36,
        legendPosition: "middle",
        truncateTickAt: 0,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "count",
        legendOffset: -40,
        legendPosition: "middle",
        truncateTickAt: 0,
      }}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabel="data.yFormatted"
      pointLabelYOffset={-12}
      enableTouchCrosshair={true}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );

  const [data1, setData] = useState([]);
  const [BCI, setBCI] = useState([]);
  const [error, setError] = useState("");
  const [selectedBCI, setSelectedBCI] = useState("");

  useEffect(() => {
    async function fetchData() {
      if (selectedBCI) {
        try {
          const response = await axios.get(
            `http://127.0.0.1:8000/directeur/ticket/list/${selectedBCI}/`
          );
          const filteredData = response.data.filter(
            (data) => data.designation === selectedBCI
          );
          setData(response.data);
          console.log(response.data);
        } catch (error) {
          setError("An error occurred while fetching data.");
          console.error("Error fetching data:", error);
        }
      }
    }

    async function fetchBCI() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/directeur/bondecommandeinterne/list/"
        );
        setBCI(response.data);
      } catch (error) {
        setError("An error occurred while fetching product data.");
        console.error("Error fetching product data:", error);
      }
    }

    fetchBCI();

    // Fetch data initially
    fetchData();

    // Fetch data every 5 minutes (adjust the time interval as needed)
    const intervalId = setInterval(fetchData, 1 * 60 * 1000);

    // Cleanup function to clear the interval when component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, [selectedBCI]);

  const handleBCIChange = (event) => {
    setSelectedBCI(event.target.value);
  };

  return (
    <div className="bg-white h-[400px] w-[1000px] rounded-3xl flex flex-col items-center ">
      <div className="flex flex-row justify-center items-center m-6">
        <h1 className="text-[16px] mt-0 mr-10">Select internal order id :</h1>
        <Select
          variant="outlined"
          value={selectedBCI}
          onChange={handleBCIChange}
          style={{
            width: "100px",
            height: "40px",
            backgroundColor: "#F7FAFC",
            borderRadius: "20px",
            fontFamily: "poppins",
            fontSize: "1.4rem",
          }}
          MenuProps={{
            style: {
              fontFamily: "Poppins",
            },
          }}
        >
          {BCI.map((Bon) => (
            <MenuItem
              key={Bon.id}
              value={Bon.id}
              style={{
                fontSize: "1.4rem",
              }}
            >
              {Bon.id}
            </MenuItem>
          ))}
        </Select>
      </div>
      <MyResponsiveLine data={data} />
    </div>
  );
}

export default Entreprise;

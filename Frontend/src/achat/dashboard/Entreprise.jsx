import { ResponsiveBar } from "@nivo/bar";

function Entreprise() {
  const data = [
    {
      designation: "Photocopieur KYOCERA FS-1025 MFP",
      month: "April",
      year: 2024,
      quantity_in_stock: 9,
      quantity_in_stock_color: "hsl(335, 70%, 50%)",
      quantity_consumed: 2,
      quantity_consumed_color: "hsl(101, 70%, 50%)",
    },
    {
      designation: "Photocopieur KYOCERA FS-1025 MFP",
      month: "May",
      year: 2024,
      quantity_in_stock: 9,
      quantity_in_stock_color: "hsl(335, 70%, 50%)",
      quantity_consumed: 5,
      quantity_consumed_color: "hsl(101, 70%, 50%)",
    },
  ];

  const MyResponsiveBar = ({ data /* see data tab */ }) => (
    <ResponsiveBar
      data={data}
      keys={["quantity_consumed", "quantity_in_stock"]}
      indexBy="month"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.25}
      innerPadding={3}
      groupMode="grouped"
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "fries",
          },
          id: "dots",
        },
        {
          match: {
            id: "sandwich",
          },
          id: "lines",
        },
      ]}
      borderRadius={6}
      borderColor={{
        from: "color",
        modifiers: [["darker", "1.4"]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Month",
        legendPosition: "middle",
        legendOffset: 32,
        truncateTickAt: 0,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Quantity",
        legendPosition: "middle",
        legendOffset: -40,
        truncateTickAt: 0,
      }}
      labelSkipWidth={36}
      labelSkipHeight={36}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      ariaLabel="Nivo bar chart demo"
      barAriaLabel={(e) =>
        e.id + ": " + e.formattedValue + " in IDProduct: " + e.indexValue
      }
    />
  );
  return (
    <div className="bg-white h-[500px] w-[1000px] rounded-3xl flex flex-col items-center gap-2">
      <div className="font-poppins text-[16px] pt-10">
        {data[1].designation}
      </div>
      <MyResponsiveBar data={data} />
    </div>
  );
}

export default Entreprise;

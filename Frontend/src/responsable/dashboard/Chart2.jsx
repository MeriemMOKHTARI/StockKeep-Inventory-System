import { ResponsiveBar } from "@nivo/bar";
import { useState, useEffect } from "react";
import axios from "axios";
import { Select, MenuItem } from "@mui/material";

function Chart2() {
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("Onduleur 500 va");

  useEffect(() => {
    async function fetchData() {
      if (selectedProduct) {
        try {
          const response = await axios.get(
            "http://127.0.0.1:8000/magasinier/monthly-stock-data/"
          );
          const filteredData = response.data.filter(
            (data) => data.designation === selectedProduct
          );
          setData(filteredData);
        } catch (error) {
          setError("An error occurred while fetching data.");
          console.error("Error fetching data:", error);
        }
      }
    }

    async function fetchProducts() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/service-achat/Produit/listcreate/"
        );
        setProducts(response.data);
      } catch (error) {
        setError("An error occurred while fetching product data.");
        console.error("Error fetching product data:", error);
      }
    }

    fetchProducts();

    // Fetch data initially
    fetchData();

    // Fetch data every 5 minutes (adjust the time interval as needed)
    const intervalId = setInterval(fetchData, 1 * 60 * 1000);

    // Cleanup function to clear the interval when component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, [selectedProduct]);

  const MyResponsiveBar = ({ data }) => (
    <ResponsiveBar
      data={data}
      keys={["quantity_in_stock", "quantity_consumed"]}
      indexBy="month"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.25}
      innerPadding={3}
      groupMode="grouped"
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "paired" }}
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
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Quantity",
        legendPosition: "middle",
        legendOffset: -40,
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
      ariaLabel="Nivo bar Chart2 demo"
      barAriaLabel={(e) =>
        `${e.id}: ${e.formattedValue} in IDProduct: ${e.indexValue}`
      }
    />
  );

  const handleProductChange = (event) => {
    setSelectedProduct(event.target.value);
  };

  return (
    <div className="bg-white h-[500px] w-[1200px] p-10 rounded-3xl flex flex-col items-center gap-2">
      <Select
        variant="outlined"
        value={selectedProduct}
        onChange={handleProductChange}
        style={{
          height: "40px",
          width: "300px",
          backgroundColor: "#F7FAFC",
          borderRadius: "15px",
          fontFamily: "poppins",
          fontSize: "1.4rem",
        }}
        MenuProps={{
          style: {
            fontFamily: "Poppins",
          },
        }}
      >
        {products.map((product) => (
          <MenuItem
            key={product.id}
            value={product.designation}
            style={{
              fontSize: "1.2rem",
            }}
          >
            {product.designation}
          </MenuItem>
        ))}
        <MenuItem
          key="{product.id}"
          value="{product.designation}"
          style={{
            fontSize: "1.2rem",
          }}
        >
          test product with no statistics
        </MenuItem>
      </Select>
      <MyResponsiveBar data={data} />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Chart2;

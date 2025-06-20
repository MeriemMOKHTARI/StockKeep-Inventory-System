import { useState, useEffect } from "react";
import axios from "axios";

function TableChart() {
  const [structures, setStructures] = useState([]);
  const [selectedStructure, setSelectedStructure] = useState("");
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch the list of structures
    async function fetchStructures() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/structure/listcreate/"
        );
        setStructures(response.data);
        if (response.data.length > 0) {
          setSelectedStructure(response.data[0].id);
        }
      } catch (error) {
        setError("An error occurred while fetching structures.");
        console.error("Error fetching structures:", error);
      }
    }

    fetchStructures();
  }, []);

  useEffect(() => {
    // Fetch the top consumed products when the selected structure changes
    async function fetchProducts() {
      if (selectedStructure) {
        try {
          const response = await axios.get(
            `http://127.0.0.1:8000/magasinier/top-consumed-products/${selectedStructure}/`
          );
          setProducts(response.data);
        } catch (error) {
          setError("An error occurred while fetching products.");
          console.error("Error fetching products:", error);
        }
      }
    }

    fetchProducts();
  }, [selectedStructure]);

  const handleStructureChange = (event) => {
    setSelectedStructure(event.target.value);
  };

  return (
    <div className="bg-white py-10 px-5 rounded-3xl flex flex-col items-center gap-3 w-[873px] ">
      <div className="flex justify-between w-full">
        <h2 className="text-xl font-semibold mr-5">Top consumed products</h2>
        <select
          value={selectedStructure}
          onChange={handleStructureChange}
          className="bg-[#2185D5] text-white rounded-[20px] px-3 py-1 w-[100px] h-10 mr-5"
        >
          {structures.map((structure) => (
            <option key={structure.id} value={structure.id}>
              {structure.abbreviation}
            </option>
          ))}
        </select>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="py-2 border-b">Name</th>
            <th className="py-2 border-b">Consumed</th>
            <th className="py-2 border-b">Remaining</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td className="py-2 border-b">{product.designation}</td>
              <td className="py-2 border-b">{product.consumed}</td>
              <td
                className="py-2 border-b"
                style={{ color: product.remaining_color }}
              >
                {product.remaining}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableChart;

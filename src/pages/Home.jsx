import { useEffect, useState } from "react";
import { getAll, getProductByCategory } from "../api/product";
import Product from "../components/Product";
import Search from "antd/es/input/Search";
import { Select } from "antd";
import { getAllCategory } from "../api/category";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await getAll();
      setProducts(res.data);
      setFilteredProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAllCategory();
        const formatData = res.data.map((item) => {
          return {
            value: item.id,
            label: item.name,
          };
        });
        setCategories(formatData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  const handleChangeSelect = async (id) => {
    try {
      const res = await getProductByCategory(id);
      setFilteredProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (value) => {
    if (value === "") {
      return fetchProducts();
    }
    const newFilteredProducts = [...products].filter((product) =>
      product.title.includes(value)
    );
    setFilteredProducts(newFilteredProducts);
  };
  return (
    <section className="container mx-auto">
      <h2 className="text-4xl py-10 text-center font-medium text-gray-700">
        Products
      </h2>
      <div className="mb-10 flex justify-between w-[80%] mx-auto">
        <Search
          placeholder="Tìm kiếm"
          onChange={(e) => handleSearch(e.target.value)}
          enterButton
          style={{
            width: 304,
          }}
        />
        <Select
          defaultValue="All products"
          style={{
            width: 220,
          }}
          options={categories}
          onSelect={(value) => handleChangeSelect(value)}
        />
      </div>
      <div className="grid grid-cols-3 gap-10 w-[80%] mx-auto pb-20">
        {filteredProducts &&
          filteredProducts.length > 0 &&
          filteredProducts.map((product) => (
            <Product key={product.id} product={product} />
          ))}
      </div>
    </section>
  );
};

export default Home;

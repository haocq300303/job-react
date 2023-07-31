import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getById } from "../api/product";
import { useParams } from "react-router-dom";

const DetailProduct = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();

  useState(() => {
    const fetchData = async () => {
      try {
        const res = await getById(id);
        setProduct(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <section className="flex flex-col gap-16 py-10 bg-gray-100">
      <div className="container mx-auto flex justify-around  items-center w-[80%]">
        <div className="w-96 flex justify-end">
          <img
            src={product.img}
            alt={product.title}
            className="w-full select-none"
          />
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-gray-500">
            {"Home/"}
            {<Link to="/product">product</Link>}
            {`/${product.id}`}
          </p>
          <h2 className="text-4xl">{product.title}</h2>
          <span className="font-semibold">
            Price: <span className="text-2xl">{product.price} $</span>
          </span>
          <span className="font-semibold">Brand: {product.brand}</span>

          <span className="font-semibold">
            Category: <span className="text-2xl">{"oke"}</span>
          </span>
          <button
            onClick={() => console.log("ksk")}
            className="bg-sky-500 text-sky-50 px-2 py-1 mt-4"
          >
            add to cart
          </button>
        </div>
      </div>
      <Link
        to="/"
        className="text-xl py-1 text-center hover:text-cyan-500 duration-300 select-none"
      >
        &larr; Go to Product
      </Link>
    </section>
  );
};

export default DetailProduct;

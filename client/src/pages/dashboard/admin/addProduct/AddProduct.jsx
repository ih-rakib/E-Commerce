import React, { useState } from "react";
import { useSelector } from "react-redux";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import UploadImage from "./UploadImage";
import { useAddProductMutation } from "../../../../redux/features/products/productsApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const { user } = useSelector((state) => state.auth);
  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
  });

  const navigate = useNavigate();

  // for cloudinary
  const [image, setImage] = useState("");

  const [addProduct, { isLoading, error }] = useAddProductMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const categories = [
    { label: "Select Category", value: "" },
    { label: "Accessories", value: "Accessories" },
    { label: "Jewellery", value: "jewellery" },
    { label: "Dress", value: "dress" },
    { label: "Cosmetics", value: "cosmetics" },
    { label: "Toys", value: "toys" },
    { label: "Footwear", value: "footwear" },
    { label: "Bags", value: "bags" },
    { label: "Caps", value: "caps" },
    { label: "Sunglass", value: "sunglass" },
    { label: "Tech", value: "tech" },
  ];

  // const filters = {
  //   categories: [
  //     "all",
  //     "accessories",
  //     "jewellery",
  //     "cosmetics",
  //     "dress",
  //     "toys",
  //     "footwear",
  //     "bags",
  //     "hats-caps",
  //     "sunglasses",
  //   ],

  //   priceRange: [
  //     { label: "$0 - $50", min: 0, max: 50 },
  //     { label: "$50 - $100", min: 51, max: 100 },
  //     { label: "$100 - $150", min: 101, max: 150 },
  //     { label: "$150 & Above", min: 151, max: Infinity },
  //   ],
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !product.name ||
      !product.price ||
      !product.description ||
      !product.category
    ) {
      alert("Please fill all required field!");
      return;
    }

    try {
      await addProduct({ ...product, image, author: user?._id }).unwrap();
      toast.success("Product added successfully!");
      setProduct({ name: "", category: "", price: "", description: "" });
      setImage("");
      navigate("/shop");
    } catch (error) {
      console.error("Failed to add product. Please try again!", error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-6">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextInput
          label="Product Name"
          name="name"
          value={product?.name}
          onChange={handleChange}
          type="text"
          placeholder="Product Name"
        ></TextInput>
        <SelectInput
          label="Category"
          name="category"
          value={product?.category}
          onChange={handleChange}
          options={categories}
        ></SelectInput>

        <TextInput
          label="Price"
          name="price"
          value={product?.price}
          onChange={handleChange}
          type="number"
          placeholder="50"
        ></TextInput>
        <UploadImage
          name="image"
          id="image"
          value={(e) => setImage(e.target.value)}
          placeholder="upload image"
          setImage={setImage}
        ></UploadImage>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            className="add-product-InputCSS"
            value={product.description}
            placeholder="Description"
            onChange={handleChange}
          ></textarea>
        </div>

        <div>
          <button type="submit" className="add-product-btn">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;

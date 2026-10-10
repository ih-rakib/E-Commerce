import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useFetchProductByIdQuery,
  useUpdateProductMutation,
} from "../../../../redux/features/products/productsApi";
import { useSelector } from "react-redux";
import TextInput from "../addProduct/TextInput";
import SelectInput from "../addProduct/SelectInput";
import UploadImage from "../addProduct/UploadImage";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    image: "",
  });

  const [newImage, setNewImage] = useState(null);

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

  const {
    data: productData,
    isLoading: isFetchingProduct,
    error: fetchError,
    refetch,
  } = useFetchProductByIdQuery(id);

  const [updateProduct, { isLoading: isUpdating, error: updateError }] =
    useUpdateProductMutation();

  useEffect(() => {
    if (productData) {
      const { name, category, price, description, image } =
        productData?.product || {};
      setProduct({
        name: name || "",
        category: category || "",
        price: price || "",
        description: description || "",
        image: image || "",
      });
    }
  }, [productData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleImageChange = (image) => {
    setNewImage(image);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      ...product,
      image: newImage ? newImage : product?.image,
      author: user?._id,
    };

    try {
      await updateProduct({ id, ...updatedProduct }).unwrap();
      alert("Product updated successfully!");
      await refetch();
      navigate("/dashboard/manage-products");
    } catch (error) {
      console.error("Failed to update product", error);
    }
  };

  if (isFetchingProduct) return <div>Loading...</div>;
  if (fetchError) return <div>Error fetching product data.</div>;

  return (
    <div className="container mx-auto mt-7">
      <h2 className="text-2xl mb-6 font-semibold">Update Product</h2>
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
          placeholder="upload image"
          setImage={handleImageChange}
          value={newImage || product?.image}
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
            {isUpdating ? "Updating..." : "Update Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;

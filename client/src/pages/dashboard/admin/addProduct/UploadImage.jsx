import React, { useState } from "react";
import axios from "axios";
import { getBaseUrl } from "../../../../utils/baseURL";

const UploadImage = ({ name, setImage }) => {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  // Convert file to base64
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  // Request to upload a file to the backend
  const UploadSingleImage = async (base64) => {
    setLoading(true);
    try {
      const res = await axios.post(`${getBaseUrl()}/upload-image`, {
        image: base64,
      });
      const imageUrl = res.data;
      setUrl(imageUrl);
      setImage(imageUrl);
      alert("Image uploaded successfully");
    } catch (err) {
      console.error("Error uploading image:", err);
      setError("Failed to upload image.");
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (e) => {
    const files = e.target.files;

    if (files.length === 1) {
      const base64 = await convertBase64(files[0]);
      await UploadSingleImage(base64); // Upload a single image
      return;
    }

    // If you want to handle multiple images (uncomment if needed)
    // for (let i = 0; i < files.length; ++i) {
    //   const base = await convertBase64(files[i]);
    //   await UploadSingleImage(base);  // Upload each image
    // }
  };

  return (
    <div>
      <label htmlFor={name}>Upload Image</label>
      <input
        type="file"
        name={name}
        id={name}
        onChange={uploadImage}
        className="add-product-InputCSS"
      />
      {loading && (
        <div className="text-sm mt-2 text-blue-600">Uploading...</div>
      )}
      {error && <div className="text-sm mt-2 text-red-600">{error}</div>}
      {url && (
        <div className="text-sm mt-2 text-green-600">
          <p>Image Uploaded Successfully!</p>
          <img src={url} alt="uploaded image" />
        </div>
      )}
    </div>
  );
};

export default UploadImage;

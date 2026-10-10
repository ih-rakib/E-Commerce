import { Link } from "react-router-dom";
import accessoriesCategoryImage from "../../assets/category1.jpg";
import jewelleryCategoryImage from "../../assets/category3.jpg";
import cosmeticsCategoryImage from "../../assets/category4.jpg";
import dressCategoryImage from "../../assets/category5.jpg";
import toysCategoryImage from "../../assets/category6.jpg";
import footwearCategoryImage from "../../assets/category7.jpg";
import bagsCategoryImage from "../../assets/category8.jpg";
import hatsCapsCategoryImage from "../../assets/category9.jpg";
import sunglassesCategoryImage from "../../assets/category10.jpg";
import techCategoryImage from "../../assets/category2.jpg";

const Categories = () => {
  const categories = [
    {
      id: 1,
      name: "Accessories",
      path: "accessories",
      image: accessoriesCategoryImage,
    },
    {
      id: 2,
      name: "Jewellery",
      path: "jewellery",
      image: jewelleryCategoryImage,
    },
    {
      id: 3,
      name: "Cosmetics",
      path: "cosmetics",
      image: cosmeticsCategoryImage,
    },
    { id: 4, name: "Dress", path: "dress", image: dressCategoryImage },
    { id: 5, name: "Toys", path: "toys", image: toysCategoryImage },
    { id: 6, name: "Footwear", path: "footwear", image: footwearCategoryImage },
    { id: 7, name: "Bags", path: "bags", image: bagsCategoryImage },
    {
      id: 8,
      name: "Hats & Caps",
      path: "hats-caps",
      image: hatsCapsCategoryImage,
    },
    {
      id: 9,
      name: "Sunglasses",
      path: "sunglasses",
      image: sunglassesCategoryImage,
    },
    { id: 10, name: "Tech", path: "tech", image: techCategoryImage },
  ];

  return (
    <>
      <div className="product__grid">
        {categories?.map((category) => (
          <Link
            key={category.id}
            to={`/categories/${category.path}`}
            className="categories__card"
          >
            <img src={category.image} className="" alt="category image" />
            <h4>{category.name}</h4>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Categories;

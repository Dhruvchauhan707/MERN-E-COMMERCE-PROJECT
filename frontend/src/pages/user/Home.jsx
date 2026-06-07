import { useEffect, useState } from "react";
import "../../styles/user/home.css";

import axios from "axios";
import ImageSlider from "../../components/user/ImageSlider";
import LetestProducts from "../../components/user/LatestProducts";
import Categories from "../../components/user/Categories";
import Testimonials from "../../components/user/Testimonials";
import Footer from "../../components/user/Footer";
import { useCategories } from '../../Hooks/useCategories';
import { useProducts } from '../../Hooks/useProducts';
import Loader from "../../components/common/Loader";

function HomePage() {

  const [products, setProducts] = useState([]);
  const { categories , categoryLoading } = useCategories();
  const { latestProducts, productLoading} = useProducts();

 if(categoryLoading || productLoading)
 {
    return <Loader />
 }

  return (
    <div className="home">
      <ImageSlider />

      <Categories
        categories={categories}
      />
      <LetestProducts
        products={latestProducts}
      />

      <Testimonials />

      <Footer />

    </div>
  );
}

export default HomePage;
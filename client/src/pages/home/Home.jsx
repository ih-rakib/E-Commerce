import Blogs from "../blogs/Blogs"
import TrendingProducts from "../shop/TrendingProducts"
import Banner from "./Banner"
import Categories from "./Categories"
import Deals from "./Deals"
import Hero from "./Hero"
import Promo from "./Promo"

const Home = () => {
    return (
        <>
            <Banner></Banner>
            <Categories></Categories>
            <Hero></Hero>
            <TrendingProducts></TrendingProducts>
            <Deals></Deals>
            <Promo></Promo>
            <Blogs></Blogs>
        </>
    )
}

export default Home
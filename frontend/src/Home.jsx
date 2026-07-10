import Header1 from "./components/header/Header1";
import Header2 from "./components/header/Header2";
import Hero from "./components/hero/Hero";
import Main from "./components/main/main";
import Footer from "./components/footer/Footer";
import ScrollToTop from "./components/scroll/ScrollToTop";

function Home(){

    return(
        <>
            <Header1/>
            <Header2/>
            <Hero/>
            <Main/>
            <Footer/>
            <ScrollToTop/>
        </>
    )

}

export default Home;
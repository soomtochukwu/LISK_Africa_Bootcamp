// App.jsx
import "./App.css";
import AllNFTs from "./components/AllNFTs.tsx";
import CreatorRewards from "./components/CreatorRewards.tsx";
import Footer from "./components/Footer.tsx";
// import { Link, Route, Routes } from 'react-router-dom'
// import Mint from './pages/Mint.tsx'
import Header from "./components/Header.tsx";
import MintSection from "./components/MintSection.tsx";

/* const paths = [
  {
    url: "/",
    name: "Home",
    element: null
  },
  {
    url: "/mint",
    name: "Mint",
    element: <Mint />
  },
]; */

function App() {
  return (
    <div className="w-full items-center space-y-16 justify-center flex flex-col ">
      <Header />
      <br />
      <br />
      <br />
      <MintSection />
      <CreatorRewards />
      <AllNFTs />
      <Footer />
    </div>
    /*  <div className=''>
       <div>
         Hello World
       </div>
       <nav className='flex *:mx-4'>
         {paths.map(({ url, name }) => (
           <Link to={url}>{name}</Link>
         ))}
       </nav>
 
       <Routes>
         {paths.map(({ url, element }) => (
           <Route key={url} path={url} element={element} />
         ))}
       </Routes>
     </div> 
     */
  );
}

export default App;

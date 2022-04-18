import "./App.css";
import { useSelector } from "react-redux";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Home, Products, ProductDetail, Purchases } from "./pages/";
import { LoadingScreen, NavBar, ProtectedRoutes } from "./components/";

function App() {
  const isLoading = useSelector((state) => state.isLoading);

  return (
    <div className="App">
      <HashRouter>
        {isLoading && <LoadingScreen />}
        <NavBar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/purchases" element={<Purchases />} />
          </Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;

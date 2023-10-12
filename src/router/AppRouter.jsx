import { Navigate, Route, Routes } from "react-router-dom";
import { Orders, Menu, NewDish } from "../components/pages";
import { Sidebar } from "../components/ui/Sidebar";


export const AppRouter = () => {
  return (
    <div className="container bg-transparent flex max-w-[1550px] mx-auto min-h-screen pl-96">
      <Sidebar />

      <Routes>
        <Route path="orders" element={<Orders />}/>
        <Route path="menu" element={<Menu />} />
        <Route path="new-dish" element={<NewDish />} />
        <Route path="/*" element={ <Navigate to="orders" />} />
      </Routes>
    </div>
  );
}

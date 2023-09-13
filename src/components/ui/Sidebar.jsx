import { Button } from "@nextui-org/react"
import { NavLink, useLocation } from "react-router-dom"


export const Sidebar = () => {

    const location = useLocation() 

  return (
    <div className="bg-primary w-1/2 sm:w-1/3 lg:w-1/4 text-white px-4">
        <h1 className="text-center mt-3 font-bold tracking-wide text-neutral-50">RESTAURANTAPP</h1>
        <div className="mt-3">
            <p className="text-neutral-200 italic">Manage your restaurant in the following options:</p>
            <nav className="flex flex-col mt-4 items-center">
                <Button className={`${ location.pathname == '/orders' ? "bg-lime-500 text-neutral-50 font-extrabold" : "bg-transparent text-neutral-50 font-medium"} w-11/12 p-0`}>
                    <NavLink to="/orders" className="w-full h-full flex justify-center items-center">Orders</NavLink>
                </Button> 
                <Button className={`${ location.pathname == '/menu' ? "bg-lime-500 text-neutral-50 font-extrabold" : "bg-transparent text-neutral-50 font-medium"} w-11/12 p-0`}>
                    <NavLink to="/menu" className="w-full h-full flex justify-center items-center">Menu</NavLink>
                </Button>    
            </nav>
        </div>
    </div>
  )
}

import { Routes, Route } from "react-router-dom";
import HOC from "../Helpers/HOC";

import Home from "../Components/Pages/Home/Index";
import Shop from "../Components/Pages/Shop/Index";
import Detail from "../Components/Pages/Shop/Detail/Index";
import validateAccount from "../Components/Pages/User/validateAccount/Index";
import Login from "../Components/Pages/Entry/Login/Index";
import Register from "../Components/Pages/Entry/Register/Index";
import Dashboard from "../Components/Pages/User/Dashboard/Index";
import Cart from "../Components/Pages/User/Cart/Index";
import Logout from "../Components/Pages/Entry/Logout/Index";
import Admin from "../Components/Admin/Panel/Index";
import AddProducts from "../Components/Admin/addProducts/Index";
import AddCategories from "../Components/Admin/addCategories/Index";
import ManageUsers from "../Components/Admin/manageUsers/Index";
import NotFound from "../Components/Pages/NotFound/Index";

function Router() {
    return (
        <Routes>
            <Route index path="/" element={<HOC child={Home} />} />

            <Route path="product" element={<HOC child={Shop} />} />
            <Route path="product/:id" element={<HOC child={Detail} />} />

			<Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />

            <Route path="user/:uuid" element={<HOC child={Dashboard} isAuthRequired={true} />} >
                <Route path="validateAccount" element={<HOC child={validateAccount} isAuthRequired={true}/>} />
            </Route>
            
            <Route path="cart" element={<HOC child={Cart} isAuthRequired={true}/>} />
            <Route path="logout" element={<HOC child={Logout} isAuthRequired={true}/>} />

            <Route path="admin" element={<HOC child={Admin} isAuthRequired={true}/>} >
                <Route path="addProducts" element={<HOC child={AddProducts} isAuthRequired={true}/>} />
                <Route path="addCategories" element={<HOC child={AddCategories} isAuthRequired={true}/>} />
                <Route path="manageUsers" element={<HOC child={ManageUsers} isAuthRequired={true}/>} />
            </Route>


            <Route path="*" element={<NotFound />}/>
        </Routes>
    );
}

export default Router;
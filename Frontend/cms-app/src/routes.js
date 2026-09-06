import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import Coupon from "./pages/Coupon/Coupon";
import Comment from "./pages/Comment/Comment";
import Order from "./pages/Order/Order";
import User from "./pages/User/User";
import ProductEdit from "./pages/ProductEdit/ProductEdit";
import CouponEdit from "./pages/CouponEdit/CouponEdit";
import AddProduct from "./pages/AddProduct/AddProduct";
import AddCoupon from "./pages/AddCoupon/AddCoupon";

let routes = [
    { path: "/", element: <Home /> },

    { path: "/products", element: <Product /> },
    { path: "/products/:productId", element: <ProductEdit /> },
    { path: "/products/add-new-product", element: <AddProduct /> },

    { path: "/coupons", element: <Coupon /> },
    { path: "/coupons/:couponId", element: <CouponEdit /> },
    { path: "/coupons/add-new-coupon", element: <AddCoupon /> },

    { path: "/comments", element: <Comment /> },

    { path: "/orders", element: <Order /> },

    { path: "/users", element: <User /> },
];

export default routes;

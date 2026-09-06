import WalletIcon from '@mui/icons-material/Wallet';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import GroupIcon from '@mui/icons-material/Group';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

let allFeatures = [
    {
        id: 1,
        title: "درآمد کل", 
        icon: <WalletIcon />,
        value: "48,200,000",
        subTitle: "تومان",
        desc: "16% افزایش نسبت به دیروز",
        descIcon: <ArrowUpwardIcon />,
    },
    {
        id: 2,
        title: "کاربران", 
        icon: <GroupIcon />,
        value: 642,
        subTitle: "کاربران ثبت نام شده",
        desc: "12% افزایش نسبت به دیروز",
        descIcon: <ArrowUpwardIcon />,
    },
    {
        id: 3,
        title: "محصولات", 
        icon: <Inventory2Icon />,
        value: 86,
        subTitle: "محصول فعال",
        desc: "8% افزایش نسبت به دیروز",
        descIcon: <ArrowUpwardIcon />,
    },
    {
        id: 4,
        title: "سفارش ها", 
        icon: <ShoppingBasketIcon />,
        value: 124,
        subTitle: "سفارش جدید",
        desc: "22% افزایش نسبت به دیروز",
        descIcon: <ArrowUpwardIcon />,
    },
]

export default allFeatures
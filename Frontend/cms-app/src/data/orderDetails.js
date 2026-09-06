import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import ReduceCapacityIcon from "@mui/icons-material/ReduceCapacity";
import GeneratingTokensIcon from "@mui/icons-material/GeneratingTokens";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";

const orderDetail = [
    {
        id: 1,
        title: "کل سفارش ها",
        value: "126",
        icon: <LocalAtmIcon />,
    },
    {
        id: 2,
        title: "در انتظار پردازش",
        value: "8",
        icon: <ReduceCapacityIcon />,
    },
    {
        id: 3,
        title: "تحویل داده شده",
        value: "105",
        icon: <GeneratingTokensIcon />,
    },
    {
        id: 4,
        title: "لغو شده",
        value: "11",
        icon: <DoDisturbIcon />,
    },
];

export default orderDetail;

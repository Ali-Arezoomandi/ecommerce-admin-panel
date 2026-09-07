import React, { useState, useEffect } from "react";
import "./Order.css";
import TableBoxDetail from "../../Components/TableBoxDetail/TableBoxDetail";
import orderDetail from "../../data/orderDetails";
import Table from "../../Components/Table/Table";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Order() {
    const [orders, setOrders] = useState([]);
    const [mainUserOrder, setMainUserOrder] = useState("");

    useEffect(() => {
        fetch("http://localhost:8000/api/orders")
            .then((response) => response.json())
            .then((data) => setOrders(data.reverse()))
            .catch((err) => console.error("Error for get orders: ", err));
    }, []);

    const removeHandler = (orderId) => {
        const isConfirm = window.confirm("آیا از حذف سفارش مطمئن هستید ؟");

        if (!isConfirm) return;

        const allOrder = orders;
        setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));

        fetch(`http://localhost:8000/api/orders/${orderId}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (!response.ok) throw new Error("Delete failed");
                console.log("Deleted order successfullt");
            })
            .catch((err) => {
                console.error("Error for delete order: ", err);
                setOrders(allOrder);
            });
    };

    const columns = [
        {
            field: "id",
            headerName: "کد",
            width: 70,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "user",
            headerName: "کاربر",
            width: 110,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => {
                fetch(`http://localhost:8000/api/users/${params.row.user}`)
                    .then((response) => response.json())
                    .then((data) => {
                        let mainUserName = data.first_name + " " + data.last_name;
                        setMainUserOrder(mainUserName);
                    })
                    .catch((err) => console.error("Error for get main user for order: ", err));

                return <div>{mainUserOrder}</div>;
            },
        },
        {
            field: "coupon_code_used",
            headerName: "کد تخفیف",
            width: 120,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "discount_percent_applied",
            headerName: "درصد تخفیف",
            width: 150,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => {
                return <div>{params.row.discount_percent_applied} %</div>;
            },
        },
        {
            field: "total_price",
            headerName: "قیمت کل",
            width: 210,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => {
                return (
                    <div>
                        {new Intl.NumberFormat("en-US", {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                        }).format(params.row.total_price)}{" "}
                        تومان
                    </div>
                );
            },
        },
        {
            field: "created_at",
            headerName: "زمان ایجاد",
            width: 210,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => {
                return (
                    <div>
                        {new Intl.DateTimeFormat("fa-IR", {
                            dateStyle: "long",
                            calendar: "persian",
                        }).format(new Date(params.row.created_at))}
                    </div>
                );
            },
        },
        {
            field: "action",
            headerName: "Action",
            width: 170,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => {
                return (
                    <div className="action-btns">
                        <button className="btn-icon delete" title="حذف" onClick={() => removeHandler(params.row.id)}>
                            <DeleteIcon />
                        </button>
                    </div>
                );
            },
        },
    ];

    return (
        <>
            <section className="orders-stats">
                {orderDetail.map((coupon) => (
                    <TableBoxDetail key={coupon.id} {...coupon} />
                ))}
            </section>

            <div className="orders-card">
                <div className="orders-header">
                    <div className="orders-title">
                        <i className="fa-solid fa-receipt"></i>
                        لیست سفارشات
                    </div>
                    <div className="filter-tabs">
                        <button className="tab-btn active">همه (۱۲۴)</button>
                        <button className="tab-btn">در انتظار پردازش</button>
                        <button className="tab-btn">ارسال شده</button>
                        <button className="tab-btn">تکمیل شده</button>
                    </div>
                </div>

                <div className="table-responsive">
                    <Table row={orders} columns={columns} />
                </div>
            </div>
        </>
    );
}

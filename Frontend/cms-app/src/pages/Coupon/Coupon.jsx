import React, { useState, useEffect } from "react";
import "./Coupon.css";
import couponDetail from "../../data/couponDetail";
import Table from "../../Components/Table/Table";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import TableBoxDetail from "../../Components/TableBoxDetail/TableBoxDetail";
import { Link, useNavigate } from "react-router-dom";

export default function Coupon() {
    const [coupons, setCoupons] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/api/products/coupon")
            .then((response) => response.json())
            .then((data) => setCoupons(data.reverse()))
            .catch((err) => console.error("Error for get coupons: ", err));
    }, []);

    let navigate = useNavigate();

    const removeHandler = (couponId) => {
        const isConfirm = window.confirm("آیا از حذف کد تخفیف مطمئن هستید ؟");

        if (!isConfirm) return;

        const allCoupon = coupons;
        setCoupons((prevProducts) => prevProducts.filter((coupon) => coupon.id !== couponId));

        fetch(`http://localhost:8000/api/products/coupon/${couponId}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (!response.ok) throw new Error("Delete failed");
                console.log("Deleted coupon successfullt");
            })
            .catch((err) => {
                console.error("Error for delete coupon: ", err);
                setCoupons(allCoupon);
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
            field: "code",
            headerName: "کد تخفیف",
            width: 250,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => {
                return (
                    <span className="code-badge" title="کلیک برای کپی">
                        {params.row.code} <i className="fa-regular fa-copy"></i>
                    </span>
                );
            },
        },
        {
            field: "percent",
            headerName: "درصد تخفیف",
            width: 120,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "status",
            headerName: "وضعیت",
            width: 90,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => {
                return <div>{params.row.status === 1 ? "در دسترس" : "منقضی شده"}</div>;
            },
        },
        {
            field: "expiration_date",
            headerName: "تاریخ انقضا",
            width: 210,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => {
                return (
                    <div>
                        {new Intl.DateTimeFormat("fa-IR", {
                            dateStyle: "long",
                            calendar: "persian",
                        }).format(new Date(params.row.expiration_date))}
                    </div>
                );
            },
        },
        {
            field: "action",
            headerName: "Action",
            width: 310,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => {
                return (
                    <div className="action-btns">
                        <button className="btn-icon delete" title="حذف" onClick={() => removeHandler(params.row.id)}>
                            <DeleteIcon />
                        </button>

                        <button
                            className="btn-icon edit"
                            title="ویرایش"
                            onClick={() => {
                                navigate(`/coupons/${params.row.id}`, {
                                    state: params.row,
                                });
                            }}>
                            <DriveFileRenameOutlineIcon />
                        </button>
                    </div>
                );
            },
        },
    ];

    return (
        <>
            <section className="coupons-stats">
                {couponDetail.map((coupon) => (
                    <TableBoxDetail key={coupon.id} {...coupon} />
                ))}
            </section>

            <div className="coupons-card">
                <div className="coupons-header">
                    <div className="coupons-title">
                        <i className="fa-solid fa-tags"></i>
                        لیست کدهای تخفیف
                    </div>
                    <Link to="/coupons/add-new-coupon">
                        <button className="btn-add-coupon">
                            <i className="fa-solid fa-plus"></i>
                            ایجاد کد تخفیف جدید
                        </button>
                    </Link>
                </div>

                <div className="table-responsive">
                    <Table row={coupons} columns={columns} />
                </div>
            </div>
        </>
    );
}

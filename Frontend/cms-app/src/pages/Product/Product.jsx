import React, { useState, useEffect } from "react";
import "./Product.css";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useNavigate } from "react-router-dom";
import Table from "../../Components/Table/Table";

export default function Product() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/api/products")
            .then((response) => response.json())
            .then((data) => setProducts(data.reverse()))
            .catch((err) => console.error("Error for get products: ", err));
    }, []);

    let navigate = useNavigate();

    const removeHandler = (productId) => {
        const isConfirm = window.confirm("آیا از حذف محصول مطمئن هستید ؟");

        if (!isConfirm) return;

        const allProducts = products;
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));

        fetch(`http://localhost:8000/api/products/${productId}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (!response.ok) throw new Error("Delete failed");
                console.log("Deleted product successfullt");
            })
            .catch((err) => {
                console.error("Error for delete product: ", err);
                setProducts(allProducts);
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
            field: "title",
            headerName: "نام محصول",
            width: 250,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "price",
            headerName: "قیمت",
            width: 120,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => {
                return (
                    <div>
                        {new Intl.NumberFormat("en-US", {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                        }).format(params.row.price)}{" "}
                        تومان
                    </div>
                );
            },
        },
        {
            field: "stock",
            headerName: "موجودی",
            width: 70,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "status",
            headerName: "وضعیت",
            width: 70,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => {
                return <div>{params.row.status === 1 ? "موجود" : "ناموجود"}</div>;
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
            width: 250,
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
                                navigate(`/products/${params.row.id}`, {
                                    state: params.row
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
        <div className="products-card">
            <div className="products-header">
                <div className="products-title">
                    <i className="fa-solid fa-boxes-stacked"></i>
                    لیست محصولات
                </div>
                <Link to="/products/add-new-product">
                    <button className="btn-add-product">
                        <i className="fa-solid fa-plus"></i>
                        افزودن محصول جدید
                    </button>
                </Link>
            </div>

            <div className="table-responsive">
                <Table row={products} columns={columns} />
            </div>
        </div>
    );
}

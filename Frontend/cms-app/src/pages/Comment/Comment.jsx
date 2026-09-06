import React, { useState, useEffect } from "react";
import "./Comment.css";
import Table from "../../Components/Table/Table";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";

export default function Comment() {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComment = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/products/comment");
                const data = await response.json();

                const detailComments = await Promise.all(
                    data.map(async (comment) => {
                        const [user, product] = await Promise.all([
                            fetch(`http://localhost:8000/api/users/${comment.user}`),
                            fetch(`http://localhost:8000/api/products/${comment.product}`),
                        ]);

                        const userJson = await user.json();
                        const productJson = await product.json();

                        return {
                            ...comment,
                            userName: `${userJson.first_name} ${userJson.last_name}`,
                            productName: productJson.title,
                        };
                    }),
                );

                setComments(detailComments);
            } catch (err) {
                console.error("Error fetching comments: ", err);
            }
        };

        fetchComment();
    }, []);

    const removeHandler = (commentId) => {
        const isConfirm = window.confirm("آیا از حذف کامنت مطمئن هستید ؟");

        if (!isConfirm) return;

        const allComment = comments;
        setComments((prevComment) => prevComment.filter((comment) => comment.id !== commentId));

        fetch(`http://localhost:8000/api/products/comment/${commentId}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (!response.ok) throw new Error("Delete failed");
                console.log("Deleted comment successfullt");
            })
            .catch((err) => {
                console.error("Error for delete comment: ", err);
                setComments(allComment);
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
            field: "body",
            headerName: "کامنت",
            width: 450,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "user",
            headerName: "کاربر",
            width: 120,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => {
                return <div>{params.row.userName}</div>;
            },
        },
        {
            field: "product",
            headerName: "محصول",
            width: 190,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => {
                return <div>{params.row.productName}</div>;
            },
        },
        {
            field: "created_at",
            headerName: "تاریخ ایجاد",
            width: 130,
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
            width: 90,
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
        <div className="comments-card">
            <div className="comments-header">
                <div className="comments-title">
                    <i className="fa-regular fa-comments"></i>
                    مدیریت نظرات کاربران
                </div>
                <div className="filter-tabs">
                    <button className="tab-btn active">همه (۴)</button>
                    <button className="tab-btn">در انتظار تأیید (۱)</button>
                    <button className="tab-btn">تأیید شده (۳)</button>
                </div>
            </div>

            <div className="table-responsive">
                <Table row={comments} columns={columns} />
            </div>
        </div>
    );
}

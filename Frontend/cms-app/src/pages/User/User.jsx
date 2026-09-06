import React, { useState, useEffect } from "react";
import "./User.css";
import TableBoxDetail from "../../Components/TableBoxDetail/TableBoxDetail";
import userDetails from "../../data/userDetails";
import Table from "../../Components/Table/Table";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";

export default function User() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/api/users")
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((err) => console.error("Error for get users: ", err));
    }, []);

    const removeHandler = (userId) => {
        const isConfirm = window.confirm("آیا از حذف کاربر مطمئن هستید ؟");

        if (!isConfirm) return;

        const allUser = users;
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));

        fetch(`http://localhost:8000/api/users/${userId}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (!response.ok) throw new Error("Delete failed");
                console.log("Deleted user successfullt");
            })
            .catch((err) => {
                console.error("Error for delete user: ", err);
                setUsers(allUser);
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
            field: "first_name",
            headerName: "نام",
            width: 90,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "last_name",
            headerName: "نام خانوادگی",
            width: 90,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "phone",
            headerName: "شماره تلفن",
            width: 120,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "city",
            headerName: "شهر",
            width: 120,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "address",
            headerName: "شماره تلفن",
            width: 350,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "created_date",
            headerName: "زمان ایجاد",
            width: 130,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => {
                return (
                    <div>
                        {new Intl.DateTimeFormat("fa-IR", {
                            dateStyle: "long",
                            calendar: "persian",
                        }).format(new Date(params.row.created_date))}
                    </div>
                );
            },
        },
        {
            field: "action",
            headerName: "Action",
            width: 70,
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
            <section className="users-stats">
                {userDetails.map((user) => (
                    <TableBoxDetail key={user.id} {...user} />
                ))}
            </section>

            <div className="users-card">
                <div className="users-header">
                    <div className="users-title">
                        <i className="fa-solid fa-address-book"></i>
                        لیست کاربران
                    </div>
                </div>

                <div className="table-responsive">
                    <Table row={users} columns={columns} />
                </div>
            </div>
        </>
    );
}

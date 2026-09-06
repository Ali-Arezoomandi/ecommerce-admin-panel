import React from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function Table({ row, columns }) {
    return (
        <DataGrid
            rows={row}
            columns={columns}
            autoHeight
            initialState={{
                pagination: {
                    paginationModel: {
                        pageSize: 5,
                    },
                },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
            sx={{
                border: "none",
                color: "var(--text-main)",
                backgroundColor: "var(--card-bg)",

                // هدر کلی (کانتینر اصلی هدر)
                "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: "var(--badge-bg) !important",
                    border: "1px solid var(--card-border) !important",
                    borderRadius: "8px 8px 0 0",
                },

                // هدف قرار دادن تک‌تک سلول‌های هدر برای حذف background پیش‌فرض MUI
                "& .MuiDataGrid-columnHeader": {
                    backgroundColor: "var(--badge-bg) !important",
                },

                "& .MuiDataGrid-columnHeaderTitle": {
                    color: "var(--text-muted)",
                    fontWeight: 500,
                },

                // سطرها
                "& .MuiDataGrid-row": {
                    borderBottom: "1px solid var(--card-border)",
                },
                "& .MuiDataGrid-row:hover": {
                    backgroundColor: "var(--table-hover)",
                },
                "& .MuiDataGrid-cell": {
                    borderBottom: "1px solid var(--card-border)",
                    color: "var(--text-main)",
                },
                "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": {
                    outline: "none",
                },

                // فوتر و پجینیشن
                "& .MuiDataGrid-footerContainer": {
                    borderTop: "1px solid var(--card-border)",
                    color: "var(--text-muted)",
                },
                "& .MuiTablePagination-root": {
                    color: "var(--text-muted)",
                },
                "& .MuiSvgIcon-root": {
                    color: "var(--text-muted)",
                },

                // جداکننده ستون‌ها
                "& .MuiDataGrid-columnSeparator": {
                    display: "none",
                },

                "& .MuiTablePagination-spacer": {
                    display: "none",
                },
                "& .MuiTablePagination-toolbar": {
                    justifyContent: "flex-start",
                    marginRight: "10px",
                    direction: "rtl",
                },
                "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
                    margin: 0,
                },
                "& .MuiTablePagination-actions": {
                    direction: "rtl",
                },
            }}
        />
    );
}

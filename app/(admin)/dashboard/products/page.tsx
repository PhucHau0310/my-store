'use client';

import React, { useState } from 'react';
import { Box, Typography, styled, Fab } from '@mui/material';
import {
    DataGrid,
    GridColDef,
    GridRowsProp,
    GridRowModes,
    GridRowModesModel,
    GridEventListener,
    GridRowId,
    GridRowModel,
    GridRowEditStopReasons,
    GridActionsCellItem,
} from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import AddProduct from '@/Components/admin/items/AddProduct';
import CustomNoRows from '@/Components/admin/items/CustomNoRows';

const initialRows: GridRowsProp = [
    {
        id: 1,
        productName: 'Alibaba',
        category: 'Online',
        price: 232.2,
        salePrice: 102,
        stock: 10,
        status: 'Available',
        published: true,
    },
    {
        id: 2,
        productName: 'NoNoNo',
        category: 'Offline',
        price: 565.2,
        salePrice: 150,
        stock: 20,
        status: 'Available',
        published: true,
    },
];

const Products = () => {
    const [rows, setRows] = React.useState(initialRows);
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
        {}
    );
    const [paginationModel, setPaginationModel] = React.useState({
        pageSize: 5,
        page: 0,
    });

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (
        params,
        event
    ) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.Edit },
        });
    };

    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View },
        });
    };

    const handleDeleteClick = (id: GridRowId) => () => {
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow!.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    // const processRowUpdate = (newRow: GridRowModel) => {
    //     const updatedRow = { ...newRow, isNew: false };
    //     setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    //     return updatedRow;
    // };

    // const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    //     setRowModesModel(newRowModesModel);
    // };

    const columns: GridColDef[] = [
        {
            field: 'productName',
            headerName: 'Product Name',
            width: 180,
            editable: true,
        },
        {
            field: 'category',
            headerName: 'Category',
            width: 180,
            editable: true,
        },
        {
            field: 'price',
            headerName: 'Price',
            type: 'number',
            width: 150,
            editable: true,
        },
        {
            field: 'salePrice',
            headerName: 'Sale Price',
            type: 'number',
            width: 150,
            editable: true,
        },
        {
            field: 'stock',
            headerName: 'Stock',
            type: 'number',
            width: 150,
            editable: true,
        },
        { field: 'status', headerName: 'Status', width: 150, editable: true },
        {
            field: 'published',
            headerName: 'Published',
            type: 'boolean',
            width: 150,
            editable: true,
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode =
                    rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            key={`save-${id}`}
                            icon={<SaveIcon />}
                            label="Save"
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            key={`save-${id}`}
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        key={`save-${id}`}
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        key={`save-${id}`}
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    const [openAddProduct, setOpenAddProduct] = useState<boolean>(false);

    return (
        <Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                Products
            </Typography>

            <Fab
                onClick={() => setOpenAddProduct(true)}
                color="primary"
                aria-label="add"
                sx={{ position: 'fixed', right: '30px', bottom: '70px' }}
            >
                <AddIcon />
            </Fab>

            {openAddProduct && (
                <AddProduct
                    openAddProduct={openAddProduct}
                    setOpenAddProduct={setOpenAddProduct}
                />
            )}

            <Box sx={{ height: 520, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    editMode="row"
                    rowModesModel={rowModesModel}
                    onRowEditStop={handleRowEditStop}
                    // onRowModesModelChange={handleRowModesModelChange}
                    // processRowUpdate={processRowUpdate}
                    slots={{
                        noRowsOverlay: CustomNoRows,
                    }}
                    slotProps={{
                        toolbar: { setRows, setRowModesModel },
                    }}
                    pageSizeOptions={[5, 10, 25]}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                />
            </Box>
        </Box>
    );
};

export default Products;

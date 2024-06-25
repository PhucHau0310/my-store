'use client';

import React, { useEffect, useState } from 'react';
import { Box, Typography, Fab, CircularProgress, Alert } from '@mui/material';
import {
    DataGrid,
    GridColDef,
    GridRowModes,
    GridRowModesModel,
    GridEventListener,
    GridRowId,
    GridRowModel,
    GridRowEditStopReasons,
    GridActionsCellItem,
    GridToolbar,
} from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import AddProduct from '@/Components/admin/items/AddProduct';
import CustomNoRows from '@/Components/admin/items/CustomNoRows';
import DialogDeleteProduct from '@/Components/admin/items/DialogDeleteProduct';

interface StockInter {
    id: number;
    productId: number;
    warehouseId: number;
    quantity: number;
}
interface AllProducts {
    id: number;
    name: String;
    picture: string;
    version: string;
    description: string;
    price: number;
    quantity: number;
    published: boolean;
    categoryId: number;
    Stock?: StockInter;
}

const Products = () => {
    const [rows, setRows] = useState<AllProducts[]>([]);
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
        {}
    );
    const [openAddProduct, setOpenAddProduct] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<{ status: boolean; text: string }>();
    const [openDialogDelete, setOpenDialogDelete] = useState<boolean>(false);
    const [idDelete, setIdDelete] = useState<GridRowId>();
    const [triggerAddCate, setTriggerAddCate] = useState<boolean>(false);

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

    // fix update product
    const handleSaveClick = (id: GridRowId) => async () => {
        try {
            setLoading(true);
            const row = rows.find((r) => r.id === id);
            const data = {
                id: row?.id,
                name: row?.name,
                picture: row?.picture,
                version: row?.version,
                description: row?.description,
                price: row?.price,
                quantity: row?.quantity,
                published: row?.published,
                categoryId: row?.categoryId,
            };
            const response = await fetch(`/api/product/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const { message } = await response.json();

            if (message) {
                setMessage({
                    status: response.status === 200 ? true : false,
                    text: message,
                });
            }

            if (response.ok) {
                setRowModesModel({
                    ...rowModesModel,
                    [id]: { mode: GridRowModes.View },
                });
            } else {
                // Xử lý lỗi nếu cần
            }
        } catch (error) {
            console.error('Error updating product:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });
    };

    // fix update product
    const processRowUpdate = async (newRow: GridRowModel) => {
        try {
            const data = {
                id: newRow?.id,
                name: newRow?.name,
                picture: newRow?.picture,
                version: newRow?.version,
                description: newRow?.description,
                price: newRow?.price,
                quantity: newRow?.quantity,
                published: newRow?.published,
                categoryId: newRow?.categoryId,
            };
            const response = await fetch(`/api/product/${newRow.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const updatedRow: AllProducts = {
                    id: newRow.id,
                    name: newRow.name,
                    picture: newRow.picture,
                    version: newRow.version,
                    description: newRow.description,
                    price: newRow.price,
                    quantity: newRow.quantity,
                    published: newRow.published,
                    categoryId: newRow.categoryId,
                };

                setRows((prevRows) =>
                    prevRows.map((row) =>
                        row.id === newRow.id ? updatedRow : row
                    )
                );

                return updatedRow;
            } else {
                return rows.find((row) => row.id === newRow.id) || newRow;
            }
        } catch (error) {
            console.error('Error updating row:', error);
            return rows.find((row) => row.id === newRow.id) || newRow;
        }
    };

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const handleShowDialog = (id: GridRowId) => {
        setOpenDialogDelete(true);
        setIdDelete(id);
    };

    const renderStock = (stocks: StockInter[] | undefined, id: GridRowId) => {
        if (!stocks || stocks.length === 0) {
            return 0;
        }

        const currentStock = stocks.find((stock) => stock.productId === id);

        if (!currentStock) {
            return 0;
        }

        return currentStock.quantity;
    };

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'ID',
            width: 100,
            editable: true,
        },
        {
            field: 'picture',
            headerName: 'PICTURE',
            width: 100,
            renderCell: (params) => (
                <img
                    src={params.value}
                    alt={params.row.name}
                    style={{
                        width: '50px',
                        height: '50px',
                        objectFit: 'cover',
                    }}
                />
            ),
        },
        {
            field: 'name',
            headerName: 'Product Name',
            width: 180,
            editable: true,
        },
        {
            field: 'categoryId',
            headerName: 'Category ID',
            width: 100,
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
            renderCell: (params) =>
                renderStock(params.row.Stock, params.row.id),
        },
        {
            field: 'version',
            headerName: 'Version',
            width: 100,
            editable: true,
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 150,
            renderCell: (params) =>
                params.row.published ? 'Available' : 'Unavailable',
        },
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
                        // onClick={handleDeleteClick(id)}
                        onClick={() => handleShowDialog(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    useEffect(() => {
        const products = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/product`);
                const data: AllProducts[] = await res.json();

                if (res.ok) {
                    setRows(data);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        products();
    }, [triggerAddCate]);

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage(undefined);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                Products
            </Typography>

            {isLoading && <CircularProgress />}

            {message && (
                <Alert
                    sx={{
                        position: 'fixed',
                        right: '0px',
                        top: '10%',
                        width: '400px',
                    }}
                    severity={message.status ? 'success' : 'error'}
                >
                    {message.text}
                </Alert>
            )}

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
                    setTriggerAddCate={setTriggerAddCate}
                />
            )}

            <Box sx={{ height: 520, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    editMode="row"
                    checkboxSelection
                    rowModesModel={rowModesModel}
                    onRowEditStop={handleRowEditStop}
                    onRowModesModelChange={handleRowModesModelChange}
                    processRowUpdate={processRowUpdate}
                    slots={{
                        noRowsOverlay: CustomNoRows,
                        toolbar: GridToolbar,
                    }}
                    slotProps={{
                        toolbar: { setRows, setRowModesModel },
                    }}
                />
            </Box>

            <DialogDeleteProduct
                openDialogDelete={openDialogDelete}
                setOpenDialogDelete={setOpenDialogDelete}
                id={idDelete}
                setLoading={setLoading}
                setMessage={setMessage}
                setRows={setRows}
                rows={rows}
            />
        </Box>
    );
};

export default Products;

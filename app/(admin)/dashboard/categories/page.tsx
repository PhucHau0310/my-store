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
} from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import CustomNoRows from '@/Components/admin/items/CustomNoRows';
import AddCategory from '@/Components/admin/items/AddCategory';
import DialogDeleteCategory from '@/Components/admin/items/DialogDeleteCategory';

interface AllCategories {
    id: number;
    name: string;
    description: string;
    image: string;
    published: boolean;
}

const Categories = () => {
    const [openAddCategory, setOpenAddCategory] = useState<boolean>(false);
    const [rows, setRows] = useState<AllCategories[]>([]);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
    const [message, setMessage] = useState<{ status: boolean; text: string }>();
    const [openDialogDelete, setOpenDialogDelete] = useState<boolean>(false);
    const [idDelete, setIdDelete] = useState<GridRowId>();

    useEffect(() => {
        const getAllCategories = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/category`);
                const data: AllCategories[] = await res.json();

                if (res.ok) {
                    setRows(data);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        getAllCategories();
    }, []);

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage(undefined);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [message]);

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

    const handleSaveClick = (id: GridRowId) => async () => {
        try {
            setLoading(true);
            const row = rows.find((r) => r.id === id);
            const response = await fetch(`/api/category/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(row),
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
            console.error('Error updating category:', error);
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

    const processRowUpdate = async (newRow: GridRowModel) => {
        try {
            const response = await fetch(`/api/category/${newRow.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newRow),
            });

            if (response.ok) {
                // Chuyển đổi newRow thành AllCategories
                const updatedRow: AllCategories = {
                    id: newRow.id,
                    name: newRow.name,
                    description: newRow.description,
                    image: newRow.image,
                    published: newRow.published,
                };

                setRows((prevRows) =>
                    prevRows.map((row) =>
                        row.id === newRow.id ? updatedRow : row
                    )
                );

                return updatedRow;
            } else {
                // Trong trường hợp lỗi, trả về row cũ
                return rows.find((row) => row.id === newRow.id) || newRow;
            }
        } catch (error) {
            console.error('Error updating row:', error);
            // Trong trường hợp lỗi, trả về row cũ
            return rows.find((row) => row.id === newRow.id) || newRow;
        }
    };

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const handleDialog = (id: GridRowId) => {
        setOpenDialogDelete(true);
        setIdDelete(id);
    };

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'ID',
            width: 70,
        },
        {
            field: 'image',
            headerName: 'IMAGE',
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
            headerName: 'NAME',
            width: 200,
            editable: true,
        },
        {
            field: 'description',
            headerName: 'DESCRIPTION',
            width: 300,
            editable: true,
        },
        {
            field: 'published',
            headerName: 'PUBLISHED',
            type: 'boolean',
            width: 120,
            editable: true,
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'ACTIONS',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode =
                    rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
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
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        // onClick={handleDeleteClick(id)}
                        onClick={() => handleDialog(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    return (
        <Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                Categories
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
                onClick={() => setOpenAddCategory(true)}
                color="primary"
                aria-label="add"
                sx={{ position: 'fixed', right: '30px', bottom: '70px' }}
            >
                <AddIcon />
            </Fab>

            {openAddCategory && (
                <AddCategory
                    openAddCategory={openAddCategory}
                    setOpenAddCategory={setOpenAddCategory}
                />
            )}

            <Box sx={{ height: 520, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    editMode="row"
                    rowModesModel={rowModesModel}
                    onRowModesModelChange={handleRowModesModelChange}
                    onRowEditStop={handleRowEditStop}
                    processRowUpdate={processRowUpdate}
                    slots={{
                        noRowsOverlay: CustomNoRows,
                    }}
                    slotProps={{
                        toolbar: { setRows, setRowModesModel },
                    }}
                    // pageSizeOptions={[5, 10, 25]}
                    // paginationModel={paginationModel}
                    // onPaginationModelChange={setPaginationModel}
                />
            </Box>

            <DialogDeleteCategory
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

export default Categories;

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
import CustomNoRows from '@/Components/admin/items/CustomNoRows';
import AddWarehouse from '@/Components/admin/items/AddWarehouse';
import DialogDeleteWarehouse from '@/Components/admin/items/DialogDeleteWarehouse';

interface Warehouses {
    id: number;
    name: string;
    location: string;
}

const Warehouse = () => {
    const [openAddWarehouse, setOpenAddWarehouse] = useState<boolean>(false);
    const [rows, setRows] = useState<Warehouses[]>([]);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
    const [message, setMessage] = useState<{ status: boolean; text: string }>();
    const [openDialogDelete, setOpenDialogDelete] = useState<boolean>(false);
    const [idDelete, setIdDelete] = useState<GridRowId>();
    const [triggerAddWarehouse, setTriggerAddWarehouse] =
        useState<boolean>(false);

    useEffect(() => {
        const getWarehouses = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/warehouse`);
                const data: Warehouses[] = await res.json();

                if (res.ok) {
                    setRows(data);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        getWarehouses();
    }, [triggerAddWarehouse]);

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
            const response = await fetch(`/api/warehouse/${id}`, {
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
            console.error('Error updating warehouse:', error);
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
            const response = await fetch(`/api/warehouse/${newRow.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newRow),
            });

            if (response.ok) {
                // Chuyển đổi newRow thành AllCategories
                const updatedRow: Warehouses = {
                    id: newRow.id,
                    name: newRow.name,
                    location: newRow.location,
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
            field: 'name',
            headerName: 'NAME',
            width: 200,
            editable: true,
        },
        {
            field: 'location',
            headerName: 'LOCATION',
            width: 300,
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
                Warehouses
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
                onClick={() => setOpenAddWarehouse(true)}
                color="primary"
                aria-label="add"
                sx={{ position: 'fixed', right: '30px', bottom: '70px' }}
            >
                <AddIcon />
            </Fab>

            {openAddWarehouse && (
                <AddWarehouse
                    openAddWarehouse={openAddWarehouse}
                    setOpenAddWarehouse={setOpenAddWarehouse}
                    triggerAddWarehouse={triggerAddWarehouse}
                    setTriggerAddWarehouse={setTriggerAddWarehouse}
                />
            )}

            <Box sx={{ height: 520, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    editMode="row"
                    checkboxSelection
                    rowModesModel={rowModesModel}
                    onRowModesModelChange={handleRowModesModelChange}
                    onRowEditStop={handleRowEditStop}
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

            <DialogDeleteWarehouse
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

export default Warehouse;

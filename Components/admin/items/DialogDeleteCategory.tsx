import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
import { GridRowId } from '@mui/x-data-grid';
import React from 'react';

interface AllCategories {
    id: number;
    name: string;
    description: string;
    image: string;
    published: boolean;
}

interface Props {
    openDialogDelete: boolean;
    setOpenDialogDelete: React.Dispatch<React.SetStateAction<boolean>>;
    id: GridRowId | undefined;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setMessage: React.Dispatch<
        React.SetStateAction<
            | {
                  status: boolean;
                  text: string;
              }
            | undefined
        >
    >;
    setRows: React.Dispatch<React.SetStateAction<AllCategories[]>>;
    rows: AllCategories[];
}

const DialogDeleteCategory = ({
    openDialogDelete,
    setOpenDialogDelete,
    id,
    setLoading,
    setMessage,
    setRows,
    rows,
}: Props) => {
    const handleDeleteClick = (id: GridRowId) => async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/category/${id}`, {
                method: 'DELETE',
            });

            const { message } = await response.json();

            if (message) {
                setMessage({
                    status: response.status === 200 ? true : false,
                    text: message,
                });
            }

            if (response.ok) {
                setRows(rows.filter((row) => row.id !== id));
            } else {
                // Xử lý lỗi nếu cần
            }
        } catch (error) {
            console.error('Error deleting category:', error);
        } finally {
            setOpenDialogDelete(false);
            setLoading(false);
        }
    };

    return (
        <React.Fragment>
            <Dialog
                open={openDialogDelete}
                onClose={() => setOpenDialogDelete(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {`Do you want to delete ID category: ${id}?`}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialogDelete(false)}>
                        Disagree
                    </Button>
                    <Button onClick={handleDeleteClick(id ?? -1)} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default DialogDeleteCategory;

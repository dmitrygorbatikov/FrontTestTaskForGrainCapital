import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {FC} from "react";
import {IconButton, Typography} from "@mui/material";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import {IUser} from "../../modules/redux/users/types";
import SkeletonTableComponent from "../skeleton/SkeletonTableComponent";

interface ITable {
    columns: string[]
    data: any
    deleteAction: (user: IUser) => void
    editAction: (user: IUser) => void
    onRowClick?: (id: string) => void
    loading?: boolean
}
const TableComponent: FC<ITable> = (props) => {
    const {data, columns, onRowClick, editAction, deleteAction, loading} = props
    return (
        <>
            {loading ? <SkeletonTableComponent/> :

                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {columns.map((col, index) => <TableCell key={`col${index}`}>{col}</TableCell>)}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row: any) => (
                                <TableRow
                                    key={row.id}
                                    sx={{
                                        '&:last-child td, &:last-child th': {border: 0}, '&:hover': {
                                            background: '#d4d4d4',
                                            transition: '.3s',
                                            cursor: 'pointer'
                                        }
                                    }}
                                >
                                    {Object.keys(row).map((key, index) => {
                                        if (key === 'actions') {
                                            return (
                                                <TableCell key={`action${index}`}>
                                                    <IconButton onClick={() => editAction(row)} aria-label="delete"
                                                                size="large">
                                                        <ModeEditIcon fontSize="inherit"/>
                                                    </IconButton>
                                                    <IconButton onClick={() => deleteAction(row)} aria-label="delete"
                                                                size="large">
                                                        <DeleteIcon fontSize="inherit"/>
                                                    </IconButton>
                                                </TableCell>
                                            )
                                        } else {
                                            return (
                                                <TableCell
                                                    key={`${row[key] + row.id}`}
                                                    onClick={() => onRowClick ? onRowClick(row.id) : null}
                                                >
                                                    {Boolean(row['edited']) ? <Typography color={'#0048ff'} variant={'overline'}>{row[key]}</Typography> : row[key]}
                                                </TableCell>
                                            )
                                        }
                                    })}

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </>
    );
}

export default TableComponent
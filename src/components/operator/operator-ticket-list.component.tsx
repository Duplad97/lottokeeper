import { Box, Typography, styled } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { ITicket } from "../../store/userSlice";
import CustomNoRowsOverlay from "../../_helper/custom-no-rows.component";
import moment from "moment";

interface IProps {
    data: ITicket[]
    onlyDrawn: boolean
}


function OperatorTicketList(props: IProps) {

    const getColumns = (): GridColDef[] => {
        const columns: GridColDef[] = [
            { field: 'id', headerName: 'ID', width: 60, sortable: false },
            {
                field: 'numbers',
                headerName: 'Megjátszott számok',
                width: 150,
                editable: true,
                sortable: false,
                valueGetter: (params: GridValueGetterParams) =>
                    `${params.row.numbers.join(', ')}`,
            },
            {
                field: 'drawn',
                headerName: 'Húzás megtörtént',
                width: 150,
                editable: true,
                sortable: false,
                valueGetter: (params: GridValueGetterParams) =>
                    `${params.row.drawn ? "Igen" : "Nem"}`,
            },
        ]

        if (props.onlyDrawn) {
            columns.push(
                {
                    field: 'score',
                    headerName: 'Találatok száma',
                    type: 'number',
                    width: 150,
                    editable: true,
                },
                {
                    field: 'prize',
                    headerName: 'Nyeremény',
                    description: 'This column has a value getter and is not sortable.',
                    sortable: false,
                    width: 150,
                    valueGetter: (params: GridValueGetterParams) =>
                        `${params.row.prize} akcse`,
                });
        }

        columns.push(
            {
                field: 'generated',
                headerName: 'Generált szelvény',
                width: 150,
                editable: true,
                sortable: false,
                valueGetter: (params: GridValueGetterParams) =>
                    `${params.row.generated ? "Igen" : "Nem"}`,
            },
            {
                field: 'date',
                headerName: 'Feladás dátuma',
                width: 150,
                editable: true,
                valueGetter: (params: GridValueGetterParams) =>
                    moment(params.row.date).format("YYYY.MM.DD (HH:mm)"),
            }
        )

        return columns;
    }

    return (
        <Box sx={{ height: 450, width: '48%' }}>
            <Typography variant="h6">{props.onlyDrawn ? "Kihúzott szelvények" : "Összes feladott szelvény"}</Typography>
            <DataGrid
                rows={props.data}
                columns={getColumns()}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                slots={{
                    noRowsOverlay: CustomNoRowsOverlay,
                }}
                pageSizeOptions={[5]}
                //checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    )
}
export default OperatorTicketList;
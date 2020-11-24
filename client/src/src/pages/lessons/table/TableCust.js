import {Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, withStyles} from "@material-ui/core";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TablePaginationActions from "@material-ui/core/TablePagination/TablePaginationActions";
import Table from "@material-ui/core/Table";
import HeaderTableCust from "./header/HeaderTableCust";

const TableCust = ({items, role})=>{
    // debugger
    console.log('items', items)

    // if (items.length < 1){
    //     return <div>1</div>
    // }


    const StyledTableCell = withStyles((theme) => ({
        head: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
        },
    }))(TableCell)

    const StyledTableRow = withStyles((theme) => ({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }))(TableRow);




    // const [order, setOrder] = useState('asc');
    // const [orderBy, setOrderBy] = useState('calories');
    //
    // const handleRequestSort = (event, property) => {
    //     const isAsc = orderBy === property && order === 'asc';
    //     setOrder(isAsc ? 'desc' : 'asc');
    //     setOrderBy(property);
    // };

    return(
        <TableContainer component={Paper}>
            <Table className="{c.name}" aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>{role ? 'Студент' : 'Преподаватель'}</StyledTableCell>
                        <StyledTableCell align="right">dateCreate</StyledTableCell>
                        <StyledTableCell align="right">dateCarrying</StyledTableCell>
                        <StyledTableCell align="right">price</StyledTableCell>
                        <StyledTableCell align="right">multiplier</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((item, idx) => (
                        <StyledTableRow key={idx}>
                            <StyledTableCell >{role ? item.student : item.teacher}</StyledTableCell>
                            <StyledTableCell align="right">{'row.calories'}</StyledTableCell>
                            <StyledTableCell align="right">{item.price}</StyledTableCell>
                            <StyledTableCell align="right">{'row.carbs'}</StyledTableCell>
                            <StyledTableCell align="right">{'row.protein'}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            // colSpan={}
                            count={items.length}
                            // rowsPerPage={rowsPerPage}
                            // page={page}
                            SelectProps={{
                                inputProps: { 'aria-label': 'row' },
                                native: true,
                            }}
                            // onChangePage={handleChangePage}
                            // onChangeRowsPerPage={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    )
}

export default TableCust
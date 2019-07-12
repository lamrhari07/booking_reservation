import React from "react";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";

import {
    Table,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
    Button,
    TablePagination,
    withStyles,
} from "@material-ui/core";

import { Loading } from "../Loading";
import { FetchReservation } from "../../actions/resAction";


const ReservationTable = ({ isLoading, data, ...props }) => {


    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    function handleChangePage(event, newPage) {
        setPage(newPage);
    }

    function handleChangeRowsPerPage(event) {
        setRowsPerPage(+event.target.value);
        setPage(0);
    }

    const TableRes = data.map((v) => {
        return v.map((w) => {
            return (
                <TableRow key={w.id} >
                    <TableCell>{w.first_name}</TableCell>
                    <TableCell>{w.last_name}</TableCell>
                    <TableCell>{w.email}</TableCell>
                    <TableCell>233.99$</TableCell>
                    <TableCell>{w.reserved_start_date}</TableCell>
                    <TableCell>
                        <Button
                            size="small"
                            className="px-2"
                            variant="contained"
                            color="primary"
                        >
                            Accept
                        </Button>
                    </TableCell>
                    <TableCell>
                        <Button
                            size="small"
                            className="px-2"
                            variant="contained"
                            color="secondary"
                        >
                            Delete
                        </Button>
                    </TableCell>
                </TableRow>
            )
        })
    })

    return (
        <React.Fragment>
            <Table className="mb-0">
                <TableHead>
                    <TableRow>
                        {
                            [
                                'First Name', 'Last Name', 'Email Address',
                                'Phone Number', 'Reservation Date', 'Status'
                            ].map((v, i) => {
                                return <TableCell key={i}>{v}</TableCell>
                            })
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    { isLoading ? <Loading /> : TableRes}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                count={10}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                    'aria-label': 'Previous Page',
                }}
                nextIconButtonProps={{
                    'aria-label': 'Next Page',
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </React.Fragment>
    )
}

const styles = theme => ({
    card: {
        minHeight: "100%",
        display: "flex",
        flexDirection: "column"
    },
})

const stateProps = (state) => {
    return {
        data: state.res.data,
        isLoading: state.res.isLoading
    }
}

const PostsListWithData = lifecycle({
    componentDidMount() {
        this.props.dispatch(FetchReservation())
    }
});


const styledComponent = withStyles(styles)(ReservationTable);
export default compose(connect(stateProps), PostsListWithData)(styledComponent);
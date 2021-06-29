import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../redux/actions/actions'
import {
    useTable,
    useSortBy,
    useGlobalFilter,
    useFilters,
    usePagination
} from 'react-table'

const columnFilter = ({ column }) => {
    const { filterValue, setFilter } = column
    return (
        <span>
            Search: {' '}
            <input type="text" value={filterValue || ''} onChange={e => { setFilter(e.target.value); e.preventDefault() }} />
        </span>
    )
}

const COLUMNS = [
    {
        Header: 'Id',
        accessor: 'id',
        // disableFilters: true
    },
    {
        Header: 'Title',
        accessor: 'title',
    },
    {
        Header: 'Author',
        accessor: 'author',
    }
]

function ListingTable() {

    const dispatch = useDispatch()
    const usersData = useSelector(state => state.dealWithAPI)
    const columns = useMemo(() => COLUMNS, [])

    const defaultColumn = useMemo(() => {
        return {
            Filter: columnFilter
        }
    }, [])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        prepareRow,
        state,
        setGlobalFilter
    } = useTable({
        columns,
        data: usersData.users,
        defaultColumn
    }, useFilters, useGlobalFilter, useSortBy, usePagination)

    const { globalFilter } = state

    useEffect(() => {
        dispatch(fetchUsers())
    }, [])

    return (
        <>
            <br />
            <div className="text-center">
                <span>
                    Search: {' '}
                    <input type="text" value={globalFilter || ''} onChange={e => setGlobalFilter(e.target.value)} />
                </span>
            </div>
            <br />
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th >
                                    <div {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {column.render('Header')}
                                        <span>
                                            {column.isSorted
                                                ? column.isSortedDesc
                                                    ? ' 🔽'
                                                    : ' 🔼'
                                                : ''}
                                        </span>
                                    </div>
                                    <div onClick={e => e.preventDefault()}>{column.canFilter ? column.render('Filter') : null}</div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map(row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <br />
            <div className="text-center">
                <span>
                    page {' '}
                    <strong>
                        {state.pageIndex + 1} of {pageOptions.length} {' '}
                    </strong>
                </span>
                <span className="w-25">
                    | Go to page: {' '}
                    <input type="number" defaultValue={state.pageIndex + 1} onChange={e => {
                        const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                        gotoPage(pageNumber)
                    }} />
                </span>
                {'  '}
                <button className="btn btn-primary btn-sm" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
                {'  '}
                <button className="btn btn-primary btn-sm" disabled={!canPreviousPage} onClick={() => previousPage()}>Previous</button>
                {'  '}
                <button className="btn btn-primary btn-sm" disabled={!canNextPage} onClick={() => nextPage()}>Next</button>
                {'  '}
                <button className="btn btn-primary btn-sm" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
            </div>
        </>
    )
}

export default ListingTable
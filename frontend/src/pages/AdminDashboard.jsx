import { useState, useEffect } from 'react'
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid'
import Pagination from '@mui/material/Pagination'
import axios from 'axios'
import authService from '../features/auth/authService'
import AdminRecipeManagement from '../components/AdminRecipeManagement'

function CustomToolbar() {
  return (
    <GridToolbarContainer sx={{ bgcolor: '#ad192a9f' }}>
      <GridToolbarColumnsButton style={{ color: 'white' }} />
      <GridToolbarFilterButton style={{ color: 'white' }} />
      <GridToolbarDensitySelector style={{ color: 'white' }} />
      <GridToolbarExport style={{ color: 'white' }} />
    </GridToolbarContainer>
  )
}

function CustomPagination() {
  const apiRef = useGridApiContext()
  const page = useGridSelector(apiRef, gridPageSelector)
  const pageCount = useGridSelector(apiRef, gridPageCountSelector)

  return (
    <Pagination
      color='secondary'
      count={pageCount}
      page={page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  )
}

const columns = [
  {
    field: 'name',
    headerName: 'Name',
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    flex: 1,
    cellClassName: 'cell-center',
  },
  {
    field: 'email',
    headerName: 'Email',
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    flex: 1,
    cellClassName: 'cell-center',
  },
  {
    field: 'isValidated',
    headerName: 'Validation Status',
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    flex: 1,
    cellClassName: 'cell-center',
  },
  {
    field: 'joinedDate',
    headerName: 'Joined Date',
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    flex: 1,
    cellClassName: 'cell-center',

    valueGetter: (params) =>
      params.row.createdAt
        ? new Date(params.row.createdAt).toLocaleDateString('de-DE')
        : '',
  },
]

const AdminDashboard = () => {
  const [AdminDashboard, setAdminDashboard] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)

  useEffect(() => {
    const fetchAdminDashboard = async () => {
      try {
        const { data } = await axios.get('/api/users')
        const AdminDashboardWithId = data.map((user) => ({
          ...user,
          id: user._id,
        }))
        setAdminDashboard(AdminDashboardWithId)
      } catch (error) {
        console.error(error)
      }
    }
    fetchAdminDashboard()
  }, [])

  const handleUserValidation = async (userId, isValidated) => {
    try {
      const token = authService.getToken()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }

      const response = await axios.put(
        `/api/users/${userId}`,
        { isValidated },
        config
      )
      console.log('handleUserValidation: response', response)

      setAdminDashboard((prevAdminDashboard) =>
        prevAdminDashboard.map((user) =>
          user.id === userId ? { ...user, isValidated } : user
        )
      )
    } catch (error) {
      console.error('handleUserValidation: error', error)
    }
  }

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h1>Admin Dashboard</h1>

      <h2>User Validation</h2>

      <DataGrid
        components={{
          Toolbar: CustomToolbar,
          Pagination: CustomPagination,
        }}
        rows={AdminDashboard}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        autoHeight
        pagination
        style={{
          width: '100%',
        }}
        sx={{
          boxShadow: 2,
          border: `2px solid`,
          borderColor: '#ad192a',
          '& .MuiDataGrid-cell:hover': {
            color: '#ad192a',
          },
          '& .cell-center': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          },
        }}
        onSelectionModelChange={(newSelection) => {
          const selectedId = newSelection[0]
          const foundUser = AdminDashboard.find(
            (user) => user.id === selectedId
          )

          if (
            foundUser &&
            foundUser.hasOwnProperty('name') &&
            foundUser.hasOwnProperty('isValidated') &&
            foundUser.hasOwnProperty('id')
          ) {
            setSelectedUser(foundUser)
          } else {
            console.error('User not found or user data incomplete:', selectedId)
            setSelectedUser(null)
          }
        }}
      />
      {selectedUser && (
        <div
          style={{
            marginTop: '1rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <h3>Selected User: {selectedUser.name}</h3>
          <button
            style={{
              backgroundColor: '#e4b78f',
              color: 'white',
              border: 'none',
              padding: '5px 10px 5px 10px',
              cursor: 'pointer',
            }}
            onClick={() =>
              handleUserValidation(selectedUser?.id, !selectedUser?.isValidated)
            }
          >
            {selectedUser?.isValidated ? 'Remove Validation' : 'Validate User'}
          </button>
        </div>
      )}
      <AdminRecipeManagement />
    </div>
  )
}

export default AdminDashboard

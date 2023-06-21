import React from 'react'
import AdminTab from '../../components/AdminTab'
import { Header } from '../../components/index';

function AdminLayout({children}) {

  return (
    <div>
        <Header/>
        <AdminTab elements={children}  />
    </div>
  )
}

export default AdminLayout

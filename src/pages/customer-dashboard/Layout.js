import React from 'react'
import { Header, Tab } from '../../components/index';

function Layout({children}) {
  return (
    <div>
      <Header/>
      <Tab element={children} />
    </div>
  )
}

export default Layout
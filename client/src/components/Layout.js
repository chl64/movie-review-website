import { Outlet } from "react-router-dom"

// Type `rafce` and tab to ask the VS-Code extension "ES7+ React/Redux/React-Native snippets"
// to generate the boiler-plate code of a layout component for us.
// rafce: reactArrowFunctionExportComponent.
import React from 'react'

// Include a reference to the outlet component.

const Layout = () => {
  return (
    <main>
        {/* A reference to the "react-router-dom" Outlet component. */}
        <Outlet/>
    </main>
  )
}

export default Layout
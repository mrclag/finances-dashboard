import { Box, CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material"
import { createTheme } from "@mui/material/styles"
import { useMemo, useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { themeSettings } from "./theme"
import Navbar from "@/scenes/navbar"
import Dashboard from "@/scenes/dashboard"
import Predictions from "./scenes/predictions"
import Sidebar from "./components/sidebar"

function App() {
  const theme = useMemo(() => createTheme(themeSettings), [])
  const isMobile = useMediaQuery("(max-width: 600px)")

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box width="100%" height="100%" display={isMobile ? "block" : "flex"}>
            {isMobile ? <Navbar /> : <Sidebar />}
            <Box sx={{ padding: "1rem 2rem 4rem 2rem" }}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/predictions" element={<Predictions />} />
              </Routes>
            </Box>
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App

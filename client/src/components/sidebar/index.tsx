import { Box } from "@mui/material"
import { useTheme } from "@mui/system"
import React, { useState } from "react"
import { Link } from "react-router-dom"
import logo from "../../assets/mlogo.png"
import NavLink from "./NavLink"
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import Toggle from "./Toggle"

type Props = {}

const Sidebar = (props: Props) => {
  const { palette } = useTheme()
  const [open, setOpen] = useState(true)

  return (
    <div
      style={{ height: "100%", position: "relative" }}
      className={open ? "nav-wrapper open" : "nav-wrapper"}
    >
      <div
        style={{
          height: "100vh",
          background: palette.background.light,
          position: "fixed",
          zIndex: "1000",
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
          display: "flex",
          flexDirection: "column",
          color: "white",
          justifyContent: "space-between",
          overflow: "hidden",
        }}
        className={open ? "nav open" : "nav"}
      >
        <div
          className="sidebar-top"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <img
            src={logo}
            style={{
              height: "2rem",
              width: "2rem",
              borderRadius: "50%",
              margin: "1.5rem 1rem 0rem 1rem",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "1rem",
            }}
            className="nav-links"
          >
            <div style={{ padding: "1rem 1rem" }}>Pages</div>
            <NavLink to="/" name="Dashboard" icon="dashboard" />
            <NavLink to="/fitness" name="Fitness" icon="fitness" />
            <NavLink to="/projects" name="Projects" icon="projects" />
          </div>
        </div>
        <Toggle open={open} setOpen={setOpen} />
      </div>
    </div>
  )
}

export default Sidebar

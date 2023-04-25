import React from "react"
import { Link, useLocation } from "react-router-dom"
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter"
import DashboardIcon from "@mui/icons-material/Dashboard"
import BuildIcon from "@mui/icons-material/Build"
import { useTheme } from "@mui/system"

type Props = {
  to: string
  name: string
  icon: any
}

const NavLink = ({ to, name, icon }: Props) => {
  const location = useLocation()
  const { palette } = useTheme()

  const isActive = location.pathname === to

  function getIcon() {
    switch (icon) {
      case "dashboard":
        return <DashboardIcon sx={{ width: "2rem", marginRight: "1rem" }} />
      case "fitness":
        return <FitnessCenterIcon sx={{ width: "2rem", marginRight: "1rem" }} />
      case "projects":
        return <BuildIcon sx={{ width: "2rem", marginRight: "1rem" }} />
      default:
        return <div />
    }
  }

  const Icon = getIcon()

  return (
    <Link to={to}>
      <div
        style={{
          height: "30px",
          fontSize: "14px",
          padding: "1.5rem 1rem",
          alignItems: " center",
          display: "flex",
          color: isActive ? "#333" : "white",
          fontWeight: isActive ? "600" : "300",
          background: isActive ? palette.primary.main : "inherit",
        }}
      >
        {Icon}
        {name}
      </div>
    </Link>
  )
}

export default NavLink

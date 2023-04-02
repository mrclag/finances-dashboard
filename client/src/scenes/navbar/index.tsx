import { useState } from "react"
import { Link } from "react-router-dom"
import { Box, Typography, useTheme } from "@mui/material"
import FlexBetween from "@/components/FlexBetween"
import PixIcon from "@mui/icons-material/Pix"

type Props = {}

const Navbar = (props: Props) => {
  const { palette } = useTheme()
  const [selected, setSelected] = useState("dashboard")
  return (
    <FlexBetween mb="0.25rem" p="0.5rem 0rem" color={palette.grey[300]}>
      {/* LEFT */}
      <FlexBetween gap="0.75rem">
        <PixIcon sx={{ fontSize: "28px" }} />
        <Typography variant="h4" fontSize="16px">
          My Dashboard
        </Typography>
      </FlexBetween>
      {/* RIGHT */}
      <FlexBetween gap="2rem">
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            onClick={() => setSelected("dashboard")}
            to="/"
            style={{
              color: selected === "dashboard" ? "inherit" : palette.grey[700],
              textDecoration: "inherit",
            }}
          >
            Dashboard
          </Link>
        </Box>
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            onClick={() => setSelected("predictions")}
            to="/predictions"
            style={{
              color: selected === "predictions" ? "inherit" : palette.grey[700],
              textDecoration: "inherit",
            }}
          >
            Predictions
          </Link>
        </Box>
      </FlexBetween>
    </FlexBetween>
  )
}

export default Navbar

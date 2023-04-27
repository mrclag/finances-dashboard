import DashboardBox from "@/components/DashboardBox"
import { Box, useMediaQuery, useTheme } from "@mui/material"

type Props = {}

const gridTemplateLargeScreens = `
  "a b c"
  "a b c"
  "a b f"
  "a b f"
  "d e f"
  "d e f"
  "d h f"
  "g h f"
  "g h f"
  "g h f"
`
const gridTemplateSmallScreens = `
  "a"
  "a"
  "a"
  "a"
  "b"
  "b"
  "b"
  "b"
  "c"
  "c"
  "c"
  "d"
  "d"
  "d"
  "e"
  "e"
  "f"
  "f"
  "f"
  "g"
  "g"
  "g"
  "h"
  "h"
  "h"
  "h"
  "i"
  "i"
  "j"
  "j"
`

const Dashboard = (props: Props) => {
  const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)")
  return (
    <Box
      width="100%"
      height="100%"
      display="grid"
      gap="1rem"
      sx={
        isAboveMediumScreens
          ? {
              gridTemplateColumns: "repeat(2, minmax(370px, 1fr))",
              gridTemplateRows: "repeat(10, minmax(60px, 1fr))",
              gridTemplateAreas: gridTemplateLargeScreens,
            }
          : {
              gridAutoColumns: "1fr",
              gridAutoRows: "80px",
              gridTemplateAreas: gridTemplateSmallScreens,
            }
      }
    >
      {/* col 1 */}
      <DashboardBox gridArea="a"></DashboardBox>
      <DashboardBox gridArea="d"></DashboardBox>
      <DashboardBox gridArea="g"></DashboardBox>

      {/* col 2 */}
      <DashboardBox gridArea="b"></DashboardBox>
      <DashboardBox gridArea="e"></DashboardBox>
      <DashboardBox gridArea="h"></DashboardBox>

      {/* col 3 */}
      <DashboardBox gridArea="c"></DashboardBox>
      <DashboardBox gridArea="f"></DashboardBox>

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "#eee",
          textAlign: "center",
          display: "flex",
          border: "1px solid #ccc",
          borderRadius: "8px",
          zIndex: "51",
          fontSize: "16px",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          padding: "20px 30px",
        }}
      >
        <div>In Progress... check out</div>
        <a style={{ color: "blue", marginTop: "8px" }} href="/fitness">
          Fitness
        </a>
        <a style={{ color: "blue", marginTop: "8px" }} href="/projects">
          Projects
        </a>
      </div>
    </Box>
  )
}

export default Dashboard

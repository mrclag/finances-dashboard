import DashboardBox from "@/components/DashboardBox"
import { Box, useMediaQuery, useTheme } from "@mui/material"
import KPISection from "./KPISection"
import PointsByProject from "./PointsByProject"
import TaskDataTable from "./TaskDataTable"

type Props = {}

const gridTemplateLargeScreens = `
  "b b c"
  "b b c"
  "b b f"
  "b b f"
  "e e f"
  "e e f"
  "h h f"
  "h h f"
  "h h f"
  "h h f"
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

const Projects = (props: Props) => {
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
      <DashboardBox gridArea="b">
        <PointsByProject />
      </DashboardBox>
      <DashboardBox gridArea="e">
        <KPISection />
      </DashboardBox>
      <DashboardBox gridArea="h">
        <TaskDataTable />
      </DashboardBox>
      <DashboardBox gridArea="c">
        <KPISection />
      </DashboardBox>
      <DashboardBox gridArea="f">
        <TaskDataTable />
      </DashboardBox>
    </Box>
  )
}

export default Projects

import DashboardBox from "@/components/DashboardBox"
import { Box, useMediaQuery, useTheme } from "@mui/material"
import DailyVsAvg from "./DailyVsAvg"
import SetDataTable from "./SetDataTable"
import SetMaxGraph from "./SetMaxGraph"
import StackedBarBreakdown from "./StackedBarBreakdown"
import TotalSets from "./TotalSets"

type Props = {}

const gridTemplateLargeScreens = `
  "a a c"
  "a a c"
  "a a f"
  "a a f"
  "d d f"
  "d d f"
  "d d f"
  "g g f"
  "g g f"
  "g g f"
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

const Fitness = (props: Props) => {
  const { palette } = useTheme()
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
              gridTemplateColumns: "repeat(3, 1fr)",
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
      <DashboardBox gridArea="g">
        <SetMaxGraph />
      </DashboardBox>
      <DashboardBox gridArea="d">
        <DailyVsAvg />
      </DashboardBox>
      <DashboardBox gridArea="a">
        <StackedBarBreakdown />
      </DashboardBox>
      <DashboardBox gridArea="c">
        <TotalSets />
      </DashboardBox>
      <DashboardBox gridArea="f">
        <SetDataTable />
      </DashboardBox>
    </Box>
  )
}

export default Fitness

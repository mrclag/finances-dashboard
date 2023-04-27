import BoxHeader from "@/components/BoxHeader"
import DashboardBox from "@/components/DashboardBox"
import FlexBetween from "@/components/FlexBetween"
import {
  useGetBacklogQuery,
  useGetHandstandsQuery,
  useGetKpisQuery,
} from "@/state/api"
import { getTotalAndAvgPushups, sortByDate } from "@/utils/pushups"
import { MonitorHeart } from "@mui/icons-material"
import { Box, Typography } from "@mui/material"
import { useTheme } from "@mui/system"
import { DataGrid, GridCellParams } from "@mui/x-data-grid"
import React, { useMemo } from "react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"

type Props = {}

const TotalSets = (props: Props) => {
  const { data } = useGetHandstandsQuery()
  const { palette } = useTheme()
  const pieColors = [
    palette.primary[300],
    palette.secondary[300],
    palette.tertiary[500],
  ]
  const pushups = useMemo(() => {
    if (!data) return []
    return data.filter((d) => d.tags === "Pushup")
  }, [data])

  const pullups = useMemo(() => {
    if (!data) return []
    return data.filter((d) => d.tags === "Pullup")
  }, [data])

  const handstands = useMemo(() => {
    if (!data) return []
    return data.filter((d) => d.tags === "Handstand")
  }, [data])

  const pieData = [
    { name: "Pushup", value: pushups.length },
    { name: "Pullup", value: pullups.length },
    { name: "Handstand", value: handstands.length },
  ]

  return (
    <>
      <BoxHeader title="Total set count" />
      <FlexBetween mt="0.25rem" gap="1.5rem" pr="1rem">
        <PieChart
          width={110}
          height={100}
          margin={{
            top: 0,
            right: -10,
            left: 10,
            bottom: 0,
          }}
        >
          <Pie
            stroke="none"
            data={pieData}
            innerRadius={18}
            outerRadius={38}
            paddingAngle={2}
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={pieColors[index]} />
            ))}
          </Pie>
        </PieChart>
        <Box ml="-0.7rem" flexBasis="40%" textAlign="center">
          <Typography variant="h5">Pushup</Typography>
          <Typography m="0.3rem 0" variant="h3" color={palette.primary[300]}>
            {pushups.length}
          </Typography>
        </Box>
        <Box ml="-0.7rem" flexBasis="40%" textAlign="center">
          <Typography variant="h5">Pullup</Typography>
          <Typography m="0.3rem 0" variant="h3" color={palette.secondary[300]}>
            {pullups.length}
          </Typography>
        </Box>
        <Box ml="-0.7rem" flexBasis="40%" textAlign="center">
          <Typography variant="h5">Handstand</Typography>
          <Typography m="0.3rem 0" variant="h3" color={palette.tertiary[500]}>
            {handstands.length}
          </Typography>
        </Box>
      </FlexBetween>
    </>
  )
}

export default TotalSets

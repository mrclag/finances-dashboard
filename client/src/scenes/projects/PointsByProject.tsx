import BoxHeader from "@/components/BoxHeader"
import DashboardBox from "@/components/DashboardBox"
import FlexBetween from "@/components/FlexBetween"
import {
  useGetBacklogQuery,
  useGetHandstandsQuery,
  useGetKpisQuery,
} from "@/state/api"

import {
  getMaxDailyPushups,
  getTotalAndAvgPushups,
  sortByDate,
} from "@/utils/pushups"
import { MonitorHeart } from "@mui/icons-material"
import { Box, Typography } from "@mui/material"
import { useTheme } from "@mui/system"
import { DataGrid } from "@mui/x-data-grid"
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

const PointsByProject = (props: Props) => {
  const { data } = useGetHandstandsQuery()
  const { data: data2 } = useGetBacklogQuery()

  const { palette } = useTheme()

  const totalAndAvg = useMemo(() => {
    if (!data) return []
    return getTotalAndAvgPushups(data)
  }, [data])

  return (
    <>
      <BoxHeader
        title="Story points completed by Project"
        subtitle="top line represents revenue, bottom line represents expenses"
        sideText="+4%"
      />
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={totalAndAvg}
          margin={{
            top: 20,
            right: 0,
            left: -10,
            bottom: 55,
          }}
        >
          <CartesianGrid vertical={false} stroke={palette.grey[800]} />
          <XAxis dataKey="date" tickLine={false} style={{ fontSize: "10px" }} />
          <YAxis
            yAxisId="left"
            orientation="left"
            tickLine={false}
            axisLine={false}
            style={{ fontSize: "10px" }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tickLine={false}
            axisLine={false}
            style={{ fontSize: "10px" }}
          />
          <Tooltip />
          <Line
            name="Total Pushups"
            yAxisId="left"
            type="monotone"
            dataKey="totalPushups"
            stroke={palette.tertiary[500]}
          />
          <Line
            name="Average Pushups"
            yAxisId="right"
            type="monotone"
            dataKey="avgPushups"
            stroke={palette.primary.main}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  )
}

export default PointsByProject

import BoxHeader from "@/components/BoxHeader"
import { useGetHandstandsQuery } from "@/state/api"
import {
  formatDateLabel,
  getAllDailyTotals,
  getDataForThisWeek,
} from "@/utils/pushups"
import { palette, useTheme } from "@mui/system"
import React, { PureComponent } from "react"
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
]

export default function StackedBarBreakdown() {
  const { data: data2 } = useGetHandstandsQuery()
  const { palette } = useTheme()

  const allValues = getAllDailyTotals(data2)
  const thisweek = getDataForThisWeek(allValues)

  return (
    <>
      <BoxHeader
        title="Total Exercise Volume (This Week)"
        sideText={`${data2?.length} sets, ${allValues.length} days`}
      />
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={thisweek}
          margin={{
            top: 15,
            right: 25,
            left: -10,
            bottom: 45,
          }}
        >
          {/* <CartesianGrid  /> */}
          <XAxis
            dataKey="date"
            tickFormatter={formatDateLabel}
            style={{ fontSize: "10px" }}
          />
          <YAxis />
          <Tooltip />
          {/* <Legend verticalAlign="top" /> */}
          <Bar dataKey="pushups" stackId="a" fill={palette.primary[300]} />
          <Bar dataKey="pullups" stackId="a" fill={palette.secondary[300]} />
          <Bar dataKey="handstands" stackId="a" fill={palette.tertiary[500]} />
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}

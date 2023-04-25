import BoxHeader from "@/components/BoxHeader"
import DashboardBox from "@/components/DashboardBox"
import { useGetHandstandsQuery, useGetKpisQuery } from "@/state/api"
import { MonitorHeart } from "@mui/icons-material"
import { useTheme } from "@mui/system"
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
} from "recharts"

type Props = {}

interface Result {
  date: string
  number: number
  name?: string
}

const Row1 = (props: Props) => {
  const { data } = useGetHandstandsQuery()
  const { palette } = useTheme()
  console.log("data", data)

  const pushupsByDay = useMemo(() => {
    if (!data) return []
    const result = data.reduce((acc: any, curr) => {
      if (curr.date) {
        const date = new Date(curr.date).toISOString().substring(0, 10)
        const newDate = { date, number: curr.number, day: curr.day }
        if (!acc[date]) acc[date] = newDate
        else acc[date].number += curr.number
      }
      return acc
    }, {})

    const sortedResult = Object.values(result).sort((a: any, b: any) => {
      const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
      const dayOfWeekA = daysOfWeek.indexOf(a?.day)
      const dayOfWeekB = daysOfWeek.indexOf(b?.day)
      return dayOfWeekA - dayOfWeekB
    })
    console.log("sorted", sortedResult)

    return sortedResult
  }, [data])

  console.log(pushupsByDay)
  // func

  return (
    <>
      <DashboardBox gridArea="a">
        <BoxHeader
          title="Max Pushups"
          subtitle="By week"
          // sideText="+4%"
        />
        {/* <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={pushupsByDay}
            margin={{
              top: 15,
              right: 25,
              left: -10,
              bottom: 60,
            }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="day"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              tickLine={false}
              axisLine={{ strokeWidth: "0" }}
              style={{ fontSize: "10px" }}
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="number"
              dot={true}
              stroke={palette.primary.main}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
            <Area
              type="monotone"
              dataKey="expenses"
              dot={true}
              stroke={palette.primary.main}
              fillOpacity={1}
              fill="url(#colorExpenses)"
            />
          </AreaChart>
        </ResponsiveContainer> */}
      </DashboardBox>
      <DashboardBox gridArea="b">
        <BoxHeader
          title="Total pushups vs set"
          subtitle="top line represents revenue, bottom line represents expenses"
          sideText="+4%"
        />
        {/* <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={400}
            data={revenueProfit}
            margin={{
              top: 20,
              right: 0,
              left: -10,
              bottom: 55,
            }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="left"
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
            <Legend
              height={20}
              wrapperStyle={{
                margin: "0 0 10px 0",
              }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="profit"
              stroke={palette.tertiary[500]}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="revenue"
              stroke={palette.primary.main}
            />
          </LineChart>
        </ResponsiveContainer> */}
      </DashboardBox>
      <DashboardBox gridArea="c">
        <BoxHeader
          title="Revenue Month by Month"
          subtitle="graph representing the revenue month by month"
          sideText="+4%"
        />
        {/* <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={revenue}
            margin={{
              top: 17,
              right: 15,
              left: -5,
              bottom: 58,
            }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <Tooltip />
            <Bar dataKey="revenue" fill="url(#colorRevenue)" />
          </BarChart>
        </ResponsiveContainer> */}
      </DashboardBox>
    </>
  )
}

export default Row1

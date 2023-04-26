import BoxHeader from "@/components/BoxHeader"
import DashboardBox from "@/components/DashboardBox"
import { useGetHandstandsQuery, useGetKpisQuery } from "@/state/api"
import {
  getMaxDailyPushups,
  getTotalAndAvgPushups,
  sortByDate,
} from "@/utils/pushups"
import { MonitorHeart } from "@mui/icons-material"
import { Box } from "@mui/material"
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
} from "recharts"

type Props = {}

interface Result {
  date: string
  number: number
  name?: string
}

const Col1 = (props: Props) => {
  const { data } = useGetHandstandsQuery()
  const { palette } = useTheme()

  const sortedData = useMemo(() => {
    if (!data) return []
    return sortByDate(data)
  }, [data])

  const totalAndAvg = useMemo(() => {
    if (!data) return []
    return getTotalAndAvgPushups(data)
  }, [data])

  const maxPushupsPerDay = useMemo(() => {
    if (!data) return []
    return getMaxDailyPushups(data)
  }, [data])

  const pushupCols = [
    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },
    {
      field: "number",
      headerName: "Set total",
      flex: 0.5,
    },
  ]

  const formatDateLabel = (dateStr: any) => {
    const date = new Date(dateStr)
    const parts = date.toDateString().split(" ")

    return `${parts[0].slice(0, 2)} ${parseInt(parts[2])}`
  }

  return (
    <>
      <DashboardBox gridArea="a">
        <BoxHeader title="Max Pushups" subtitle="By week" />
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={maxPushupsPerDay}
            margin={{
              top: 15,
              right: 25,
              left: -10,
              bottom: 55,
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
              dataKey="date"
              tickLine={false}
              style={{ fontSize: "10px" }}
              tickFormatter={formatDateLabel}
            />
            <YAxis
              tickLine={false}
              axisLine={{ strokeWidth: "0" }}
              style={{ fontSize: "10px" }}
              // domain={[8000, 23000]}
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="maxPushups"
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
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea="d">
        <BoxHeader title="Daily pushups vs set average" subtitle="Daily" />
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
            <XAxis
              dataKey="date"
              tickLine={false}
              tickFormatter={formatDateLabel}
              style={{ fontSize: "10px" }}
            />
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
      </DashboardBox>
      <DashboardBox gridArea="g">
        <BoxHeader
          title="Pushup sets"
          sideText={`${data?.length} sets, ${totalAndAvg.length} days`}
        />
        <Box
          mt="0.5rem"
          p="0 0.5rem"
          height="75%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={sortedData || []}
            columns={pushupCols}
          />
        </Box>
      </DashboardBox>
    </>
  )
}

export default Col1

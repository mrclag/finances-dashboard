import BoxHeader from "@/components/BoxHeader"
import DashboardBox from "@/components/DashboardBox"
import FlexBetween from "@/components/FlexBetween"
import { useGetHandstandsQuery, useGetKpisQuery } from "@/state/api"
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

interface Result {
  date: string
  number: number
  name?: string
}

const Col2 = (props: Props) => {
  const { data } = useGetHandstandsQuery()
  const { palette } = useTheme()
  const pieColors = [palette.primary[800], palette.primary[300]]

  const sortedData = useMemo(() => {
    if (!data) return []
    return sortByDate(data)
  }, [data])

  const totalAndAvg = useMemo(() => {
    if (!data) return []
    return getTotalAndAvgPushups(data)
  }, [data])

  const pieData = [
    { name: "Group A", value: 600 },
    { name: "Group B", value: 400 },
  ]

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

  return (
    <>
      <DashboardBox gridArea="b">
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
            <XAxis
              dataKey="date"
              tickLine={false}
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
      <DashboardBox gridArea="e">
        <BoxHeader title="Campaigns and Targets" sideText="+4%" />
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
            <Typography variant="h5">Target Sales</Typography>
            <Typography m="0.3rem 0" variant="h3" color={palette.primary[300]}>
              83
            </Typography>
            <Typography variant="h6">
              Finance goals of the campaign that is desired
            </Typography>
          </Box>
          <Box flexBasis="40%">
            <Typography variant="h5">Losses in Revenue</Typography>
            <Typography variant="h6">Losses are down 25%</Typography>
            <Typography mt="0.4rem" variant="h5">
              Profit Margins
            </Typography>
            <Typography variant="h6">
              Margins are up by 30% from last month.
            </Typography>
          </Box>
        </FlexBetween>
      </DashboardBox>
      <DashboardBox gridArea="h">
        <BoxHeader
          title="List of Products"
          sideText={`${data?.length} sets, ${totalAndAvg.length} days`}
        />
        <Box
          mt="1rem"
          p="0 0.5rem"
          height="80%"
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

export default Col2

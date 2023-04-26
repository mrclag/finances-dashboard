import BoxHeader from "@/components/BoxHeader"
import DashboardBox from "@/components/DashboardBox"
import FlexBetween from "@/components/FlexBetween"
import {
  useGetBacklogQuery,
  useGetHandstandsQuery,
  useGetKpisQuery,
} from "@/state/api"
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

const Col3 = (props: Props) => {
  const { data } = useGetHandstandsQuery()
  const { palette } = useTheme()
  const { data: data2 } = useGetBacklogQuery()
  const pieColors = [palette.primary[800], palette.primary[300]]

  const pushupCols = [
    {
      field: "name",
      headerName: "Name",
      flex: 2,
    },
    {
      field: "priority",
      headerName: "Priority",
      flex: 0.5,
    },
    {
      field: "points",
      headerName: "Points",
      flex: 0.5,
    },
    {
      field: "completedDate",
      headerName: "Date",
      flex: 0.6,
    },
  ]

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

  const pieData = [
    { name: "Group A", value: 600 },
    { name: "Group B", value: 400 },
  ]

  // func

  return (
    <>
      {/* <DashboardBox gridArea="a">
        <BoxHeader
          title="Max Pushups"
          subtitle="By week"
          // sideText="+4%"
        />
      </DashboardBox> */}
      <DashboardBox gridArea="c">
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
      <DashboardBox gridArea="f">
        <BoxHeader
          title="Tasks this week"
          sideText={`${data2?.length} tasks`}
        />
        <Box
          mt="1rem"
          p="0 0.5rem"
          height="90%"
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
            rows={data2 || []}
            columns={pushupCols}
          />
        </Box>
      </DashboardBox>
    </>
  )
}

export default Col3

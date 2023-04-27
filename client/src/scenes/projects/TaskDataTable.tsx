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

const TaskDataTable = (props: Props) => {
  const { palette } = useTheme()
  const { data: data2 } = useGetBacklogQuery()

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

  return (
    <>
      <BoxHeader title="Tasks this week" sideText={`${data2?.length} tasks`} />
      <Box
        mt="1rem"
        p="0 0.5rem"
        height="calc(100% - 70px)"
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
    </>
  )
}

export default TaskDataTable

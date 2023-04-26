import BoxHeader from "@/components/BoxHeader"
import { useGetHandstandsQuery } from "@/state/api"
import {
  formatDateLabel,
  getDailyMaxValues,
  getTotalAndAvgPushups,
  sortByDate,
} from "@/utils/pushups"
import { useTheme } from "@mui/system"
import { useMemo } from "react"
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

type Props = {}

const DailyVsAvg = (props: Props) => {
  const { data } = useGetHandstandsQuery()
  const { palette } = useTheme()

  const allDailyValues = useMemo(() => {
    if (!data) return []
    return getDailyMaxValues(data)
  }, [data])

  return (
    <>
      <BoxHeader title="Set Max (All Time)" />
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={allDailyValues}
          margin={{
            top: 20,
            right: 0,
            left: -10,
            bottom: 45,
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
            dataKey="pushups"
            stroke={palette.primary[300]}
          />
          <Line
            name="Total Pushups"
            yAxisId="left"
            type="monotone"
            dataKey="pullups"
            stroke={palette.secondary[300]}
          />
          <Line
            name="Average Pushups"
            yAxisId="right"
            type="monotone"
            dataKey="handstands"
            stroke={palette.tertiary[500]}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  )
}

export default DailyVsAvg

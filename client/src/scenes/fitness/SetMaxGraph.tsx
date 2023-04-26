import BoxHeader from "@/components/BoxHeader"
import { useGetHandstandsQuery } from "@/state/api"
import {
  formatDateLabel,
  getAllDailyTotals,
  getDailyMaxValues,
  getMaxDailyPushups,
} from "@/utils/pushups"
import { useTheme } from "@mui/system"
import { useMemo } from "react"
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

type Props = {}

const MaxSet = (props: Props) => {
  const { data } = useGetHandstandsQuery()
  const { palette } = useTheme()

  const maxPushupsPerDay = useMemo(() => {
    if (!data) return []
    return getMaxDailyPushups(data)
  }, [data])

  const allDailyValues = useMemo(() => {
    if (!data) return []
    return getAllDailyTotals(data)
  }, [data])

  return (
    <>
      <BoxHeader
        title="Variance in Exercises Splits (All Time)"
        subtitle="All recorded data"
      />
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={allDailyValues}
          margin={{
            top: 15,
            right: 25,
            left: -10,
            bottom: 55,
          }}
        >
          <defs>
            <linearGradient id="colorPushups" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="100%"
                stopColor={palette.primary[300]}
                stopOpacity={0.5}
              />
              <stop
                offset="100%"
                stopColor={palette.primary[300]}
                stopOpacity={0}
              />
            </linearGradient>
            <linearGradient id="colorPullups" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="100%"
                stopColor={palette.secondary[300]}
                stopOpacity={0.5}
              />
              <stop
                offset="100%"
                stopColor={palette.secondary[300]}
                stopOpacity={0}
              />
            </linearGradient>
            <linearGradient id="colorHandstands" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="100%"
                stopColor={palette.tertiary[500]}
                stopOpacity={0.5}
              />
              <stop
                offset="100%"
                stopColor={palette.tertiary[500]}
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
            dataKey="pushups"
            stackId="1"
            dot={true}
            stroke={palette.primary.main}
            fillOpacity={1}
            fill="url(#colorPushups)"
          />
          <Area
            type="monotone"
            stackId="1"
            dataKey="pullups"
            dot={true}
            stroke={palette.secondary[300]}
            fillOpacity={1}
            fill="url(#colorPullups)"
          />
          <Area
            stackId="1"
            type="monotone"
            dataKey="handstands"
            dot={true}
            stroke={palette.tertiary[500]}
            fillOpacity={1}
            fill="url(#colorHandstands)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  )
}

export default MaxSet

import { GetHandstandsResponse } from "@/state/types"

export const getMaxDailyPushups = (data: GetHandstandsResponse[]) => {
  const dailyData = getDailyValues(data)

  const maxPushupsPerDay = []
  for (const [date, pushups] of dailyData) {
    const maxPushups = Math.max(...pushups)
    maxPushupsPerDay.push({
      date: date,
      maxPushups: maxPushups,
    })
  }
  return sortByDate(maxPushupsPerDay)
}

export const getDailyValues = (data: any): Map<string, number[]> => {
  const dailyData = new Map()
  for (const d of data) {
    if (!d.date) continue
    if (!dailyData.has(d.date)) dailyData.set(d.date, [])
    dailyData.get(d.date).push(d.number)
  }
  return dailyData
}

interface DateData {
  date: string | undefined
  [key: string]: any
}

export const sortByDate = (data: DateData[] | undefined, dir = "asc") => {
  if (!data) return []
  const rowsWithDates = removeEmptyValues(data)
  if (dir === "asc")
    return rowsWithDates.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    )
  else
    return rowsWithDates.sort(
      (b, a) => new Date(a.date).getTime() - new Date(b.date).getTime()
    )
}

export const getTotalAndAvgPushups = (
  data: GetHandstandsResponse[] | undefined
) => {
  const dailyData = getDailyValues(data)

  const totalAndAvg = []

  for (const [date, pushups] of dailyData) {
    const totalPushups = pushups.reduce((a, b) => a + b, 0)
    const avgPushups = totalPushups / pushups.length
    totalAndAvg.push({ date, totalPushups, avgPushups })
  }
  return sortByDate(totalAndAvg)
}

export const removeEmptyValues = (data: any[]) => {
  if (!data) return []
  return data.filter((d) => !!d.date)
}

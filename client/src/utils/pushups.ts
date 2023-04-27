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

// Get daily values for just handstands
export const getDailyValues = (data: any): Map<string, number[]> => {
  const dailyData = new Map()
  for (const d of data) {
    if (!d.date) continue
    if (!dailyData.has(d.date)) dailyData.set(d.date, [])
    dailyData.get(d.date).push(d.number)
  }
  return dailyData
}

export const getAllDailyValues = (data: any) => {
  const dailyData = new Map()
  for (const d of data) {
    if (!d.date) continue

    // Extract the exercise type and number of reps
    const exerciseType = d.tags.toLowerCase()
    const reps = d.number

    // If this date is not yet in the dailyData Map, add it
    if (!dailyData.has(d.date)) {
      dailyData.set(d.date, {
        handstands: [],
        pushups: [],
        pullups: [],
      })
    }

    // Add the reps to the appropriate exercise type for this date
    const dailyValues = dailyData.get(d.date)
    if (exerciseType === "handstand") {
      dailyValues.handstands.push(reps)
    } else if (exerciseType === "pushup") {
      dailyValues.pushups.push(reps)
    } else if (exerciseType === "pullup") {
      dailyValues.pullups.push(reps)
    }
  }
  return dailyData
}

export function getAllDailyTotals(data: any) {
  if (!data) return []
  const result = []

  // Iterate over the data
  for (let i = 0; i < data.length; i++) {
    const item = data[i]

    // Extract the date and type of exercise
    const date = item.date
    const exerciseType = item.tags.toLowerCase()

    // Check if an object with this date already exists in the result array
    let obj: any = result.find((o) => o.date === date)

    // If not, create a new object and add it to the result array
    if (!obj) {
      obj = {
        date: date,
        handstands: 0,
        pushups: 0,
        pullups: 0,
      }
      result.push(obj)
    }

    // Increment the count for the appropriate exercise type
    if (exerciseType === "handstand") {
      obj.handstands += item.number
    } else if (exerciseType === "pushup") {
      obj.pushups += item.number
    } else if (exerciseType === "pullup") {
      obj.pullups += item.number
    }
  }

  return result
}
export function getDailyMaxValues(data: any) {
  if (!data) return []

  const result = []
  const sortedData = sortByDate(data)

  let maxPushups = 0
  let maxPullups = 0
  let maxHandstands = 0

  // Iterate over the data
  for (let i = 0; i < sortedData.length; i++) {
    const record = sortedData[i]
    const date = record.date
    const dailyNumber = record.number
    const exerciseType = record.tags.toLowerCase()

    // Check if an object with this date already exists in the result array
    let dailyMaxes: any = result.find((o) => o.date === date)

    // If not, create a new dailyMaxesect and add it to the result array
    if (!dailyMaxes) {
      dailyMaxes = {
        date: date,
        handstands: maxHandstands,
        pushups: maxPushups,
        pullups: maxPullups,
      }
      result.push(dailyMaxes)
    }

    // Increment the count for the appropriate exercise type
    if (exerciseType === "handstand") {
      const dailyMax = Math.max(dailyNumber, dailyMaxes.handstands)
      dailyMaxes.handstands = dailyMax
      maxHandstands = dailyMax
    } else if (exerciseType === "pushup") {
      const dailyMax = Math.max(dailyNumber, dailyMaxes.pushups)
      dailyMaxes.pushups = dailyMax
      maxPushups = dailyMax
    } else if (exerciseType === "pullup") {
      const dailyMax = Math.max(dailyNumber, dailyMaxes.pullups)
      dailyMaxes.pullups = dailyMax
      maxPullups = dailyMax
    }
  }
  console.log(result)
  return result
}

interface DateData {
  date: string | undefined
  [key: string]: any
}

export const sortByDate = (
  data: DateData[] | undefined,
  dir = "asc",
  field = "date"
) => {
  if (!data) return []
  const rowsWithDates = removeEmptyValues(data)
  if (dir === "asc")
    return rowsWithDates.sort(
      (a, b) => new Date(a[field]).getTime() - new Date(b[field]).getTime()
    )
  else
    return rowsWithDates.sort(
      (b, a) => new Date(a[field]).getTime() - new Date(b[field]).getTime()
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

export const formatDateLabel = (dateStr: any) => {
  const date = new Date(dateStr + " ")
  const parts = date.toDateString().split(" ")
  return `${parts[0].slice(0, 3)} ${parts[1]} ${parseInt(parts[2])} `
}

export function getDataForThisWeek(data: any) {
  const today = new Date()
  const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay())) // Sunday
  const endOfWeek = new Date(today.setDate(today.getDate() + 6)) // Saturday

  const result = []

  // Iterate over each day of the week
  let currentDate = new Date(startOfWeek)
  while (currentDate <= endOfWeek) {
    const dateString = currentDate.toISOString().slice(0, 10)
    let obj = data.find((o: any) => o.date === dateString)

    // If no data exists for this date, add a new object with all values set to 0
    if (!obj) {
      obj = {
        date: dateString,
        handstands: 0,
        pushups: 0,
        pullups: 0,
      }
    }

    result.push(obj)
    currentDate.setDate(currentDate.getDate() + 1)
  }
  console.log("RESULT", result)

  return result
}

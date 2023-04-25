import dotenv from "dotenv"
import express from "express"
import { Client } from "@notionhq/client"
dotenv.config()

const router = express.Router()
const notion = new Client({ auth: process.env.NOTION_API_KEY })

router.get("/handstands", async (req, res) => {
  try {
    const products = await getHandstandDB(process.env.NOTION_DATABASE_ID)
    const newObj = products.map(fromNotionObject)
    res.status(200).json(newObj)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
})

router.get("/backlog", async (req, res) => {
  try {
    const backlog = await getBacklogDB(process.env.NOTION_BACKLOG_ID)
    // console.log(backlog)
    const newObj = backlog.map(fromNotionBacklogObject)
    res.status(200).json(newObj)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
})

export default router

export async function getHandstandDB() {
  const notionPages = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,

    // sorts: [{ property: process.env.NOTION_VOTES_ID, direction: "descending" }],
  })
  return notionPages.results
}
export async function getBacklogDB() {
  const notionPages = await notion.databases.query({
    database_id: process.env.NOTION_BACKLOG_ID,
    filter: {
      property: "Status",
      select: {
        equals: "Done",
      },
    },
    // sorts: [{ property: process.env.NOTION_VOTES_ID, direction: "descending" }],
  })
  return notionPages.results
}

function fromNotionObject(notionPage) {
  const {
    Date: date,
    Day: day,
    Name: name,
    Number: number,
    Tags: tags,
  } = notionPage.properties

  return {
    id: notionPage.id,
    day: day.formula?.string,
    date: date.date?.start,
    number: number.number,
    tags: tags.select?.name,
    name: name.title[0]?.plain_text,
  }
}

function fromNotionBacklogObject(notionPage) {
  const {
    Task: task,
    Completed: completed,
    Priority: priority,
    Points: points,
    Type: type,
    Status: status,
  } = notionPage.properties
  const estTime = notionPage.properties["Est. Time"]

  // console.log(estTime)
  // console.log(notionPage.properties.completed)
  // console.log("completed", completed?.date?.start)

  return {
    id: notionPage.id,
    name: task.title[0]?.plain_text,
    completedDate: completed?.date?.start,
    points: Number(points.select?.name),
    estTime: estTime.select?.name,
    priority: priority.select?.name,
    type: type.select?.name,
    status: status.select?.name,
  }
}

import dotenv from "dotenv"
import express from "express"
import { Client } from "@notionhq/client"
dotenv.config()

const router = express.Router()
const notion = new Client({ auth: process.env.NOTION_API_KEY })

router.get("/handstands", async (req, res) => {
  try {
    const products = await getDB()
    console.log(products)
    const newObj = products.map(fromNotionObject)
    console.log("new", newObj)
    res.status(200).json(newObj)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
})

export default router

function notionPropertiesById(properties) {
  return Object.values(properties).reduce((obj, property) => {
    const { id, ...rest } = property
    return { ...obj, [id]: rest }
  }, {})
}

export async function getDB() {
  const notionPages = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    // sorts: [{ property: process.env.NOTION_VOTES_ID, direction: "descending" }],
  })
  return notionPages.results

  // return notionPages.results.map(fromNotionObject)
}

function fromNotionObject(notionPage) {
  console.log("page", notionPage)
  const { Date, Day, Name, Number, Tags } = notionPage.properties
  console.log(Tags)

  return {
    id: notionPage.id,
    day: Day.formula?.string,
    date: Date.date?.start,
    number: Number.number,
    tags: Tags.select?.name,
    name: Name.title[0]?.plain_text,
  }
}

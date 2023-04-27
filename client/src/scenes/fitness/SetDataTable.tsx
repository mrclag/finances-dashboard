import BoxHeader from "@/components/BoxHeader"
import { useGetHandstandsQuery } from "@/state/api"
import {
  formatDateLabel,
  getTotalAndAvgPushups,
  sortByDate,
} from "@/utils/pushups"
import { Box } from "@mui/material"
import { useTheme } from "@mui/system"
import {
  DataGrid,
  GridCellParams,
  GridRenderCellParams,
} from "@mui/x-data-grid"
import {
  DataGridPremium,
  useGridApiRef,
  useKeepGroupedColumnsHidden,
} from "@mui/x-data-grid-premium"
import { useMemo } from "react"

type Props = {}

const tagStyles = {
  borderRadius: "5px",
  padding: "1px 5px",
  border: "1px solid black",
  color: "black",
}

const SetDataTable = (props: Props) => {
  const { data } = useGetHandstandsQuery()
  const { palette } = useTheme()

  const tagColors = {
    Pushup: palette.primary[300],
    Pullup: palette.secondary[300],
    Handstand: palette.tertiary[500],
  }

  const sortedData = useMemo(() => {
    if (!data) return []
    return sortByDate(data, "desc")
  }, [data])

  const totalAndAvg = useMemo(() => {
    if (!data) return []
    return getTotalAndAvgPushups(data)
  }, [data])

  const pushupCols = [
    {
      field: "date",
      headerName: "Date",
      flex: 0.5,
      renderCell: (date: GridRenderCellParams) => {
        return `${formatDateLabel(date.value)}`
      },
    },
    {
      field: "tags",
      headerName: "Type",
      flex: 0.5,
      renderCell: (tag: GridRenderCellParams) => {
        if (!tag.value) return ""
        return (
          // @ts-ignore
          <div style={{ ...tagStyles, background: tagColors[tag.value] }}>
            {tag.value}
          </div>
        )
      },
    },
    {
      field: "number",
      headerName: "Set total",
      flex: 0.5,
      renderCell: (num: GridRenderCellParams) => {
        num.value && console.log(num)
        if (num.value) {
          if (num.row.tags === "Handstand") return num.value + " sec"
          else return num.value + " reps"
        } else return ""
      },
    },
    {
      field: "name",
      headerName: "Notes",
      flex: 1,
    },
  ]

  const apiRef = useGridApiRef()

  const initialState = useKeepGroupedColumnsHidden({
    apiRef,
    initialState: {
      rowGrouping: {
        model: ["date"],
      },
    },
  })

  return (
    <>
      <BoxHeader
        title="Recorded Sets"
        sideText={`${data?.length} sets, ${totalAndAvg.length} days`}
      />
      <Box
        mt="0.5rem"
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
        <DataGridPremium
          columnHeaderHeight={25}
          rowHeight={35}
          apiRef={apiRef}
          hideFooter={true}
          rows={sortedData || []}
          columns={pushupCols}
          initialState={initialState}
          defaultGroupingExpansionDepth={-1}
        />
      </Box>
    </>
  )
}

export default SetDataTable

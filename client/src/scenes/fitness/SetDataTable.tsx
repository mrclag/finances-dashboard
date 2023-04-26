import BoxHeader from "@/components/BoxHeader"
import { useGetHandstandsQuery } from "@/state/api"
import { getTotalAndAvgPushups, sortByDate } from "@/utils/pushups"
import { Box } from "@mui/material"
import { useTheme } from "@mui/system"
import { DataGrid } from "@mui/x-data-grid"
import { useMemo } from "react"

type Props = {}

const SetDataTable = (props: Props) => {
  const { data } = useGetHandstandsQuery()
  const { palette } = useTheme()

  const sortedData = useMemo(() => {
    if (!data) return []
    return sortByDate(data)
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
    },
    {
      field: "tags",
      headerName: "Type",
      flex: 0.5,
    },
    {
      field: "number",
      headerName: "Set total",
      flex: 0.5,
    },
    {
      field: "name",
      headerName: "Notes",
      flex: 1,
    },
  ]

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
        <DataGrid
          columnHeaderHeight={25}
          rowHeight={35}
          hideFooter={true}
          rows={sortedData || []}
          columns={pushupCols}
        />
      </Box>
    </>
  )
}

export default SetDataTable

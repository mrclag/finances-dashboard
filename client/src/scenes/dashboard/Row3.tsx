import BoxHeader from "@/components/BoxHeader"
import DashboardBox from "@/components/DashboardBox"
import { useGetKpisQuery, useGetTransactionsQuery } from "@/state/api"
import { Palette } from "@mui/icons-material"
import { useTheme } from "@mui/material"
import { Box } from "@mui/system"
import { DataGrid, GridCellParams } from "@mui/x-data-grid"
import React, { useMemo } from "react"

type Props = {}

const Row3 = (props: Props) => {
  const { data: productData } = useGetTransactionsQuery()
  const { data: transactionData } = useGetTransactionsQuery()
  const { data: kpiData } = useGetKpisQuery()
  const { palette } = useTheme()

  console.log(productData)
  console.log(kpiData)

  const productColumns = [
    {
      field: "_id",
      headerName: "id",
      flex: 1,
    },
    {
      field: "expense",
      headerName: "Expense",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
  ]

  return (
    <>
      <DashboardBox gridArea="g">
        <BoxHeader
          title="List of Products"
          sideText={`${productData?.length} products`}
        />
        <Box
          mt="0.5rem"
          p="0 0.5rem"
          height="75%"
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
            rows={productData || []}
            columns={productColumns}
          />
        </Box>
      </DashboardBox>
      <DashboardBox gridArea="h"></DashboardBox>
      <DashboardBox gridArea="i"></DashboardBox>
      <DashboardBox gridArea="j"></DashboardBox>
    </>
  )
}

export default Row3

import React from "react"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
}

const Toggle = ({ open, setOpen }: Props) => {
  return (
    <button
      onClick={() => setOpen(!open)}
      style={{
        width: "32px",
        height: "32px",
        // position: "absolute",
        background: "#aaa",
        outline: "none",
        border: "1px solid #ccc",
        borderRadius: "50%",
        zIndex: "1001",
        bottom: "20px",
        color: "black",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        margin: "2rem auto",
      }}
    >
      {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
    </button>
  )
}

export default Toggle

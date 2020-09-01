import React from "react";

export function DataCard(props) {
  let color = props.color;
  if (color === undefined) {
    color = "black";
  }

  return (
    <div onClick={() => props.onSelect()}>
      <div style={{paddingBottom: "10px"}}>{props.title}</div>
      <h5 className="font-weight-bold" style={{fontSize: "1em"}}>{props.data}</h5>
      <h6 className="font-weight-bold" style={{color: color}}>{props.secData}</h6>
    </div>
  )
}


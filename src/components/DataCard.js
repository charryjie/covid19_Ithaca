
import React from "react";

export function DataCard(props) {
  let color = props.color;
  if (color === undefined) {
    color = "black";
  }

  return (
    <div>
      <div style={{paddingBottom: "10px"}}>{props.title}</div>
      {props.idx === -1 ? <h3 className="font-weight-bold" style={{color: color}}>{props.data}</h3>
      : <div className="font-weight-bold" style={{color: color}}>{props.data}</div>}
    </div>
  )
}

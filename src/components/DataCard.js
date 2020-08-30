
import React from "react";

export function DataCard(props) {
  let color = props.color;
  if (color === undefined) {
    color = "black";
  }

  return (
    <div>
      <div style={{paddingBottom: "20px"}}>{props.title}</div>
      {props.idx === -1 ? <h5 className="font-weight-bold" style={{color: color}}>{props.data}</h5>
      : <div className="font-weight-bold" style={{color: color}}>{props.data}</div>}
    </div>
  )
}

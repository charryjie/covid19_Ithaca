
import React from "react";

export function DataCard(props) {
  let color = props.color;
  if (color === undefined) {
    color = "black";
  }

  return (
    <div>
      <div>{props.title}</div>
      <h3 className="font-weight-bold" style={{color: color}}>{props.data}</h3>
    </div>
  )
}
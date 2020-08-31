import React, { useState } from "react";

import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Table,
    Button,
} from "reactstrap";

import { useSelector } from 'react-redux';
import { selectAllData } from '../reducer';

export function PaginateTable(props) {

    const [startIdx, setStartIdx] = useState(0);
    const data = useSelector(selectAllData);

    let paginateBackward = () => {
      if(startIdx - 20 >= 0) {
        setStartIdx(startIdx-20);
      }
    }
  
    let paginateForward = () => {
      if(startIdx + 20 < data.length) {
        setStartIdx(startIdx+20);
      }
    }
  
    let thead = ["日期", "总检测", "新增检测", "待定结果", "总确诊", "治愈", "住院", "死亡", "当日新增", "现存确诊"];
    let tbody = data.map((prop, key) => {
        return (
          <tr key={key}>
            <td className="text-left">
              {prop.date.toString().substring(5, 10)}
            </td>
            <td className="text-left">
              {prop.total_test}
            </td>
            <td className="text-left">
              {
                (prop.new_test === undefined)
                  ? "无数据"
                  : prop.new_test
              }
            </td>
            <td className="text-left">
              {prop.pending_result}
            </td>
            <td className="text-left">
              {prop.positive}
            </td>
            <td className="text-left">
              {prop.recovered}
            </td>
            <td className="text-left">
              {prop.hospitalization}
            </td>
            <td className="text-left">
              {prop.death}
            </td>
            <td className="text-left">
              {prop.new_positive}
            </td>
            <td className="text-left">
              {prop.total_active}
            </td>
          </tr>
        );
      })
        
    return (
        <Card>

            <CardHeader>
                <CardTitle tag="h4">{props.title}</CardTitle>
            </CardHeader>

            <CardBody>
              <Table responsive style={{minWidth: "1000px"}}>
                <thead className="text-primary">
                  <tr>
                      {thead.map((prop, key) => {
                      return <th key={key}>{prop}</th>;
                      })}
                  </tr>
                </thead>
                <tbody>
                  {tbody.reverse().slice(startIdx, startIdx+20)}
                </tbody>
              </Table>
            </CardBody>

            <CardFooter className="text-center">
        
                <Button onClick={paginateBackward} style={{marginRight: "30px"}}>
                    上一页
                </Button>
                    
                <Button onClick={paginateForward}>
                    下一页
                </Button>
                    
                
            </CardFooter>

        </Card>
    )
    
}
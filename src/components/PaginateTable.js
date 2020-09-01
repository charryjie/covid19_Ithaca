import React, { useState } from "react";
import { Trans, useTranslation } from "react-i18next";
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
    const { t } = useTranslation();
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
  
    let thead = [t("Date"), t("Total Tested"), t("New Tested"), t("Pending Result"), t("Positive"), t("Recovered"), t("Hospitalization"), t("Death"), t("New Positive"), t("Total Active")];
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
                <CardTitle tag="h4"><Trans>{props.title}</Trans></CardTitle>
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
                    <Trans>Last Page</Trans>
                </Button>
                    
                <Button onClick={paginateForward}>
                    <Trans>Next Page</Trans>
                </Button>
                    
                
            </CardFooter>

        </Card>
    )
    
}
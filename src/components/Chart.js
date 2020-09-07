import React from "react"
import { LineChart, BarChart } from './ChartBasic'
import { useSelector } from 'react-redux';
import { selectDayChange, selectCard } from '../reducer'
import { Row, Col } from "reactstrap";
import { dataGen} from'../data/ChartData'
import { useTranslation } from "react-i18next";

export function Chart() {
  const { t } = useTranslation();
  const dayChange = useSelector(selectDayChange);
  const selectedCard = useSelector(selectCard);

  const chartArr = [
    <LineChart title={t("Positive")} data={ dataGen(dayChange.date, [{ data: dayChange.day_sum, label: t("Positive"), color: "#FFA500"}])} />,
    <LineChart title={t("Total Active")} data={ dataGen(dayChange.date, [{ data: dayChange.day_active, label: t("Total Active"), color: "#D8BFD8"}])} />,
    <LineChart title={t("Active Hospitalization")} data={ dataGen(dayChange.date, [{ data: dayChange.day_hospitalization, label: t("Active Hospitalization"), color: "#BC8F8F"}])} />,
    <LineChart title={t("Total Tested")} data={ dataGen(dayChange.date, [{ data: dayChange.day_test, label: "Total Tested", color: "#FFA07A"}])} />,
    <LineChart title={t("recovered")} data={ dataGen(dayChange.date, [{ data: dayChange.day_recovered, label: "recovered", color: "#18ce0f"}])} />,
    <LineChart title={t("death")} data={ dataGen(dayChange.date, [{ data: dayChange.day_death, label: "death", color: "#778899"}])} />
  ]
  
  return (
      <Row>
        <Col xs={12}>
          {chartArr[selectedCard]}
        </Col>

        <Col xs={12} md={4}>
          {chartArr[selectedCard === 0 ? 3 : 0]}
        </Col>
        
        <Col xs={12} md={4}>
          <BarChart title={t("New Positive")} data={ dataGen(dayChange.date, [
            { data: dayChange.day_increase, label: t("New Positive"), color: "#2CA8FF"},
            { data: dayChange.seven_avg, label: t("Seven Average"), type: "line", color: "#f96332"}
            ])}></BarChart>
        </Col>
        
        <Col xs={12} md={4}>
          {chartArr[selectedCard === 1 ? 4 : 1]}
        </Col>
        
      </Row>
  )
}
import React from "react"
import { LineChart, BarChart } from './ChartBasic'
import { useSelector } from 'react-redux';
import { selectDayChange } from '../reducer'
import { Row, Col } from "reactstrap";
import { dataGen} from'../data/ChartData'
import { chartConfigure } from './ChartBasic'

export function Chart() {
    const dayChange = useSelector(selectDayChange);

    return (
        <Row>
          <Col xs={12} md={4}>
            <LineChart title="累计确诊" data={ dataGen(dayChange.date, [{ data: dayChange.day_sum, label: "确诊人数", color: "#18ce0f"}])} options={ chartConfigure } />
          </Col>
          
          <Col xs={12} md={4}>
            <BarChart title="每日新增" data={ dataGen(dayChange.date, [
              { data: dayChange.day_increase, label: "每日新增", color: "#2CA8FF"},
              { data: dayChange.seven_avg, label: "七日平均", type: "line", color: "#f96332"}
              ])} options={chartConfigure}></BarChart>
          </Col>
          
          <Col xs={12} md={4}>
            <LineChart title="现存确诊" data={ dataGen(dayChange.date, [{ data: dayChange.day_active, label: "现存确诊", color: "#D8BFD8"}])}options={ chartConfigure } />
          </Col>
          
        </Row>
    )
}
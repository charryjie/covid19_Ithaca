import React from "react"
import { LineChart, BarChart } from './ChartBasic'
import { useSelector } from 'react-redux';
import { selectDayChange, selectCard } from '../reducer'
import { Row, Col } from "reactstrap";
import { dataGen} from'../data/ChartData'


export function Chart() {
    const dayChange = useSelector(selectDayChange);
    const selectedCard = useSelector(selectCard);

    const chartArr = [
      <LineChart title="总确诊" data={ dataGen(dayChange.date, [{ data: dayChange.day_sum, label: "确诊人数", color: "#FFA500"}])} />,
      <LineChart title="现存确诊" data={ dataGen(dayChange.date, [{ data: dayChange.day_active, label: "现存确诊", color: "#D8BFD8"}])} />,
      <LineChart title="住院人数" data={ dataGen(dayChange.date, [{ data: dayChange.day_hospitalization, label: "住院人数", color: "#BC8F8F"}])} />,
      <LineChart title="总检测" data={ dataGen(dayChange.date, [{ data: dayChange.day_test, label: "检测人数", color: "#FFA07A"}])} />,
      <LineChart title="康复人数" data={ dataGen(dayChange.date, [{ data: dayChange.day_recovered, label: "康复人数", color: "#18ce0f"}])} />,
      <LineChart title="死亡人数" data={ dataGen(dayChange.date, [{ data: dayChange.day_death, label: "死亡人数", color: "#778899"}])} />
    ]
    
    return (
        <Row>
          <Col xs={12}>
            {chartArr[selectedCard]}
          </Col>

          <Col xs={12} md={4}>
            {chartArr[selectedCard === 0 ? 0 : 0]}
          </Col>
          
          <Col xs={12} md={4}>
            <BarChart title="每日新增" data={ dataGen(dayChange.date, [
              { data: dayChange.day_increase, label: "每日新增", color: "#2CA8FF"},
              { data: dayChange.seven_avg, label: "七日平均", type: "line", color: "#f96332"}
              ])}></BarChart>
          </Col>
          
          <Col xs={12} md={4}>
            {chartArr[selectedCard === 1 ? 1 : 1]}
          </Col>
          
        </Row>
    )
}
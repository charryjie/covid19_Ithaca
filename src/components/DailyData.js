import React from "react"
import {
    Card,
    CardBody,
    Row,
    Col,
  } from "reactstrap";
import { DataCard } from './DataCard'
import { useSelector } from 'react-redux';
import { selectNewDay, selectTotal, selectCardStyle } from '../reducer'

export function DailyData() {
    const newDay = useSelector(selectNewDay);
    const total = useSelector(selectTotal);
    const cardStyle = useSelector(selectCardStyle);


    return (
        <Row style={{ position: "sticky", top: 0, zIndex: 999}} >
            <Col xs={12} md={6}>
                <Card className="card-chart" style={cardStyle}>
                    <CardBody>
                        <Row>
                            <Col className="text-center" xs={4} style={{borderRight: "1px solid grey"}}>
                                <DataCard
                                    title={"总确诊"} 
                                    data={total.positive}
                                    secData={(newDay.new_positive >= 0 ? '+' : '') + newDay.new_positive}
                                    color={newDay.new_positive <= 0 ? "green": "red"}
                                />
                            </Col>
                            <Col className="text-center" xs={4} style={{borderRight: "1px solid grey"}}>
                                <DataCard
                                    title={"现存"} 
                                    data={total.total_active}
                                    secData={(newDay.new_totalactive >= 0 ? '+' : '') + newDay.new_totalactive}
                                    color={newDay.new_totalactive <= 0 ? "green": "red"}
                                />
                            </Col>
                            <Col className="text-center" xs={4} >
                                <DataCard
                                    title={"住院"} 
                                    data={total.hospitalization}
                                    secData={(newDay.new_hospitalization >= 0 ? '+' : '') + newDay.new_hospitalization}
                                    color={newDay.new_hospitalization <= 0 ? "green": "red"}
                                />
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
            <Col xs={12} md={6}>
                <Card className="card-chart" style={cardStyle}>
                    <CardBody>
                        <Row>
                            <Col className="text-center" xs={4} style={{borderRight: "1px solid grey"}}>
                            
                            <DataCard
                                title={"总检测"} 
                                data={total.total_test}
                                secData={"阳性率: " + total.positive_ratio + "%"}
                            />
                            </Col>
                            <Col className="text-center" xs={4} style={{borderRight: "1px solid grey"}}>
                                <DataCard
                                    title={"康复"} 
                                    data={total.recovered}
                                    secData={"康复率: " + total.recover_ratio + "%"}
                                />
                            </Col>
                            <Col className="text-center" xs={4}>
                                <DataCard
                                    title={"死亡"} 
                                    data={total.death}
                                    secData={"阳性率: " + total.death_ratio + "%"}
                                />
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    )
}
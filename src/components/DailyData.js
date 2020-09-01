import React from "react"
import {
    Card,
    CardBody,
    Row,
    Col,
  } from "reactstrap";
import { DataCard } from './DataCard'
import { useSelector, useDispatch } from 'react-redux';
import { selectAllData, selectIdx, updateCard, selectCurrentChange } from '../reducer'

export function DailyData() {
    const dispatch = useDispatch();
    const allData = useSelector(selectAllData);
    const selectedIdx = useSelector(selectIdx);
    const changes = useSelector(selectCurrentChange);

    return (
        <Row>
            <Col xs={12} md={6}>
                <Card className="card-chart">
                    <CardBody>
                        <Row>
                            <Col className="text-center" xs={4} style={{borderRight: "1px solid grey"}}>
                                <DataCard
                                    title={"总确诊"} 
                                    data={allData[selectedIdx].positive}
                                    secData={(allData[selectedIdx].new_positive >= 0 ? '+' : '') + allData[selectedIdx].new_positive}
                                    color={allData[selectedIdx].new_positive <= 0 ? "green": "red"}
                                    onSelect={()=> dispatch(updateCard(0))}
                                />
                            </Col>
                            <Col className="text-center" xs={4} style={{borderRight: "1px solid grey"}}>
                                <DataCard
                                    title={"现存"} 
                                    data={allData[selectedIdx].total_active}
                                    secData={(changes.active >= 0 ? '+' : '') + changes.active}
                                    color={changes.active <= 0 ? "green": "red"}
                                    onSelect={()=> dispatch(updateCard(1))}
                                />
                            </Col>
                            <Col className="text-center" xs={4} >
                                <DataCard
                                    title={"住院"} 
                                    data={allData[selectedIdx].hospitalization}
                                    secData={(changes.hospitalization >= 0 ? '+' : '') + changes.hospitalization}
                                    color={changes.hospitalization <= 0 ? "green": "red"}
                                    onSelect={()=> dispatch(updateCard(2))}
                                />
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
            <Col xs={12} md={6}>
                <Card className="card-chart">
                    <CardBody>
                        <Row>
                            <Col className="text-center" xs={4} style={{borderRight: "1px solid grey"}}>
                                <DataCard
                                    title={"总检测"} 
                                    data={allData[selectedIdx].total_test}
                                    // secData={"阳性率: " + total.positive_ratio + "%"}
                                    onSelect={()=> dispatch(updateCard(3))}
                                />
                            </Col>
                            <Col className="text-center" xs={4} style={{borderRight: "1px solid grey"}}>
                                <DataCard
                                    title={"康复"} 
                                    data={allData[selectedIdx].recovered}
                                    // secData={"康复率: " + total.recover_ratio + "%"}
                                    onSelect={()=> dispatch(updateCard(4))}
                                />
                            </Col>
                            <Col className="text-center" xs={4}>
                                <DataCard
                                    title={"死亡"} 
                                    data={allData[selectedIdx].death}
                                    // secData={"死亡率: " + total.death_ratio + "%"}
                                    onSelect={()=> dispatch(updateCard(5))}
                                />
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    )
}
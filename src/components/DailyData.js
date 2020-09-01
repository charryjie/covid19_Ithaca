import React from "react"
import { Trans, useTranslation } from "react-i18next";
import {
    Card,
    CardBody,
    Row,
    Col,
    Button
  } from "reactstrap";
import { DataCard } from './DataCard'
import { useSelector, useDispatch } from 'react-redux';
import { selectAllData, selectIdx, updateCard, selectCurrentChange, selectDayChange, updateIdx } from '../reducer'

export function DailyData() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const allData = useSelector(selectAllData);
    const selectedIdx = useSelector(selectIdx);
    const changes = useSelector(selectCurrentChange);
    const dayChange = useSelector(selectDayChange);

    return (
        <Row>
            <Col xs={12}>
                {selectedIdx === -1 ? null : <h6 className="font-weight-bold" style={{color: "white", paddingRight: "20px", display: "inline"}}><Trans>Date</Trans>: {dayChange.date[selectedIdx]}</h6>}
                <Button style={{backgroundColor: "#2F4F4F"}} onClick={()=>{dispatch(updateIdx(allData.length-1))}} ><Trans>show today</Trans></Button>
                <h6 className="font-weight-bold" style={{color: "white", display: "inline", paddingLeft: "20px"}}><Trans>Click the graph to see detailed data</Trans></h6>
            </Col>
            <Col xs={12} md={6}>
                <Card className="card-chart">
                    <CardBody>
                        <Row>
                            <Col className="text-center" xs={4} style={{borderRight: "1px solid grey"}}>
                                <DataCard
                                    title={t("Positive")} 
                                    data={allData[selectedIdx].positive}
                                    secData={(allData[selectedIdx].new_positive >= 0 ? '+' : '') + allData[selectedIdx].new_positive}
                                    color={allData[selectedIdx].new_positive <= 0 ? "green": "red"}
                                    onSelect={()=> dispatch(updateCard(0))}
                                />
                            </Col>
                            <Col className="text-center" xs={4} style={{borderRight: "1px solid grey"}}>
                                <DataCard
                                    title={t("Active")} 
                                    data={allData[selectedIdx].total_active}
                                    secData={(changes.active >= 0 ? '+' : '') + changes.active}
                                    color={changes.active <= 0 ? "green": "red"}
                                    onSelect={()=> dispatch(updateCard(1))}
                                />
                            </Col>
                            <Col className="text-center" xs={4} >
                                <DataCard
                                    title={t("Hospitalization")} 
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
                                    title={t("Tested")} 
                                    data={allData[selectedIdx].total_test}
                                    secData={t("Positive-ratio") + ": " + changes.positive_ratio + "%"}
                                    onSelect={()=> dispatch(updateCard(3))}
                                />
                            </Col>
                            <Col className="text-center" xs={4} style={{borderRight: "1px solid grey"}}>
                                <DataCard
                                    title={t("Recovered")} 
                                    data={allData[selectedIdx].recovered}
                                    secData={t("Recovered-ratio") + ": " + changes.recover_ratio + "%"}
                                    onSelect={()=> dispatch(updateCard(4))}
                                />
                            </Col>
                            <Col className="text-center" xs={4}>
                                <DataCard
                                    title={t("Death")} 
                                    data={allData[selectedIdx].death}
                                    secData={t("Death-ratio") + ": " + changes.death_ratio + "%"}
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
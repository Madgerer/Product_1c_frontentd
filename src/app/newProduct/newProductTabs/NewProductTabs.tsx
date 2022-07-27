import {Tab, Tabs} from "react-bootstrap";
import TablePartTab from "./tabs/tablePartTab/TablePartTab";
import GraphicPartTab from "./tabs/graphicTab/GraphicPartTab";
import AdditionalInfoTab from "./tabs/additionalInfoTab/AdditionalInfoTab";
import React, {useState} from "react";
import CategoryTab from "./tabs/categoryTab/CategoryTab";

enum TabKeys {
    Category= 'category',
    TablePart = 'table',
    Graphic = 'graphic',
    Additional = 'additional'
}

export default function NewProductTabs() {
    const [key, setKey] = useState('additional');
    const [isCategoryLoaded, setCategoryLoaded] = useState(false)
    const [isTablePartLoaded, setTablePartLoaded] = useState(false)
    const [isGraphicLoaded, setGraphicLoaded] = useState(false)
    const [isAdditionalLoaded, setAdditionalLoaded] = useState(false)

    return <Tabs activeKey={key}
                 onSelect={(k) => setKey(k!)}
                 className="mb-3">
        <Tab eventKey={TabKeys.Category.toString()} title="Категории">
            {
                //избегаем unmount
                key === TabKeys.Category.toString() || isCategoryLoaded
                    ? <CategoryTab onMount={async () => setCategoryLoaded(true)}/>
                    : <></>
            }
        </Tab>
        <Tab eventKey={TabKeys.TablePart.toString()} title="Табличная часть">
            {
                key === TabKeys.TablePart.toString() || isTablePartLoaded
                    ?  <TablePartTab onMount={async () => setTablePartLoaded(true)}/>
                    : <></>
            }
        </Tab>
        <Tab eventKey={TabKeys.Graphic.toString()} title="Графическая часть">
            {
                key === TabKeys.Graphic.toString() || isGraphicLoaded
                    ?  <GraphicPartTab onMount={async () => setGraphicLoaded(true)}/>
                    : <></>
            }
        </Tab>
        <Tab eventKey={TabKeys.Additional.toString()} title="Доп. информация">
            {
                key === TabKeys.Additional.toString() || isAdditionalLoaded
                    ? <AdditionalInfoTab onMount={async () => setAdditionalLoaded(true)}/>
                    : <></>
            }
        </Tab>
    </Tabs>
}
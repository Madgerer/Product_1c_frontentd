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
    const [key, setKey] = useState('category');
    const [isCategoryLoaded, setCategoryLoaded] = useState(false)

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
                key === TabKeys.TablePart.toString() ?  <TablePartTab/> : <></>
            }
        </Tab>
        <Tab eventKey={TabKeys.Graphic.toString()} title="Графическая часть">
            {
                key === TabKeys.Graphic.toString() ?  <GraphicPartTab/> : <></>
            }
        </Tab>
        <Tab eventKey={TabKeys.Additional.toString()} title="Доп. информация">
            {
                key === TabKeys.Graphic.toString() ?  <AdditionalInfoTab/> : <></>
            }
        </Tab>
    </Tabs>
}
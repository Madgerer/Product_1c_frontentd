import {Tab, Tabs} from "react-bootstrap";
import CategoryTab from "./tabs/categoryTab/CategoryTab";
import TablePartTab from "./tabs/tablePartTab/TablePartTab";
import GraphicPartTab from "./tabs/graphicTab/GraphicPartTab";

export default function NewProductTabs() {
    return <Tabs defaultActiveKey="graphicPart" id="newProductTabs" className="mb-3">
        <Tab eventKey="category" title="Категории">
            <CategoryTab/>
        </Tab>
        <Tab eventKey="tablePart" title="Табличная часть">
            <TablePartTab/>
        </Tab>
        <Tab eventKey="graphicPart" title="Графическая часть">
            <GraphicPartTab/>
        </Tab>
        <Tab eventKey="additionInfo" title="Доп. информация">
            Доп. информация
        </Tab>
    </Tabs>
}
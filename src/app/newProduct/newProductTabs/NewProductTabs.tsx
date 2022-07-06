import {Tab, Tabs} from "react-bootstrap";
import CategoryTab from "./tabs/CategoryTab";
import TablePartTab from "./tabs/TablePartTab";
import GraphicPartTab from "./tabs/GraphicPartTab";

export default function NewProductTabs() {
    return <Tabs defaultActiveKey="tablePart" id="newProductTabs" className="mb-3">
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
import {Tab, Tabs} from "react-bootstrap";

export default function NewProductTabs() {
    return <Tabs defaultActiveKey="tablePart" id="newProductTabs" className="mb-3">
        <Tab eventKey="category" title="Категории">
            Категории
        </Tab>
        <Tab eventKey="tablePart" title="Табличная часть">
            Табличная часть
        </Tab>
        <Tab eventKey="graphicPart" title="Графическая часть">
            Графическая часть
        </Tab>
        <Tab eventKey="additionInfo" title="Доп. информация">
            Доп. информация
        </Tab>
    </Tabs>
}
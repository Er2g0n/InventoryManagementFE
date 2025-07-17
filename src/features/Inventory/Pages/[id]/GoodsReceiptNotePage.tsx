import { Button, Card, ConfigProvider, Row,Col } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useCallback, useState } from "react"
import { GoodsReceiptNote } from "@/types/WarehouseManagement/GoodsReceiptNote";
import FormGoodsReceiptNote from "@features/Inventory/Components/Warehouse/GoodsReceiptNote/GoodsReceiptNoteForm";
import ListGoodsReceiptNote from "@features/Inventory/Components/Warehouse/GoodsReceiptNote/GoodsReceiptNoteList";

const GoodsReceiptNotePage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentGoodsReceiptNote, setcurrentGoodsReceiptNote] = useState<GoodsReceiptNote | null>(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleAddGoodsReceiptNote = useCallback(() => {
        setIsEditing(false);
        setcurrentGoodsReceiptNote(null);
        setIsModalOpen(true);
    }, []);

    const handleEditGoodsReceiptNote = useCallback((model: GoodsReceiptNote) => {
        setIsEditing(true);
        setcurrentGoodsReceiptNote(model);
        setIsModalOpen(true)
    }, [])

    return (
        <>
            <Row gutter={24}>
                <Col span={24}>
                    <Card title="GoodsReceiptNote Management"
                        extra={
                            <ConfigProvider>
                                <Button
                                    type="primary"
                                    icon={<PlusOutlined />}
                                    onClick={handleAddGoodsReceiptNote}
                                    aria-label="Thêm danh mục"
                                >
                                    Thêm danh mục
                                </Button>
                            </ConfigProvider>
                        }
                        variant="borderless"
                    >
                        <ListGoodsReceiptNote onEdit={handleEditGoodsReceiptNote} refreshTrigger={refreshTrigger} />
                    </Card>
                </Col>
                <FormGoodsReceiptNote
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                isEditing={isEditing}
                currentGoodsReceiptNote={currentGoodsReceiptNote}
                refreshTrigger={refreshTrigger}
                setRefreshTrigger={setRefreshTrigger}
                />
            </Row>
        </>
    )
}
export default GoodsReceiptNotePage
import { TransactionType } from "@/types/MasterData/TransactionType";
import { Button, Card, ConfigProvider, Row,Col } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useCallback, useState } from "react"
import ListTransactionType from "../Components/TransactionType/TransactionTypeList";
import FormTransactionType from "../Components/TransactionType/TransactionTypeForm";

const TransactionTypePage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentTransactionType, setCurrentTransactionType] = useState<TransactionType | null>(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleAddTransactionType = useCallback(() => {
        setIsEditing(false);
        setCurrentTransactionType(null);
        setIsModalOpen(true);
    }, []);

    const handleEditTransactionType = useCallback((model: TransactionType) => {
        setIsEditing(true);
        setCurrentTransactionType(model);
        setIsModalOpen(true)
    }, [])

    return (
        <>
            <Row gutter={24}>
                <Col span={24}>
                    <Card title="Transaction Type Management"
                        extra={
                            <ConfigProvider>
                                <Button
                                    type="primary"
                                    icon={<PlusOutlined />}
                                    onClick={handleAddTransactionType}
                                    aria-label="Thêm danh mục"
                                >
                                    Thêm danh mục
                                </Button>
                            </ConfigProvider>
                        }
                        variant="borderless"
                    >
                        <ListTransactionType onEdit={handleEditTransactionType} refreshTrigger={refreshTrigger} />
                    </Card>
                </Col>
                <FormTransactionType
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                isEditing={isEditing}
                currentTransactionType={currentTransactionType}
                refreshTrigger={refreshTrigger}
                setRefreshTrigger={setRefreshTrigger}
                />
            </Row>
        </>
    )
}
export default TransactionTypePage
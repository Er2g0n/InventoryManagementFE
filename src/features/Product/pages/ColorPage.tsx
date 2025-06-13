"use client";

import { Button, Card, Col, ConfigProvider, Row } from "antd";
import { useCallback, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Color } from "@/types/MasterData/Product/ProductProperties";
import ListColor from "../Components/Color/ProductColorList";
import FormColor from "../Components/Color/ProductColorForm";


const ColorPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentColor, setCurrentColor] = useState<Color | null>(null); // Changed from ProductType to Color

    const handleAddColor = useCallback(() => {
        setIsEditing(false);
        setCurrentColor(null);
        setIsModalOpen(true);
    }, []);

    const handleEditColor = useCallback((color: Color) => { // Changed from ProductType to Color
        setIsEditing(true);
        setCurrentColor(color);
        setIsModalOpen(true);
    }, []);

    return (
        <Row gutter={24}>
            <Col span={24}>
                <Card
                    title="Color Management"
                    extra={
                        <ConfigProvider>
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                onClick={handleAddColor}
                                aria-label="Thêm màu sắc"
                            >
                                Thêm màu sắc
                            </Button>
                        </ConfigProvider>
                    }
                    variant="borderless"
                >
                    <ListColor onEdit={handleEditColor} />
                </Card>
            </Col>
            <FormColor
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                isEditing={isEditing}
                currentColor={currentColor}
            />
        </Row>
    );
}

export default ColorPage;

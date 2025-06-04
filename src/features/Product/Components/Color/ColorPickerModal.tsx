import { Color } from "@/types/MasterData/Product/ProductProperties";
import { Modal, Button } from "antd";
import { useState } from "react";


interface ColorPickerModalProps {
  visible: boolean;
  onSelect: (color: Color) => void;
  onCancel: () => void;
}

const colorPalette: Color[] = [
  // Basic Colors
  { colorName: "Black", colorCode: "#000000" },
  { colorName: "White", colorCode: "#FFFFFF" },
  { colorName: "Red", colorCode: "#FF0000" },
  { colorName: "Green", colorCode: "#00FF00" },
  { colorName: "Blue", colorCode: "#0000FF" },
  { colorName: "Yellow", colorCode: "#FFFF00" },
  // Pastels
  { colorName: "AliceBlue", colorCode: "#F0F8FF" },
  { colorName: "AntiqueWhite", colorCode: "#FAEBD7" },
  { colorName: "Aquamarine", colorCode: "#7FFFD4" },
  { colorName: "Beige", colorCode: "#F5F5DC" },
  { colorName: "Bisque", colorCode: "#FFE4C4" },
  // Dark Shades
  { colorName: "DarkBlue", colorCode: "#00008B" },
  { colorName: "DarkCyan", colorCode: "#008B8B" },
  { colorName: "DarkGoldenRod", colorCode: "#B8860B" },
  { colorName: "DarkGray", colorCode: "#A9A9A9" },
  { colorName: "DarkGreen", colorCode: "#006400" },
  // Bright Colors
  { colorName: "Chartreuse", colorCode: "#7FFF00" },
  { colorName: "Coral", colorCode: "#FF7F50" },
  { colorName: "Cyan", colorCode: "#00FFFF" },
  { colorName: "DeepPink", colorCode: "#FF1493" },
  { colorName: "Gold", colorCode: "#FFD700" },
];

const getContrastColor = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#000000" : "#FFFFFF";
};

const ColorPickerModal: React.FC<ColorPickerModalProps> = ({ visible, onSelect, onCancel }) => {
  // Sử dụng keyof typeof categories để giới hạn kiểu của selectedCategory
  type CategoryKey = keyof typeof categories;
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>("all");

  const categories = {
    all: colorPalette,
    basic: colorPalette.filter(c => ["Black", "White", "Red", "Green", "Blue", "Yellow"].includes(c.colorName)),
    pastels: colorPalette.filter(c => ["AliceBlue", "AntiqueWhite", "Aquamarine", "Beige", "Bisque"].includes(c.colorName)),
    dark: colorPalette.filter(c => ["DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray", "DarkGreen"].includes(c.colorName)),
    bright: colorPalette.filter(c => ["Chartreuse", "Coral", "Cyan", "DeepPink", "Gold"].includes(c.colorName)),
  };

  return (
    <Modal
      title="Chọn màu"
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="close" onClick={onCancel}>
          Đóng
        </Button>,
      ]}
      width={600}
      style={{ top: 20 }}
    >
      <div style={{ marginBottom: "16px" }}>
        <Button
          onClick={() => setSelectedCategory("all")}
          type={selectedCategory === "all" ? "primary" : "default"}
          style={{ marginRight: "8px" }}
        >
          Tất cả
        </Button>
        <Button
          onClick={() => setSelectedCategory("basic")}
          type={selectedCategory === "basic" ? "primary" : "default"}
          style={{ marginRight: "8px" }}
        >
          Màu cơ bản
        </Button>
        <Button
          onClick={() => setSelectedCategory("pastels")}
          type={selectedCategory === "pastels" ? "primary" : "default"}
          style={{ marginRight: "8px" }}
        >
          Màu pastel
        </Button>
        <Button
          onClick={() => setSelectedCategory("dark")}
          type={selectedCategory === "dark" ? "primary" : "default"}
          style={{ marginRight: "8px" }}
        >
          Màu tối
        </Button>
        <Button
          onClick={() => setSelectedCategory("bright")}
          type={selectedCategory === "bright" ? "primary" : "default"}
        >
          Màu sáng
        </Button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "12px" }}>
        {categories[selectedCategory].map((color) => (
          <div
            key={color.colorCode}
            style={{
              backgroundColor: color.colorCode,
              color: getContrastColor(color.colorCode),
              padding: "12px",
              borderRadius: "8px",
              textAlign: "center",
              cursor: "pointer",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.2s",
            }}
            onClick={() => onSelect(color)}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            {color.colorName}
            <br />
            <small>{color.colorCode}</small>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default ColorPickerModal;
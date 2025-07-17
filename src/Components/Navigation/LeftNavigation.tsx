"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Link, useLocation, useMatches } from "react-router-dom";
import { Menu, Typography } from "antd";
import type { MenuProps } from "antd";
import {
  ShoppingOutlined
} from "@ant-design/icons";

import SubMenu from "antd/es/menu/SubMenu";
import MenuItem from "antd/es/menu/MenuItem";

const { Title } = Typography;

interface LeftNavigationProps {
  collapsed: boolean;
  mobileView: boolean;
}

const LeftNavigation: React.FC<LeftNavigationProps> = React.memo(
  ({ collapsed }) => {
    // Type cast cho handle
    const matches = useMatches();
    const location = useLocation();
    const [openKeys, setOpenKeys] = useState<string[]>([]);

    useEffect(() => {
      if (!collapsed) {
        const newOpenKeys: string[] = [];
        const pathname = location.pathname;

        const segments = pathname.split("/").filter(Boolean); // remove empty segments


        for (let i = 1; i <= segments.length; i++) {
          newOpenKeys.push("/" + segments.slice(0, i).join("/"));
        }
        setOpenKeys(newOpenKeys);


      }
    }, [matches, collapsed, location]);

    // Handle menu open change
    const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
      setOpenKeys(keys as string[]);
    };
    const selectedKeys = useMemo<string[]>(() => {
      const select = [];

      select.push(location.pathname);
      return select;

    }, [location])

      ;

    return (
      <div className="flex flex-col pb-10 ">
        <div className="flex justify-center items-center h-16 m-4">
          <Title level={4} style={{ margin: 0, color: "white" }}>
            {collapsed ? "App" : "My App"}
          </Title>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={selectedKeys}
          openKeys={collapsed ? [] : openKeys}
          onOpenChange={onOpenChange}
          style={{ borderRight: 0 }}
        >
          <SubMenu
            icon={<ShoppingOutlined />}
            title="Master Data"
            key={"/product"}
          >
            <MenuItem key={"/product"}>
              <Link to={"/product"}>Product</Link>
            </MenuItem>
            <MenuItem key={"/product/category"}>
              <Link to={"/product/category"}>Category</Link>
            </MenuItem>
            <MenuItem key={"/product/type"}>
              <Link to={"/product/type"}>Type</Link>
            </MenuItem>
            <MenuItem key={"/product/color"}>
              <Link to={"/product/color"}>Color</Link>
            </MenuItem>
            <MenuItem key={"/product/material"}>
              <Link to={"/product/material"}>Material</Link>
            </MenuItem>
            <SubMenu

              title="Product"
              icon={<ShoppingOutlined />}
            >
              <MenuItem key={"/product/add"}>
                <Link to={"/product/add"}>Add Product</Link>
              </MenuItem>
            </SubMenu>

            <MenuItem key={"/product/brand"}>
              <Link to={"/product/brand"}>Brand</Link>
            </MenuItem>
            <MenuItem key={"/product/TransactionType"}>
              <Link to={"/product/TransactionType"}>Transaction Type</Link>
            </MenuItem>
            <Menu.Item key={"/product/vehicleModel"}>
              <Link to={"/product/vehicleModel"}>Vehicle Model</Link>
            </Menu.Item>
            <Menu.Item key={"/product/unitOfMeasure"}>
              <Link to={"/product/unitOfMeasure"}>Unit Of Measure</Link>
            </Menu.Item>

          </SubMenu>
          <SubMenu
            icon={<ShoppingOutlined />}
            title="Inventory Management"
            key={"/inventory"}
          >
            <MenuItem key={"/inventory/warehouseDashboard"}>
              <Link to={"/inventory/warehouseDashboard"}>Warehouse Dashboard</Link>
            </MenuItem>

            <MenuItem key={"/inventory/GoodsReceiptNote"}>
              <Link to={"/inventory/GoodsReceiptNote"}>Goods Receipt Note</Link>
            </MenuItem>

            <MenuItem key={"/inventory/warehouse"}>
              <Link to={"/inventory/warehouse"}>Warehouse</Link>
            </MenuItem>
          </SubMenu>
          <MenuItem key={"/partner"} icon={<ShoppingOutlined />}>
            <Link to={"/partner"}>Partner</Link>
          </MenuItem>
        </Menu>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Only re-render if these props change
    return (
      prevProps.collapsed === nextProps.collapsed &&
      prevProps.mobileView === nextProps.mobileView
    );
  }
);

export default LeftNavigation;

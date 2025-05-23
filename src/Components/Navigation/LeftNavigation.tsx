"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Link, UIMatch, useMatches } from "react-router-dom";
import { Menu, Typography } from "antd";
import type { MenuProps } from "antd";
import {
  HomeOutlined,
  ReadOutlined,
  ShoppingOutlined,
  DatabaseOutlined,
  AppstoreOutlined
} from "@ant-design/icons";
import { HandleRoutes, WEB_ENPOINT } from "@/routes";
import { watch } from "fs";

const { Title } = Typography;
const { SubMenu, Item } = Menu;

interface LeftNavigationProps {
  collapsed: boolean;
  mobileView: boolean;
}

const LeftNavigation: React.FC<LeftNavigationProps> = React.memo(
  ({ collapsed }) => {
    // Type cast cho handle
    const matches = useMatches();
    const nowRoutes = useMemo(() => {
      const lastMatch = matches[matches.length - 1] as UIMatch<
        any,
        HandleRoutes
      >;

      return lastMatch;
    }, [matches]);
    // Type cast cho handle

    // const pattern = (lastMatch.handle as HandleWithPattern | undefined)?.pattern;
    const [openKeys, setOpenKeys] = useState<string[]>([]);
    // Update open keys based on current path

    useEffect(() => {
      if (!collapsed) {
        const newOpenKeys: string[] = [];

        if (nowRoutes.handle?.pattern && nowRoutes.handle?.pattern == "/") {
          setOpenKeys([]);
        } else {
          const newOpenKeys: string[] = [];
          const pathKey = nowRoutes.handle?.pattern.toLowerCase().split("/");
          let currentPath = "";

          pathKey.shift();
          for (const element of pathKey) {
            currentPath += "/" + element;
            newOpenKeys.push(currentPath + "key");
          }

          setOpenKeys(newOpenKeys);
        }
      }
    }, [matches, collapsed]);

    // Handle menu open change
    const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
      setOpenKeys(keys as string[]);
    };

    // Determine which menu item should be active based on current path
    const getSelectedKeys = (): string[] => {
      // eslint-disable-next-line no-console
      // console.log(nowRoutes, "fdfsdf");
      return [nowRoutes.handle?.pattern ?? "/"];
    };

    return (
      <div className="tw:flex tw:flex-col tw:h-full">
        <div className="tw:flex tw:justify-center tw:items-center tw:h-16 tw:m-4">
          <Title level={4} style={{ margin: 0, color: "white" }}>
            {collapsed ? "App" : "My App"}
          </Title>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={getSelectedKeys()}
          openKeys={collapsed ? [] : openKeys}
          onOpenChange={onOpenChange}
          style={{ borderRight: 0 }}
        >
          <Item key={WEB_ENPOINT.Home} icon={<HomeOutlined />}>
            <Link to={WEB_ENPOINT.Home}>Home</Link>
          </Item>

          <Item key={WEB_ENPOINT.Read} icon={<ReadOutlined />}>
            <Link to={WEB_ENPOINT.Read}>Read</Link>
          </Item>

          <Item key={WEB_ENPOINT.Route} icon={<AppstoreOutlined />}>
            <Link to={WEB_ENPOINT.Route}>Route</Link>
          </Item>
          {/* Develop Module 2: Master Data */}
          <SubMenu
            icon={<ShoppingOutlined />}
            title="Master Data"
          >
            <Item key={WEB_ENPOINT.StatusMaster.index}>
              <Link to={WEB_ENPOINT.StatusMaster.index}>Status Master</Link>
            </Item>
            <Item key={WEB_ENPOINT.Brand.id}>
              <Link to={`${WEB_ENPOINT.Brand.index}/1`}>Warehouse</Link>
            </Item>
          </SubMenu>

          {/*  */}
          <SubMenu
            key={(WEB_ENPOINT.Brand.index + "key").toLowerCase()}
            icon={<ShoppingOutlined />}
            title="Product Classification"
          >
            <Item key={WEB_ENPOINT.Brand.index}>
              <Link to={WEB_ENPOINT.Brand.index}>All Brands</Link>
            </Item>
            <Item key={WEB_ENPOINT.Brand.id}>
              <Link to={`${WEB_ENPOINT.Brand.index}/1`}>id Brand</Link>
            </Item>
            <Item key={WEB_ENPOINT.ProductType.index}>
              <Link to={WEB_ENPOINT.ProductType.index}>Product Type</Link>
            </Item>
          </SubMenu>
          <SubMenu
            key={WEB_ENPOINT.CurrentStock.index + "key"}
            icon={<DatabaseOutlined />}
            title="Current Stock"
          >
            <Item key="stock-list">
              <Link to={WEB_ENPOINT.CurrentStock.index}>All Stock</Link>
            </Item>
            <Item key="stock-text-link">
              <Link to={`${WEB_ENPOINT.CurrentStock.index}/1`}>
                Test link Stock
              </Link>
            </Item>
          </SubMenu>
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

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

interface LeftNavigationProps {
  collapsed: boolean;
  mobileView: boolean;
}

const LeftNavigation: React.FC<LeftNavigationProps> = React.memo(
  ({ collapsed }) => {
    // Type cast cho handle
    const matches = useMatches();
    // const nowRoutes = useMemo(() => {
    //   const lastMatch = matches[matches.length - 1] as UIMatch<
    //     any,
    //     HandleRoutes
    //   >;

    //   return lastMatch;
    // }, [matches]);
    // Type cast cho handle

    // const pattern = (lastMatch.handle as HandleWithPattern | undefined)?.pattern;
    const [openKeys, setOpenKeys] = useState<string[]>([]);
    // Update open keys based on current path

    useEffect(() => {
      if (!collapsed) {
        const newOpenKeys: string[] = [];

        // if (nowRoutes.handle?.pattern && nowRoutes.handle?.pattern == "/") {
        //   setOpenKeys([]);
        // } else {
        //   const newOpenKeys: string[] = [];
        //   const pathKey = nowRoutes.handle?.pattern.toLowerCase().split("/");
        //   let currentPath = "";

        //   pathKey.shift();
        //   for (const element of pathKey) {
        //     currentPath += "/" + element;
        //     newOpenKeys.push(currentPath + "key");
        //   }

        //   setOpenKeys(newOpenKeys);
        // }
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
      return ["/"];
    };

    return (
      <div className="flex flex-col h-full">
        <div className="flex justify-center items-center h-16 m-4">
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

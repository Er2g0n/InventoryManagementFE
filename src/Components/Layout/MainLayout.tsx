"use client";
import { useState, useEffect, Suspense } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Layout,
  Button,
  Drawer,
  Space,
  Typography,
  Divider,
  Dropdown,
  theme,
  Avatar,
  MenuProps
} from "antd";
import {
  MenuOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined
} from "@ant-design/icons";

import Loading from "@/Components/Loading";
// import PageErrorBoundary from "@pages/PageErrorBoundary";
import LeftNavigation from "@/Components/Navigation/LeftNavigation";

const { Header, Content, Footer, Sider } = Layout;
const { Text } = Typography;

function MainLayout () {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileView, setMobileView] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const { token } = theme.useToken();

  // Check if we're in mobile view
  useEffect(() => {
    const checkMobile = () => {
      const isMobile = window.innerWidth < 768;

      setMobileView(isMobile);
      if (isMobile) {
        setCollapsed(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // User menu items
  const userMenuItems: MenuProps["items"] = [
    {
      key: "profile",
      label: <Link to="/profile">Profile</Link>,
      icon: <UserOutlined />
    },
    {
      key: "settings",
      label: <Link to="/settings">Settings</Link>,
      icon: <SettingOutlined />
    },
    {
      type: "divider"
    },
    {
      key: "logout",
      label: "Logout",
      icon: <LogoutOutlined />,
      danger: true
    }
  ];

  // Toggle drawer for mobile view
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Handle user menu click
  const handleUserMenuClick = ({ key }: { key: string }) => {
    if (key === "logout") {
      // Handle logout logic here
      console.log("Logout clicked");
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Helmet>
        <meta name="keywords" content="React, SEO, Helmet, Vite, TypeScript" />
        <meta property="og:title" content="Trang Chủ " />
        <meta property="og:description" content="Trang chủ" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Desktop Sidebar */}
      {!mobileView && (
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            zIndex: 1000
          }}
        >
          <LeftNavigation collapsed={collapsed} mobileView={false} />
        </Sider>
      )}

      <Layout
        style={{
          marginLeft: mobileView ? 0 : collapsed ? 80 : 200,
          transition: "all 0.2s"
        }}
      >
        <Header
          style={{
            padding: mobileView ? "0 16px" : "0 24px",
            background: token.colorBgContainer,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.03)"
          }}
        >
          <div className="tw:flex tw:items-center">
            {mobileView && (
              <Button
                type="text"
                icon={<MenuOutlined />}
                onClick={toggleDrawer}
                style={{ marginRight: 12 }}
              />
            )}
            <Typography.Title level={4} style={{ margin: 0 }}>
              {mobileView && "My App"}
            </Typography.Title>
          </div>

          <Space>
            <Dropdown
              menu={{ items: userMenuItems, onClick: handleUserMenuClick }}
              placement="bottomRight"
            >
              <Button type="text" className="tw:flex tw:items-center">
                <Space>
                  <Avatar icon={<UserOutlined />} />
                  {!mobileView && <span>Admin User</span>}
                </Space>
              </Button>
            </Dropdown>
          </Space>
        </Header>

        {/* Mobile Drawer */}
        <Drawer
          title="Menu"
          placement="left"
          onClose={toggleDrawer}
          open={mobileView && drawerOpen}
          width={250}
        >
          <LeftNavigation collapsed={false} mobileView={true} />
        </Drawer>

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: token.colorBgContainer,
            borderRadius: token.borderRadiusLG,
            minHeight: 280
          }}
        >
          <Suspense fallback={<Loading />}>
            {/* <PageErrorBoundary> */}
              <Outlet />
            {/* </PageErrorBoundary> */}
          </Suspense>
        </Content>

        <Footer style={{ textAlign: "center" }}>
          <Divider />
          <Space direction="vertical" size="small">
            <Text>© 2025 - My React App 🚀</Text>
            <Text type="secondary">Built with React, Vite, and Ant Design</Text>
          </Space>
        </Footer>
      </Layout>
    </Layout>
  );
}

export default MainLayout;

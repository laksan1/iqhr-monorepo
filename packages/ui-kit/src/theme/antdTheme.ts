import type { ThemeConfig } from 'antd';

export const lightAntdTheme: ThemeConfig = {
  token: {
    colorPrimary: '#41c597',
    colorPrimaryHover: '#33b789',
    colorInfo: '#41c597',
    colorWarning: '#fda610',
    colorSuccess: '#33b789',
    colorText: '#434a50',
    colorTextSecondary: '#738299',
    colorBgBase: '#ffffff',
    colorBgContainer: '#ffffff',
    colorBgLayout: '#f6faf8',
    colorBorder: '#e4ece8',
    borderRadius: 12,
    fontFamily: "'Manrope', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    controlHeight: 40,
  },
  components: {
    Button: {
      primaryShadow: '0 8px 18px rgba(65, 197, 151, 0.28)',
      fontWeight: 600,
    },
    Layout: {
      headerBg: 'transparent',
      bodyBg: 'transparent',
      siderBg: 'transparent',
    },
    Menu: {
      itemBorderRadius: 10,
      itemSelectedBg: '#d0f5e8',
      itemSelectedColor: '#1f6e55',
    },
  },
};

export const darkAntdTheme: ThemeConfig = {
  token: {
    colorPrimary: '#41c597',
    colorPrimaryHover: '#33b789',
    colorInfo: '#41c597',
    colorWarning: '#fda610',
    colorSuccess: '#33b789',
    colorText: '#f0f0f0',
    colorTextSecondary: '#a8b0bc',
    colorBgBase: '#1a1a1a',
    colorBgContainer: '#222222',
    colorBgLayout: '#1a1a1a',
    colorBorder: '#333a38',
    borderRadius: 12,
    fontFamily: "'Manrope', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    controlHeight: 40,
  },
  components: {
    Button: {
      primaryShadow: '0 8px 18px rgba(65, 197, 151, 0.2)',
      fontWeight: 600,
    },
    Layout: {
      headerBg: 'transparent',
      bodyBg: 'transparent',
      siderBg: 'transparent',
    },
    Menu: {
      itemBorderRadius: 10,
      itemSelectedBg: '#1e3d34',
      itemSelectedColor: '#d0f5e8',
      darkItemBg: 'transparent',
    },
  },
};

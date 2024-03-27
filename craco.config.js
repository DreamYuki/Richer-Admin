const CracoLessPlugin = require('craco-less')

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
'@primary-color': '#1890ff',
'@body-background': '#001529', // 背景色
'@component-background': '#002140', // 组件背景色
'@text-color': 'fade(@white, 85%)', // 文字颜色
'@text-color-secondary': 'fade(@white, 45%)', // 次要文字颜色
'@heading-color': 'fade(@white, 85%)', // 标题颜色
'@disabled-color': 'fade(@white, 25%)', // 禁用状态颜色

// 边框颜色
'@border-color-base': 'fade(@white, 12%)', // 边框颜色

// 按钮
'@btn-primary-color': '@white', // 主按钮文字颜色
'@btn-primary-bg': '#1890ff', // 主按钮背景色

// 表单
'@input-bg': '#002140', // 输入框背景色

// Layout
'@layout-header-background': '#001529', // 头部布局背景色
'@layout-sider-background': '#001529', // 侧边栏背景色
'@layout-body-background': '#002140', // 内容区域背景色
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
}

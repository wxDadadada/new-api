import HeaderBar from './HeaderBar.js';
import { Layout } from '@douyinfe/semi-ui';
import SiderBar from './SiderBar.js';
import App from '../App.js';
import FooterBar from './Footer.js';
import { ToastContainer } from 'react-toastify';
import React, { useContext } from 'react';
import { StyleContext } from '../context/Style/index.js';
const { Sider, Content, Header, Footer } = Layout;


const PageLayout = () => {
  const [styleState, styleDispatch] = useContext(StyleContext);
  // 定义点击遮罩层的处理函数
  const handleMaskClick = () => {
    styleDispatch({ type: 'SET_SIDER', payload: false });
  };

  return (
    <Layout style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header style={{ zIndex: 999 }}>
        <HeaderBar />
      </Header>
      <Layout style={{
        flex: 1,
        overflow: 'hidden',
        display: 'flex'
      }}>
        {/* <Sider> */}
        {/* <Sider style={styleState.isMobile ? { zIndex: 999, position: 'absolute' } : undefined}> */}
        <Sider style={{
          height: 'calc(100vh - 60px)', 
          ...styleState.isMobile ? { zIndex: 999, position: 'absolute' } : {}
        }}>
          {styleState.showSider ? <SiderBar /> : null}
        </Sider>
        {/* 添加遮罩层 */}
        {styleState.isMobile && styleState.showSider && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)', // 半透明黑色背景
              zIndex: 998, // 确保遮罩层在 Sider 下方
              // pointerEvents: 'all', // 阻止点击事件
            }}
            onClick={handleMaskClick} // 绑定点击事件
          />
        )}
        <Layout>
          <Content
            style={{ overflowY: 'auto', padding: styleState.shouldInnerPadding ? '24px' : '0' }}
          >
            <App />
          </Content>
          <Layout.Footer>
            <FooterBar></FooterBar>
          </Layout.Footer>
        </Layout>
      </Layout>
      <ToastContainer />
    </Layout>
  )
}

export default PageLayout;
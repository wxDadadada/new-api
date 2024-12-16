import React, { useContext, useEffect, useState, useMemo } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// wxDa 2024-12-11 增加useLocation
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../context/User';
import { useSetTheme, useTheme } from '../context/Theme';

import { API, getLogo, getSystemName, isMobile, showSuccess } from '../helpers';
import '../index.css';

import fireworks from 'react-fireworks';

// import {
//   IconClose,
//   IconHelpCircle,
//   IconHome,
//   IconHomeStroked, IconIndentLeft,
//   IconKey, IconMenu,
//   IconNoteMoneyStroked,
//   IconPriceTag,
//   IconUser
// } from '@douyinfe/semi-icons';
// wxDa 2024-12-11 修改第四处 替换头像 使用icon IconUserStroked
// wxDa 2024-12-11 修改第五处 替换登录注册按钮的icon IconSendStroked IconFollowStroked
// wxDa 2024-12-11 修改第二处 替换about的icon IconIssueStroked
import {
  IconClose,
  IconHelpCircle,
  IconHome,
  IconHomeStroked, IconIndentLeft,
  IconKey, IconMenu,
  IconNoteMoneyStroked,
  IconPriceTag,
  IconUser,
  IconUserStroked,
  IconSendStroked,
  IconFollowStroked,
  IconIssueStroked
} from '@douyinfe/semi-icons';
// wxDa 2024-12-11 增加导入'@douyinfe/semi-icons-lab'
import {
  IconProgress,
  IconHighlight,
  IconToken,
  IconIntro,
  IconTree,
  IconOverflow,
  IconTag,
  IconCard,
  IconToast,
  IconBanner,
  IconAvatar,
  IconChangelog,
  IconPopover,
  IconImage,
  IconSlider,
  IconConfig,
  // wxDa 2024-12-11 修改第二处 替换about的icon IconFaq
  IconFaq,
} from '@douyinfe/semi-icons-lab';
import { Avatar, Button, Dropdown, Layout, Nav, Switch } from '@douyinfe/semi-ui';
import { stringToColor } from '../helpers/render';
import Text from '@douyinfe/semi-ui/lib/es/typography/text';
import { StyleContext } from '../context/Style/index.js';

// HeaderBar Buttons
let headerButtons = [
  {
    text: '关于',
    itemKey: 'about',
    to: '/about',
    icon: <IconHelpCircle />,
  },
];

if (localStorage.getItem('chat_link')) {
  headerButtons.splice(1, 0, {
    name: '聊天',
    to: '/chat',
    icon: 'comments',
  });
}

const HeaderBar = () => {
  const [userState, userDispatch] = useContext(UserContext);
  const [styleState, styleDispatch] = useContext(StyleContext);
  let navigate = useNavigate();

  // wxDa 2024-12-11 修改第六处 修改selectedKeys onSelect
  let location = useLocation(); // 获取当前路由信息
  const [selectedKey, setSelectedKey] = useState(location.pathname === '/' ? 'home' : ''); // 根据当前路径初始化 selectedKey

  const systemName = getSystemName();
  const logo = getLogo();
  // wxDa 2024-12-11 修改第一处 去掉新年特效
  // const currentDate = new Date();
  // // enable fireworks on new year(1.1 and 2.9-2.24)
  // const isNewYear =
  //   (currentDate.getMonth() === 0 && currentDate.getDate() === 1) ||
  //   (currentDate.getMonth() === 1 &&
  //     currentDate.getDate() >= 9 &&
  //     currentDate.getDate() <= 24);

  // let buttons = [
  //   {
  //     text: '首页',
  //     itemKey: 'home',
  //     to: '/',
  //   },
  //   {
  //     text: '控制台',
  //     itemKey: 'detail',
  //     to: '/',
  //   },
  //   {
  //     text: '定价',
  //     itemKey: 'pricing',
  //     to: '/pricing',
  //   },
  // ];
  // wxDa 2024-12-11 修改第七处 修改控制台
  let buttons = [
    {
      text: '首页',
      itemKey: 'home',
      to: '/',
    },
    {
      text: '控制台',
      itemKey: 'console',
      to: '/console',
    },
    {
      text: '定价',
      itemKey: 'pricing',
      to: '/pricing',
    },
  ];

  async function logout() {
    await API.get('/api/user/logout');
    showSuccess('注销成功!');
    userDispatch({ type: 'logout' });
    localStorage.removeItem('user');
    navigate('/login');
  }
  // wxDa 2024-12-11 修改第一处 去掉新年特效
  // const handleNewYearClick = () => {
  //   fireworks.init('root', {});
  //   fireworks.start();
  //   setTimeout(() => {
  //     fireworks.stop();
  //     setTimeout(() => {
  //       window.location.reload();
  //     }, 10000);
  //   }, 3000);
  // };

  const theme = useTheme();
  const setTheme = useSetTheme();

  useEffect(() => {
    if (theme === 'dark') {
      document.body.setAttribute('theme-mode', 'dark');
    }

    // // wxDa 2024-12-11 修改第一处 去掉新年特效
    // if (isNewYear) {
    //   console.log('Happy New Year!');
    // }
  }, []);
  // wxDa 2024-12-11 修改第六处 修改selectedKeys onSelect
  useEffect(() => {
    // 根据当前路径更新 selectedKey
    if (location.pathname === '/') {
      setSelectedKey('home');
    } else if (location.pathname === '/console') {
      setSelectedKey('console');
    } else if (location.pathname === '/pricing') {
      setSelectedKey('pricing');
    } else if (location.pathname === '/about') {
      setSelectedKey('about');
    } else if (location.pathname === '/login') {
      setSelectedKey('login');
    } else if (location.pathname === '/register') {
      setSelectedKey('register');
    } else if (location.pathname === '/chat') {
      setSelectedKey('chat');
    }
  }, [location]);

  return (
    <>
      <Layout>
        <div style={{ width: '100%' }}>
          <Nav
            mode={'horizontal'}
            renderWrapper={({ itemElement, isSubNav, isInSubNav, props }) => {
              const routerMap = {
                about: '/about',
                login: '/login',
                register: '/register',
                pricing: '/pricing',
                detail: '/detail',
                home: '/',
                // wxDa 2024-12-11 修改第七处 修改控制台
                console: '/console',
              };
              return (
                <div onClick={(e) => {
                  if (props.itemKey === 'home') {
                    styleDispatch({ type: 'SET_INNER_PADDING', payload: false });
                    styleDispatch({ type: 'SET_SIDER', payload: false });
                  } else if (props.itemKey === 'pricing' || props.itemKey === 'about' || props.itemKey === 'login' || props.itemKey === 'register') {
                    styleDispatch({ type: 'SET_INNER_PADDING', payload: true });
                    styleDispatch({ type: 'SET_SIDER', payload: false });
                  } else {
                    styleDispatch({ type: 'SET_INNER_PADDING', payload: true });
                    styleDispatch({ type: 'SET_SIDER', payload: true });
                  }
                }}>
                  <Link
                    className="header-bar-text"
                    style={{ textDecoration: 'none' }}
                    to={routerMap[props.itemKey]}
                  >
                    {itemElement}
                  </Link>
                </div>
              );
            }}
            // selectedKeys={[]}
            // // items={headerButtons}
            // onSelect={(key) => { }}
            // wxDa 2024-12-11 修改第六处 修改selectedKeys onSelect
            selectedKeys={[selectedKey]}
            // items={headerButtons}
            onSelect={(key) => setSelectedKey(key)}
            header={styleState.isMobile && location.pathname !== '/home' && location.pathname !== '/pricing' && location.pathname !== '/about' && location.pathname !== '/login' && location.pathname !== '/register' ? {
              logo: (
                <>
                  {
                    !styleState.showSider ?
                      <Button icon={<IconMenu />} theme="light" aria-label="展开侧边栏" onClick={
                        () => styleDispatch({ type: 'SET_SIDER', payload: true })
                      } /> :
                      <Button icon={<IconIndentLeft />} theme="light" aria-label="关闭侧边栏" onClick={
                        () => styleDispatch({ type: 'SET_SIDER', payload: false })
                      } />
                  }
                </>
              ),
            } : {
              logo: (
                <img src={logo} alt='logo' />
              ),
              text: !styleState.isMobile ? systemName : undefined,

            }}
            items={buttons}
            footer={
              <>
                {/* wxDa 2024-12-11 修改第一处 去掉新年特效 */}
                {/* {isNewYear && (
                  // happy new year
                  <Dropdown
                    position='bottomRight'
                    render={
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={handleNewYearClick}>
                          Happy New Year!!!
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    }
                  >
                    <Nav.Item itemKey={'new-year'} text={'🏮'} />
                  </Dropdown>
                )} */}
                {/* <Nav.Item itemKey={'about'} icon={<IconHelpCircle />} /> */}
                {/* wxDa 2024-12-11 修改第二处 替换about的icon IconFaq */}
                <Nav.Item itemKey={'about'}
                  // style={{ marginRight: '4px' }}
                  style={{
                    marginRight: '4px',
                    // border: '1px solid #ccc', // 添加边框样式
                  }}
                // onClick={() => setSelectedKey('about')}
                >
                  <IconIssueStroked size='large' />
                </Nav.Item>
                {/* wxDa 2024-12-11 修改第三处 去掉主题切换按钮 */}
                {/* <>
                  <Switch
                    checkedText='🌞'
                    size={styleState.isMobile ? 'default' : 'large'}
                    checked={theme === 'dark'}
                    uncheckedText='🌙'
                    onChange={(checked) => {
                      setTheme(checked);
                    }}
                  />
                </> */}
                {userState.user ? (
                  <>
                    <Dropdown
                      position='bottomRight'
                      render={
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={logout}>退出</Dropdown.Item>
                        </Dropdown.Menu>
                      }
                    >
                      {/* <Avatar
                        size='small'
                        color={stringToColor(userState.user.username)}
                        style={{ margin: 4 }}
                      >
                        {userState.user.username[0]}
                      </Avatar> */}
                      {/* wxDa 2024-12-11 修改第四处 替换头像 使用icon IconUserStroked */}
                      <Avatar
                        size="small"
                        color='blue'
                        style={{ margin: 4 }}
                      >
                        {/* {userState.user.username[0]} */}
                        {/* <IconUser /> */}
                        <IconUserStroked />
                      </Avatar>
                      {/* {!isMobile() && <span>{userState.user.username}</span>} */}
                      {styleState.isMobile ? null : <Text>{userState.user.username}</Text>}
                    </Dropdown>
                  </>
                ) : (
                  <>
                    {/* <Nav.Item
                      itemKey={'login'}
                      text={'登录'}
                    // icon={<IconKey />}
                    />
                    <Nav.Item
                      itemKey={'register'}
                      text={'注册'}
                      icon={<IconUser />}
                    /> */}
                    {/* wxDa 2024-12-11 修改第五处 替换登录注册按钮的icon IconSendStroked IconFollowStroked */}
                    {/* <Button theme='solid' type='primary' size='large' onClick={change}>登录</Button> */}
                    <Nav.Item
                      itemKey={'login'}
                      text={'登录'}
                      // onClick={() => setSelectedKey('login')}
                      style={{
                        marginRight: '2px',
                        // border: '1px solid #ccc', // 添加边框样式
                      }}
                      icon={<IconSendStroked size='large' />}
                    // icon={<IconFollowStroked />}
                    />

                    {styleState.isMobile ? null : <Nav.Item
                      itemKey={'register'}
                      text={'注册'}
                      // style={{
                      //   border: '1px solid #ccc', // 添加边框样式
                      // }}
                      // onClick={() => setSelectedKey('register')}
                      icon={<IconFollowStroked size='large' />}
                    />}
                  </>
                )}
              </>
            }
          ></Nav>
        </div>
      </Layout>
    </>
  );
};

export default HeaderBar;

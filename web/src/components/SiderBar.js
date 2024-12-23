import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/User';
import { StatusContext } from '../context/Status';
import { useTranslation } from 'react-i18next';

import {
  API,
  getLogo,
  getSystemName,
  isAdmin,
  isMobile,
  showError,
} from '../helpers';
import '../index.css';

// import {
//   IconCalendarClock, IconChecklistStroked,
//   IconComment, IconCommentStroked,
//   IconCreditCard,
//   IconGift, IconHelpCircle,
//   IconHistogram,
//   IconHome,
//   IconImage,
//   IconKey,
//   IconLayers,
//   IconPriceTag,
//   IconSetting,
//   IconUser
// } from '@douyinfe/semi-icons';
// wxDa 2024-12-11 增加导入'@douyinfe/semi-icons-lab'
import {
  IconProgress,
  IconHighlight,
  IconBanner,
  IconTree,
  IconOverflow,
  IconTag,
  IconCard,
  IconToast,
  IconAvatar,
  IconChangelog,
  IconPopover,
  IconImage,
  IconSlider,
  IconConfig
} from '@douyinfe/semi-icons-lab';
import { Avatar, Dropdown, Layout, Nav, Switch } from '@douyinfe/semi-ui';
import { setStatusData } from '../helpers/data.js';
import { stringToColor } from '../helpers/render.js';
import { useSetTheme, useTheme } from '../context/Theme/index.js';
import { StyleContext } from '../context/Style/index.js';

// HeaderBar Buttons

const SiderBar = () => {
  const { t } = useTranslation();
  const [styleState, styleDispatch] = useContext(StyleContext);
  const [statusState, statusDispatch] = useContext(StatusContext);
  const defaultIsCollapsed =
    localStorage.getItem('default_collapse_sidebar') === 'true';

  const [selectedKeys, setSelectedKeys] = useState(['home']);
  const [isCollapsed, setIsCollapsed] = useState(defaultIsCollapsed);
  const [chatItems, setChatItems] = useState([]);
  const theme = useTheme();
  const setTheme = useSetTheme();

  // const routerMap = {
  //   home: '/',
  //   channel: '/channel',
  //   token: '/token',
  //   redemption: '/redemption',
  //   topup: '/topup',
  //   user: '/user',
  //   log: '/log',
  //   midjourney: '/midjourney',
  //   setting: '/setting',
  //   about: '/about',
  //   chat: '/chat',
  //   detail: '/detail',
  //   pricing: '/pricing',
  //   task: '/task',
  //   playground: '/playground',
  //   // wxDa 2024-12-11 修改第二处 增加仪表盘
  //   console: '/console',
  // };
  // wxDa 2024-12-11 修改第二处 增加仪表盘
  const routerMap = {
    home: '/',
    channel: '/channel',
    token: '/token',
    redemption: '/redemption',
    topup: '/topup',
    user: '/user',
    log: '/log',
    midjourney: '/midjourney',
    setting: '/setting',
    about: '/about',
    chat: '/chat',
    detail: '/detail',
    pricing: '/pricing',
    task: '/task',
    playground: '/playground',
    console: '/console',
  };

  // const headerButtons = useMemo(
  //   () => [
  //     {
  //       text: 'Playground',
  //       itemKey: 'playground',
  //       to: '/playground',
  //       icon: <IconCommentStroked />,
  //     },
  //     {
  //       text: '渠道',
  //       itemKey: 'channel',
  //       to: '/channel',
  //       icon: <IconLayers />,
  //       className: isAdmin() ? 'semi-navigation-item-normal' : 'tableHiddle',
  //     },
  //     {
  //       text: '聊天',
  //       itemKey: 'chat',
  //       // to: '/chat',
  //       items: chatItems,
  //       icon: <IconComment />,
  //       // className: localStorage.getItem('chat_link')
  //       //   ? 'semi-navigation-item-normal'
  //       //   : 'tableHiddle',
  //     },
  //     {
  //       text: '令牌',
  //       itemKey: 'token',
  //       to: '/token',
  //       icon: <IconKey />,
  //     },
  //     {
  //       text: '数据看板',
  //       itemKey: 'detail',
  //       to: '/detail',
  //       icon: <IconCalendarClock />,
  //       className:
  //         localStorage.getItem('enable_data_export') === 'true'
  //           ? 'semi-navigation-item-normal'
  //           : 'tableHiddle',
  //     },
  //     {
  //       text: '兑换码',
  //       itemKey: 'redemption',
  //       to: '/redemption',
  //       icon: <IconGift />,
  //       className: isAdmin() ? 'semi-navigation-item-normal' : 'tableHiddle',
  //     },
  //     {
  //       text: '钱包',
  //       itemKey: 'topup',
  //       to: '/topup',
  //       icon: <IconCreditCard />,
  //     },
  //     {
  //       text: '用户管理',
  //       itemKey: 'user',
  //       to: '/user',
  //       icon: <IconUser />,
  //       className: isAdmin() ? 'semi-navigation-item-normal' : 'tableHiddle',
  //     },
  //     {
  //       text: '日志',
  //       itemKey: 'log',
  //       to: '/log',
  //       icon: <IconHistogram />,
  //     },
  //     {
  //       text: '绘图',
  //       itemKey: 'midjourney',
  //       to: '/midjourney',
  //       icon: <IconImage />,
  //       className:
  //         localStorage.getItem('enable_drawing') === 'true'
  //           ? 'semi-navigation-item-normal'
  //           : 'tableHiddle',
  //     },
  //     {
  //       text: '异步任务',
  //       itemKey: 'task',
  //       to: '/task',
  //       icon: <IconChecklistStroked />,
  //       className:
  //         localStorage.getItem('enable_task') === 'true'
  //           ? 'semi-navigation-item-normal'
  //           : 'tableHiddle',
  //     },
  //     {
  //       text: '设置',
  //       itemKey: 'setting',
  //       to: '/setting',
  //       icon: <IconSetting />,
  //     },
  //     // {
  //     //     text: '关于',
  //     //     itemKey: 'about',
  //     //     to: '/about',
  //     //     icon: <IconAt/>
  //     // }
  //   ],
  //   [
  //     localStorage.getItem('enable_data_export'),
  //     localStorage.getItem('enable_drawing'),
  //     localStorage.getItem('enable_task'),
  //     localStorage.getItem('chat_link'), chatItems,
  //     isAdmin(),
  //   ],
  // );
  // wxDa 2024-12-11 修改第一处 修改各text icon
  // wxDa 2024-12-11 修改第二处 增加仪表盘
  // wxDa 2024-12-11 修改第三处 修改导航排序 修改子导航上边距为0px
  const headerButtons = useMemo(
    () => [
      {
        text: t('仪表盘'),
        itemKey: 'console',
        to: '/console',
        icon: <IconProgress />,
      },
      {
        text: t('Playground'),
        itemKey: 'playground',
        to: '/playground',
        icon: <IconHighlight />,
      },
      {
        text: t('在线聊天'),
        itemKey: 'chat',
        items: chatItems,
        icon: <IconOverflow />,
      },
      {
        text: t('令牌管理'),
        itemKey: 'token',
        to: '/token',
        icon: <IconTag />,
      },
      {
        text: t('额度充值'),
        itemKey: 'topup',
        to: '/topup',
        icon: <IconToast />,
      },
      {
        text: t('日志'),
        itemKey: 'logs',
        items: [
          {
            text: t('统计图表'),
            itemKey: 'detail',
            to: '/detail',
            icon: <IconPopover />,
            className:
              localStorage.getItem('enable_data_export') === 'true'
                ? 'semi-navigation-item-normal'
                : 'tableHiddle',
            style: { 'marginTop': '0px' },
          },
          {
            text: t('请求日志'),
            itemKey: 'log',
            to: '/log',
            icon: <IconChangelog />,
            style: { 'marginTop': '0px' },
          },
          {
            text: t('绘图记录'),
            itemKey: 'midjourney',
            to: '/midjourney',
            icon: <IconImage />,
            className:
              localStorage.getItem('enable_drawing') === 'true'
                ? 'semi-navigation-item-normal'
                : 'tableHiddle',
            style: { 'marginTop': '0px' },
          },
          {
            text: t('异步任务'),
            itemKey: 'task',
            to: '/task',
            icon: <IconSlider />,
            className:
              localStorage.getItem('enable_task') === 'true'
                ? 'semi-navigation-item-normal'
                : 'tableHiddle',
            style: { 'marginTop': '0px' },
          }
        ]
      },
      {
        text: t('管理'),
        itemKey: 'management',
        items: [
          {
            text: t('渠道管理'),
            itemKey: 'channel',
            to: '/channel',
            icon: <IconTree />,
            className: isAdmin() ? 'semi-navigation-item-normal' : 'tableHiddle',
          },
          {
            text: t('兑换卡密'),
            itemKey: 'redemption',
            to: '/redemption',
            icon: <IconCard />,
            className: isAdmin() ? 'semi-navigation-item-normal' : 'tableHiddle',
          },
          {
            text: t('用户管理'),
            itemKey: 'user',
            to: '/user',
            icon: <IconAvatar />,
            className: isAdmin() ? 'semi-navigation-item-normal' : 'tableHiddle',
          },
          {
            text: t('站点设置'),
            itemKey: 'setting',
            to: '/setting',
            icon: <IconConfig />,
          }
        ]
      },
    ],
    [
      localStorage.getItem('enable_data_export'),
      localStorage.getItem('enable_drawing'),
      localStorage.getItem('enable_task'),
      localStorage.getItem('chat_link'),
      chatItems,
      isAdmin(),
      t,
    ],
  );

  const loadStatus = async () => {
    const res = await API.get('/api/status');
    if (res === undefined) {
      return;
    }
    const { success, data } = res.data;
    if (success) {
      statusDispatch({ type: 'set', payload: data });
      setStatusData(data);
    } else {
      showError('无法正常连接至服务器！');
    }
  };

  // useEffect(() => {
  //   loadStatus().then(() => {
  //     setIsCollapsed(
  //       localStorage.getItem('default_collapse_sidebar') === 'true',
  //     );
  //   });
  //   let localKey = window.location.pathname.split('/')[1];
  //   if (localKey === '') {
  //     localKey = 'home';
  //   }
  //   setSelectedKeys([localKey]);
  //   let chatLink = localStorage.getItem('chat_link');
  //   if (!chatLink) {
  //     let chats = localStorage.getItem('chats');
  //     if (chats) {
  //       // console.log(chats);
  //       try {
  //         chats = JSON.parse(chats);
  //         if (Array.isArray(chats)) {
  //           let chatItems = [];
  //           for (let i = 0; i < chats.length; i++) {
  //             let chat = {};
  //             for (let key in chats[i]) {
  //               chat.text = key;
  //               chat.itemKey = 'chat' + i;
  //               chat.to = '/chat/' + i;
  //             }
  //             // setRouterMap({ ...routerMap, chat: '/chat/' + i })
  //             chatItems.push(chat);
  //           }
  //           setChatItems(chatItems);
  //         }
  //       } catch (e) {
  //         console.error(e);
  //         showError('聊天数据解析失败')
  //       }
  //     }
  //   }
  // }, []);
  // wxDa 2024-12-11 修改第四处 修改聊天子导航上边距为0px
  useEffect(() => {
    let localKey = window.location.pathname.split('/')[1];
    if (localKey === '') {
      localKey = 'home';
    }
    setSelectedKeys([localKey]);

    let chatLink = localStorage.getItem('chat_link');
    if (!chatLink) {
      let chats = localStorage.getItem('chats');
      if (chats) {
        // console.log(chats);
        try {
          chats = JSON.parse(chats);
          if (Array.isArray(chats)) {
            let chatItems = [];
            for (let i = 0; i < chats.length; i++) {
              let chat = {};
              for (let key in chats[i]) {
                chat.text = key;
                chat.itemKey = 'chat' + i;
                chat.to = '/chat/' + i;
                chat.style = { 'marginTop': '0px' };
              }
              // setRouterMap({ ...routerMap, chat: '/chat/' + i })
              chatItems.push(chat);
            }
            setChatItems(chatItems);
          }
        } catch (e) {
          console.error(e);
          showError('聊天数据解析失败')
        }
      }
    }

    setIsCollapsed(localStorage.getItem('default_collapse_sidebar') === 'true');
  }, []);

  return (
    <>
      {/* <Nav
        style={{ maxWidth: 220, height: '100%' }}
        defaultIsCollapsed={
          localStorage.getItem('default_collapse_sidebar') === 'true'
        }
        isCollapsed={isCollapsed}
        onCollapseChange={(collapsed) => {
          setIsCollapsed(collapsed);
        }}
        selectedKeys={selectedKeys}
        renderWrapper={({ itemElement, isSubNav, isInSubNav, props }) => {
          let chatLink = localStorage.getItem('chat_link');
          if (!chatLink) {
            let chats = localStorage.getItem('chats');
            if (chats) {
              chats = JSON.parse(chats);
              if (Array.isArray(chats) && chats.length > 0) {
                for (let i = 0; i < chats.length; i++) {
                  routerMap['chat' + i] = '/chat/' + i;
                }
                if (chats.length > 1) {
                  // delete /chat
                  if (routerMap['chat']) {
                    delete routerMap['chat'];
                  }
                } else {
                  // rename /chat to /chat/0
                  routerMap['chat'] = '/chat/0';
                }
              }
            }
          }
          return (
            <Link
              style={{ textDecoration: 'none' }}
              to={routerMap[props.itemKey]}
            >
              {itemElement}
            </Link>
          );
        }}
        items={headerButtons}
        onSelect={(key) => {
          if (key.itemKey.toString().startsWith('chat')) {
            styleDispatch({ type: 'SET_INNER_PADDING', payload: true });
          } else {
            styleDispatch({ type: 'SET_INNER_PADDING', payload: false });
          }
          setSelectedKeys([key.itemKey]);
        }}
        footer={
          <>
          </>
        }
      >
        <Nav.Footer collapseButton={true}></Nav.Footer>
      </Nav> */}
      {/* wxDa 2024-12-11 修改第五处 默认展开子导航'logs','management' */}
      <Nav
        style={{ maxWidth: 220, height: '100%' }}
        defaultOpenKeys={['logs', 'management']}
        defaultIsCollapsed={
          localStorage.getItem('default_collapse_sidebar') === 'true'
        }
        isCollapsed={isCollapsed}
        onCollapseChange={(collapsed) => {
          setIsCollapsed(collapsed);
        }}
        selectedKeys={selectedKeys}
        renderWrapper={({ itemElement, isSubNav, isInSubNav, props }) => {
          let chatLink = localStorage.getItem('chat_link');
          if (!chatLink) {
            let chats = localStorage.getItem('chats');
            if (chats) {
              chats = JSON.parse(chats);
              if (Array.isArray(chats) && chats.length > 0) {
                for (let i = 0; i < chats.length; i++) {
                  routerMap['chat' + i] = '/chat/' + i;
                }
                if (chats.length > 1) {
                  // delete /chat
                  if (routerMap['chat']) {
                    delete routerMap['chat'];
                  }
                } else {
                  // rename /chat to /chat/0
                  routerMap['chat'] = '/chat/0';
                }
              }
            }
          }
          return (
            <Link
              style={{ textDecoration: 'none' }}
              to={routerMap[props.itemKey]}
            >
              {itemElement}
            </Link>
          );
        }}
        items={headerButtons}
        onSelect={(key) => {
          if (key.itemKey.toString().startsWith('chat')) {
            styleDispatch({ type: 'SET_INNER_PADDING', payload: false });
          } else {
            styleDispatch({ type: 'SET_INNER_PADDING', payload: true });
          }
          setSelectedKeys([key.itemKey]);
        }}
      // footer={
      //   <>
      //   </>
      // }
      >
        {/* <Nav.Footer collapseButton={true}></Nav.Footer> */}
      </Nav>
    </>
  );
};

export default SiderBar;

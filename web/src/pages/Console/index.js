import React, { useContext, useState, useEffect } from 'react';
import { Layout, CardGroup, Card, Avatar, Descriptions, Badge, Divider, Empty } from '@douyinfe/semi-ui';
import { IconUserStroked, IconCoinMoneyStroked, IconPieChartStroked, IconSendStroked } from '@douyinfe/semi-icons';
import { IllustrationSuccess, IllustrationSuccessDark, IllustrationFailure, IllustrationFailureDark, IllustrationNoResult, IllustrationNoResultDark } from '@douyinfe/semi-illustrations';
import { UserContext } from '../../context/User';
import { API, isMobile } from '../../helpers';
import { renderQuota } from '../../helpers/render';
import { useTranslation } from 'react-i18next';

const Console = () => {
  const [userState, userDispatch] = useContext(UserContext);
  const { t, i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);

  const getUserData = async () => {
    let res = await API.get(`/api/user/self`);
    const { success, message, data } = res.data;
    console.log(data)
    if (success) {
      userDispatch({ type: 'login', payload: data });
    }
    //  else {
    //   showError(message);
    // }
  };

  const getUsername = () => {
    if (userState.user) {
      return userState.user.username;
    } else {
      return 'null';
    }
  };

  useEffect(() => {
    if (localStorage.getItem('user')) {
      getUserData().then((res) => {
        console.log("11111");
        console.log(userState);
      });
    }
  }, []);
  
  useEffect(() => {
    const handleLanguageChanged = (lng) => {
      setCurrentLang(lng);
      const iframe = document.querySelector('iframe');
      if (iframe) {
        iframe.contentWindow.postMessage({ lang: lng }, '*');
      }
    };

    i18n.on('languageChanged', handleLanguageChanged);

    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [i18n]);

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
  };


  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // 监听窗口大小变化，更新屏幕宽度的状态
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // 只在组件挂载和卸载的时候执行

  return (
    <>
      <Layout>
        <Layout.Content>
          {/* <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            <Empty
              image={<IllustrationSuccess style={{ width: 150, height: 150 }} />}
              darkModeImage={<IllustrationSuccessDark style={{ width: 150, height: 150 }} />}
              description={'欢迎来到控制台'}
              style={{ padding: 30 }}
            />
          </div> */}
          <CardGroup style={{ width: '100%' }}>
            <Card style={{
              'pointerEvents': 'none',
              width:
                windowWidth < 843
                  ? '100%'
                  : windowWidth < 1425
                    ? 'calc(50% - 8px)'
                    : 'calc(25% - 12px)',
            }}>
              <Descriptions row>
                <Avatar
                  color='blue'
                  size="medium"
                  style={{ marginRight: 10 }}
                >
                  <IconUserStroked size='extra-large' />
                </Avatar>
                <Descriptions.Item itemKey={t('用户名')}>
                  {!localStorage.getItem('user') ? t('未登录') : getUsername()}
                </Descriptions.Item>
              </Descriptions>
            </Card>
            <Card style={{
              'pointerEvents': 'none',
              width:
                windowWidth < 843
                  ? '100%'
                  : windowWidth < 1425
                    ? 'calc(50% - 8px)'
                    : 'calc(25% - 12px)',
            }}>
              <Descriptions row>
                <Avatar
                  color='green'
                  size="medium"
                  style={{ marginRight: 10 }}
                >
                  <IconCoinMoneyStroked size='extra-large' />
                </Avatar>
                <Descriptions.Item itemKey={t('当前余额')}>
                  {!localStorage.getItem('user') ? t('未登录') : renderQuota(userState?.user?.quota)}
                </Descriptions.Item>
              </Descriptions>
            </Card>
            <Card style={{
              'pointerEvents': 'none',
              width:
                windowWidth < 843
                  ? '100%'
                  : windowWidth < 1425
                    ? 'calc(50% - 8px)'
                    : 'calc(25% - 12px)',
            }}>
              <Descriptions row>
                <Avatar
                  color='cyan'
                  size="medium"
                  style={{ marginRight: 10 }}
                >
                  <IconPieChartStroked size='extra-large' />
                </Avatar>
                <Descriptions.Item itemKey={t('历史消耗')}>
                  {!localStorage.getItem('user') ? t('未登录') : renderQuota(userState?.user?.used_quota)}
                </Descriptions.Item>
              </Descriptions>
            </Card>
            <Card style={{
              'pointerEvents': 'none',
              width:
                windowWidth < 843
                  ? '100%'
                  : windowWidth < 1425
                    ? 'calc(50% - 8px)'
                    : 'calc(25% - 12px)',
            }}>
              <Descriptions row>
                <Avatar
                  color='indigo'
                  size="medium"
                  style={{ marginRight: 10 }}
                >
                  <IconSendStroked size='extra-large' />
                </Avatar>
                <Descriptions.Item itemKey={t('请求次数')}>
                  {!localStorage.getItem('user') ? t('未登录') : userState.user?.request_count}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </CardGroup>
          <CardGroup style={{ width: '100%' }}>
            <Card title={t('状态监控')}
              style={{
                alignSelf: 'flex-start',
                marginTop: 20,
                width:
                  windowWidth < 843
                    ? '100%'
                    : windowWidth < 1425
                      ? 'calc(50% - 8px)'
                      : 'calc(40% - 8px)'
              }}
              bodyStyle={{ padding: 0 }}
            >
              <>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center'
                }}>
                  <Empty
                    image={<IllustrationFailure style={{ width: 150, height: 150 }} />}
                    darkModeImage={<IllustrationFailureDark style={{ width: 150, height: 150 }} />}
                    description={t('暂无状态监控')}
                    style={{ padding: 30 }}
                  />
                </div>
              </>
            </Card>
            <Card title={t('常见问题')}
              style={{
                alignSelf: 'flex-start',
                marginTop: 20,
                width:
                  windowWidth < 843
                    ? '100%'
                    : windowWidth < 1425
                      ? 'calc(50% - 8px)'
                      : 'calc(60% - 8px)'
              }}

              bodyStyle={{ padding: 0 }}
            >
              <>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center'
                }}>
                  <Empty
                    image={<IllustrationNoResult style={{ width: 150, height: 150 }} />}
                    darkModeImage={<IllustrationNoResultDark style={{ width: 150, height: 150 }} />}
                    description={t('暂无常见问题')}
                    style={{ padding: 30 }}
                  />
                </div>
              </>
            </Card>
          </CardGroup>
        </Layout.Content>
      </Layout>
    </>
  );
};

export default Console;

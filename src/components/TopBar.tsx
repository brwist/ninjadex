import { SettingFilled } from '@ant-design/icons';
import { Button, Col, Menu, Popover, Row, Select } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import logo from '../assets/head_logo.svg';
import styled from 'styled-components';
import { useWallet } from '../utils/wallet';
import { ENDPOINTS, useConnectionConfig } from '../utils/connection';
import Settings from './Settings';
import CustomClusterEndpointDialog from './CustomClusterEndpointDialog';
import { EndpointInfo } from '../utils/types';
import { notify } from '../utils/notifications';
import { Connection } from '@solana/web3.js';
import WalletConnect from './WalletConnect';
import { getTradePageUrl } from '../utils/markets';

const Rows = styled(Row)`
  background-color: #1f2331;
  padding: 0px 10px;
`;

const LogoWrapper = styled.div`
  text-align: center;
  align-items: center;
  color: #2abdd2;
  font-weight: bold;
  cursor: pointer;
  justify-content: center;
  img {
    height: 50px;
  }
  @media only screen and (max-width: 786px) {
    float: left;
    img {
      height: 35px;
    }
  }
  @media screen and (max-width: 600px) {
    display: flex !important;
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
`;
const WalletConnectmobile = styled.div`
  display: none;
  @media only screen and (max-width: 786px) {
    display: flex;
    float: right;
    margin: 20px;
  }
`;
const WalletConnectdesktop = styled.div`
  display: flex;
  @media only screen and (max-width: 786px) {
    display: none;
  }
`;

const EXTERNAL_LINKS = {
  '/learn': 'https://docs.ninjaprotocol.io/guides',
  '/sol': 'https://docs.ninjaprotocol.io/guides/sol',
  '/ftx': 'https://docs.ninjaprotocol.io/guides/ftx',
  '/binance': 'https://docs.ninjaprotocol.io/guides/binance',
  '/ninjadex': 'https://docs.ninjaprotocol.io/guides/ninjadex',
  '/ninjabot': 'https://docs.ninjaprotocol.io/guides/ninjabot',
};

export default function TopBar() {
  const { connected, wallet } = useWallet();
  const {
    endpoint,
    endpointInfo,
    setEndpoint,
    availableEndpoints,
    setCustomEndpoints,
  } = useConnectionConfig();
  const [addEndpointVisible, setAddEndpointVisible] = useState(false);
  const [testingConnection, setTestingConnection] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const [searchFocussed, setSearchFocussed] = useState(false);

  const handleClick = useCallback(
    (e) => {
      if (!(e.key in EXTERNAL_LINKS)) {
        history.push(e.key);
      }
    },
    [history],
  );

  const onAddCustomEndpoint = (info: EndpointInfo) => {
    const existingEndpoint = availableEndpoints.some(
      (e) => e.endpoint === info.endpoint,
    );
    if (existingEndpoint) {
      notify({
        message: `An endpoint with the given url already exists`,
        type: 'error',
      });
      return;
    }

    const handleError = (e) => {
      console.log(`Connection to ${info.endpoint} failed: ${e}`);
      notify({
        message: `Failed to connect to ${info.endpoint}`,
        type: 'error',
      });
    };

    try {
      const connection = new Connection(info.endpoint, 'recent');
      connection
        .getEpochInfo()
        .then((result) => {
          setTestingConnection(true);
          console.log(`testing connection to ${info.endpoint}`);
          const newCustomEndpoints = [
            ...availableEndpoints.filter((e) => e.custom),
            info,
          ];
          setEndpoint(info.endpoint);
          setCustomEndpoints(newCustomEndpoints);
        })
        .catch(handleError);
    } catch (e) {
      handleError(e);
    } finally {
      setTestingConnection(false);
    }
  };

  const endpointInfoCustom = endpointInfo && endpointInfo.custom;
  useEffect(() => {
    const handler = () => {
      if (endpointInfoCustom) {
        setEndpoint(ENDPOINTS[0].endpoint);
      }
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [endpointInfoCustom, setEndpoint]);

  const tradePageUrl = location.pathname.startsWith('/market/')
    ? location.pathname
    : getTradePageUrl();
  let patth = location.pathname;
  if (location.pathname.split('/')[1] == 'dexlearn') {
    patth = '/dexlearn';
  }

  return (
    <>
      <CustomClusterEndpointDialog
        visible={addEndpointVisible}
        testingConnection={testingConnection}
        onAddCustomEndpoint={onAddCustomEndpoint}
        onClose={() => setAddEndpointVisible(false)}
      />
      <Rows gutter={[0, 3]}>
        <Col xl={4} lg={5} md={6} sm={8} xs={24}>
          <LogoWrapper onClick={() => history.push(tradePageUrl)}>
            <img src={logo} alt="" />
            <WalletConnectmobile>
              {' '}
              <WalletConnect />
            </WalletConnectmobile>
          </LogoWrapper>
        </Col>
        <Col xl={17} lg={16} md={15} sm={13} xs={24}>
          <Menu
            className="midmenu"
            mode="horizontal"
            onClick={handleClick}
            selectedKeys={[patth]}
            style={{
              borderBottom: 'none',
              backgroundColor: 'transparent',
              display: 'flex',
              alignItems: 'end',
              flex: 1,
            }}
          >
            <Menu.Item
              key={tradePageUrl}
              style={{ margin: '0 10px', fontWeight: 700, fontSize: '22x' }}
            >
              <span className="titlemk">Trade</span>
            </Menu.Item>
            {connected &&
              (!searchFocussed || location.pathname === '/balances') && (
                <Menu.Item
                  key="/balances"
                  style={{
                    margin: '0 10px',
                    fontWeight: 700,
                    fontSize: '22px',
                  }}
                >
                  <span className="titlemk">Balances</span>
                </Menu.Item>
              )}
            {connected && (!searchFocussed || location.pathname === '/orders') && (
              <Menu.Item
                key="/orders"
                style={{ margin: '0 10px', fontWeight: 700, fontSize: '22px' }}
              >
                <span className="titlemk">Orders</span>
              </Menu.Item>
            )}

            <Menu.SubMenu
              title="Learn"
              onTitleClick={() =>
                window.open(EXTERNAL_LINKS['/learn'], '_blank')
              }
              style={{ margin: '0 10px', fontWeight: 700, fontSize: '22px' }}
            >
              <Menu.Item key="/sol">
                <a
                  href={EXTERNAL_LINKS['/sol']}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  SOL Wallet Setup Guide
                </a>
              </Menu.Item>
              <Menu.Item key="/ftx">
                <a
                  href={EXTERNAL_LINKS['/ftx']}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Creating FTX Account
                </a>
              </Menu.Item>
              <Menu.Item key="/binance">
                <a
                  href={EXTERNAL_LINKS['/binance']}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Creating Binance Account
                </a>
              </Menu.Item>
              <Menu.Item key="/ninjadex">
                <a
                  href={EXTERNAL_LINKS['/ninjadex']}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Connecting to NINJA-DEX
                </a>
              </Menu.Item>
              <Menu.Item key="/ninjabot">
                <a
                  href={EXTERNAL_LINKS['/ninjabot']}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Setting up NINJA-BOT
                </a>
              </Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </Col>
        <Col
          xl={3}
          lg={3}
          md={3}
          sm={3}
          xs={24}
          className="endmenu"
          style={{ display: 'flex' }}
        >
          {connected && (
            <div style={{ alignSelf: 'center' }}>
              <Popover
                content={<Settings autoApprove={wallet?.autoApprove} />}
                placement="bottomRight"
                title="Settings"
                trigger="click"
              >
                <Button
                  style={{
                    marginRight: 20,
                    background: '#FFFFFF',
                    color: 'transparent',
                    padding: '5px',
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: '4px',
                  }}
                >
                  <SettingFilled
                    style={{
                      color: 'transparent',
                      fontSize: '22px',
                      lineHeight: '0px',
                    }}
                  />
                </Button>
              </Popover>
            </div>
          )}
          <div style={{ alignSelf: 'center' }}>
            <WalletConnectdesktop>
              <WalletConnect />
            </WalletConnectdesktop>
          </div>
        </Col>
      </Rows>
    </>
  );
}

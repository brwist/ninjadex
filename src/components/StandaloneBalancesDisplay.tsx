import { Button, Col, Divider, Popover, Row } from 'antd';
import React, { useState } from 'react';
import FloatingElement from './layout/FloatingElement';
import styled from 'styled-components';
import {
  useBalances,
  useMarket,
  useSelectedBaseCurrencyAccount,
  useSelectedOpenOrdersAccount,
  useSelectedQuoteCurrencyAccount,
  useTokenAccounts,
  getSymbol,
} from '../utils/markets';
import DepositDialog from './DepositDialog';
import { useWallet } from '../utils/wallet';
import logo from '../assets/discord.svg';
import Link from './Link';
import { settleFunds } from '../utils/send';
import { useSendConnection } from '../utils/connection';
import { notify } from '../utils/notifications';
import { Balances } from '../utils/types';
import StandaloneTokenAccountsSelect from './StandaloneTokenAccountSelect';
import LinkAddress from './LinkAddress';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useInterval } from '../utils/useInterval';
import { useLocalStorageState } from '../utils/utils';
import { AUTO_SETTLE_DISABLED_OVERRIDE } from '../utils/preferences';

const RowBox = styled(Row)`
  padding-bottom: 0px;
`;

const Tip = styled.p`
  font-size: 15px;
  padding-top: 5px;
`;

const SettleButton = styled(Button)`
  background-color: #851cef;
  border-color: #851cef;
  border-width: 2px;
  border-radius: 6px;
  color: white;

  &:hover {
    color: #21073c;
    background-color: #851cef;
    border-color: #851cef;
  }
`;

export default function StandaloneBalancesDisplay() {
  const { baseCurrency, quoteCurrency, market } = useMarket();
  const wewe = getSymbol(market?.address.toBase58());
  const balances = useBalances();
  const openOrdersAccount = useSelectedOpenOrdersAccount(true);
  const connection = useSendConnection();
  const { providerUrl, providerName, wallet, connected } = useWallet();
  const [baseOrQuote, setBaseOrQuote] = useState('');
  const baseCurrencyAccount = useSelectedBaseCurrencyAccount();
  const quoteCurrencyAccount = useSelectedQuoteCurrencyAccount();
  const [tokenAccounts] = useTokenAccounts();
  const baseCurrencyBalances =
    balances && balances.find((b) => b.coin === baseCurrency);
  const quoteCurrencyBalances =
    balances && balances.find((b) => b.coin === quoteCurrency);
  const [autoSettleEnabled] = useLocalStorageState('autoSettleEnabled', true);
  const [lastSettledAt, setLastSettledAt] = useState<number>(0);

  async function onSettleFunds() {
    if (!wallet) {
      notify({
        message: 'Wallet not connected',
        description: 'wallet is undefined',
        type: 'error',
      });
      return;
    }

    if (!market) {
      notify({
        message: 'Error settling funds',
        description: 'market is undefined',
        type: 'error',
      });
      return;
    }
    if (!openOrdersAccount) {
      notify({
        message: 'Error settling funds',
        description: 'Open orders account is undefined',
        type: 'error',
      });
      return;
    }
    if (!baseCurrencyAccount) {
      notify({
        message: 'Error settling funds',
        description: 'Open orders account is undefined',
        type: 'error',
      });
      return;
    }
    if (!quoteCurrencyAccount) {
      notify({
        message: 'Error settling funds',
        description: 'Open orders account is undefined',
        type: 'error',
      });
      return;
    }

    try {
      await settleFunds({
        market,
        openOrders: openOrdersAccount,
        connection,
        wallet,
        baseCurrencyAccount,
        quoteCurrencyAccount,
      });
    } catch (e) {
      notify({
        message: 'Error settling funds',
        description: e.message,
        type: 'error',
      });
    }
  }

  useInterval(() => {
    const autoSettle = async () => {
      if (
        AUTO_SETTLE_DISABLED_OVERRIDE ||
        !wallet ||
        !market ||
        !openOrdersAccount ||
        !baseCurrencyAccount ||
        !quoteCurrencyAccount ||
        !autoSettleEnabled
      ) {
        return;
      }
      if (
        !baseCurrencyBalances?.unsettled &&
        !quoteCurrencyBalances?.unsettled
      ) {
        return;
      }
      if (Date.now() - lastSettledAt < 15000) {
        return;
      }
      try {
        console.log('Settling funds...');
        setLastSettledAt(Date.now());
        await settleFunds({
          market,
          openOrders: openOrdersAccount,
          connection,
          wallet,
          baseCurrencyAccount,
          quoteCurrencyAccount,
        });
      } catch (e) {
        console.log('Error auto settling funds: ' + e.message);
        return;
      }
      console.log('Finished settling funds.');
    };
    connected && wallet?.autoApprove && autoSettleEnabled && autoSettle();
  }, 1000);

  const formattedBalances: [
    string | undefined,
    Balances | undefined,
    string,
    string | undefined,
    string | undefined,
  ][] = [
    [
      baseCurrency,
      baseCurrencyBalances,
      'base',
      market?.baseMintAddress.toBase58(),
      wewe?.symbol1,
    ],
    [
      quoteCurrency,
      quoteCurrencyBalances,
      'quote',
      market?.quoteMintAddress.toBase58(),
      wewe?.symbol2,
    ],
  ];
  return (
    <FloatingElement style={{ flex: 1, paddingTop: 0 }}>
      {formattedBalances.map(
        ([currency, balances, baseOrQuote, mint, symbol1], index) => (
          <React.Fragment key={index}>
            <Divider style={{ borderColor: 'white' }}>
              <img
                src={symbol1 ? symbol1 : logo}
                style={{
                  height: '30px',
                  padding: '0px',
                  border: '2px solid #851CEF',
                  borderRadius: '50%',
                }}
              />
              <span style={{ paddingLeft: '15px' }}></span>
              {currency}
              <span
                className="text-white"
                style={{ paddingLeft: '5px' }}
              ></span>

              {mint && (
                <Popover
                  content={<LinkAddress address={mint} />}
                  placement="top"
                  title="Token mint address"
                  trigger="hover"
                >
                  <InfoCircleOutlined style={{ color: '#851CEF' }} />
                </Popover>
              )}
            </Divider>

            {connected && (
              <RowBox align="middle" style={{ paddingBottom: 10 }}>
                <StandaloneTokenAccountsSelect
                  accounts={tokenAccounts?.filter(
                    (account) => account.effectiveMint.toBase58() === mint,
                  )}
                  mint={mint}
                  label
                />
              </RowBox>
            )}

            <RowBox
              align="middle"
              justify="space-between"
              style={{
                marginBottom: '5px',
                padding: '5px 20px 5px 20px',
                borderRadius: '6px',
                color: '#fff',
                background: '#282F3F',
              }}
            >
              <Col>Wallet balance:</Col>
              <Col>{balances && balances.wallet}</Col>
            </RowBox>

            <RowBox
              align="middle"
              justify="space-between"
              style={{
                marginBottom: '20px',
                padding: '5px 20px 5px 20px',
                borderRadius: '6px',
                color: '#fff',
                background: '#282F3F',
              }}
            >
              <Col>Unsettled balance:</Col>
              <Col>{balances && balances.unsettled}</Col>
            </RowBox>
            {(() => {
              switch (index) {
                case 1:
                  return (
                    <>
                      <RowBox>
                        {/*<Col style={{ width: 130 }}>
                                <ActionButton
                                  block
                                  size="large"
                                  style={{backgroundColor: '#4B0082', borderRadius: '6px',color:'white'}}
                                  onClick={() => setBaseOrQuote(baseOrQuote)}
                                >
                                  Deposit
                                </ActionButton>
                              </Col>*/}
                        <Col style={{ width: '100%' }}>
                          <SettleButton
                            block
                            size="large"
                            onClick={onSettleFunds}
                            style={{}}
                          >
                            Settle all funds
                          </SettleButton>
                        </Col>
                      </RowBox>
                      {/*<Tip>
                              All deposits go to your{' '}
                              <Link external to={providerUrl}>
                                {providerName}
                              </Link>{' '}
                              wallet
                            </Tip>*/}
                    </>
                  );
              }
            })()}
          </React.Fragment>
        ),
      )}
      <DepositDialog
        baseOrQuote={baseOrQuote}
        onClose={() => setBaseOrQuote('')}
      />
    </FloatingElement>
  );
}

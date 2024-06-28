/* eslint-disable eqeqeq */
import {observer} from "mobx-react";
import {memo, useEffect, useState} from "react";
import style from "./style.module.scss";
import {Modal} from "antd";
import {useTheme} from "@utils/hooks/useTheme";
import TitleBarUpdated from "@components/users/common-components/title-bar-updated";
import {useStore} from "@stores/root-store";
import CustomButton from "@components/common-components/custom-button";
import {CAP_AMOUNT, CAP_EVENT, HASH_LINK, LOWER_EVENT, LOWER_FILLED, LOWER_OUTLINED} from "@utils/const";
import {ConfirmationModal} from "@components/common-components/confirmation-modal";
import {Radio, Space} from 'antd';
import {
  CAMEL_BET_AMOUNT,
  CAMEL_BET_RATE,
  CAMEL_CREATED_AT,
  CAP_PLACED,
  CAP_POSITIONS,
  CAP_PRICE,
  LOWER_POSITION
} from "@utils/const/TableColumns";
import {ColTextCheck} from "@components/common-components/export-common-components/table-columns-text-check";
import moment from "moment";
import {sortCol} from "@utils/common-functions";
import Table from "@components/common-components/table";
import useWindowSize from "@utils/hooks/useWindowSize";

interface Props {
  open?: any;
  setOpen?: any;
  data?: any;
  setData?: any;
  loadWaitingBetsForManuelData?: any;
}

const TotalBetsDataModal: React.FC<Props> = observer(({
                                                        open,
                                                        loadWaitingBetsForManuelData,
                                                        setOpen,
                                                        data,
                                                        setData,
                                                        ...props
                                                      }) => {
  const theme = useTheme();
  const [isConfirmPopUp, setIsConfirmPopUp] = useState(false);
  const [singleBetId, setSingleBetId] = useState(null);
  const [specificUserBets, setSpecificUserBets] = useState(null);
  const innerWidth = useWindowSize()?.width
  const {
    bet: {cancelSingleBet, loadingSingleBetCancel},
  } = useStore(null);
  const handleCancel = () => {
    setData(null)
    setOpen(false)
  }

  const getUserBetsLength = (userId) => {
    //  console.warn("checklength",specificUserBets?.[userId]?.filter((k) => k?.type == 1)?.length , specificUserBets?.[userId]?.filter((k) => k?.type == 0)?.length )
    return specificUserBets?.[userId]?.filter((k) => k?.type == 1)?.length >= 3 || specificUserBets?.[userId]?.filter((k) => k?.type == 0)?.length >= 3
  }
  const columns = [
    {
      title: HASH_LINK,
      key: 'hashLink',
      render: (text, data, index) => <p>{index + 1}</p>,
    },
    {
      title: CAP_EVENT,
      dataIndex: LOWER_EVENT,
      key: 'event',
      sorter: (a, b) => sortCol(a, b, LOWER_EVENT),
      render: (_, data) => {
        return <div style={{
          display: 'flex',
          whiteSpace: 'nowrap',
          gap: 2,
          color: getUserBetsLength(data?.userId) ? 'red' : ''
        }}>{data?.event || '--'} <span
          style={{color: 'green'}}>{data?.betSession ? `(session${data?.betSession})` : ''}</span></div>
      },
    },
    {
      title: 'Runner Name',
      dataIndex: 'runnerName',
      key: 'runnerName',
      sorter: (a, b) => sortCol(a, b, 'runnerName'),
      render: (_, data) => <div className={data?.multipeResponse?.length > 4 ? 'bg-highlight' : ''}
                                style={{color: getUserBetsLength(data?.userId) ? 'red' : ''}}>{data?.runnerName || '--'}</div>,
    },
    {
      title: 'Back',
      dataIndex: 'backFancyRate',
      key: 'backFancyRate',
      sorter: (a, b) => sortCol(a, b, 'backFancyRate'),
      render: (_, data) => <div style={{color: getUserBetsLength(data?.userId) ? 'red' : ''}}>{data?.backFancyRate || '--'}</div>,
    },
    {
      title: 'Lay',
      dataIndex: 'layFancyRate',
      key: 'layFancyRate',
      sorter: (a, b) => sortCol(a, b, 'layFancyRate'),
      render: (_, data) => <div style={{color: getUserBetsLength(data?.userId) ? 'red' : ''}}>{data?.layFancyRate || '--'}</div>,
    },
    {
      title: 'User',
      dataIndex: 'userId',
      key: 'userId',
      sorter: (a, b) => a?.userId - b?.userId,
      render: (_, data) => {
        return <>
          <p style={{margin: 0, color: getUserBetsLength(data?.userId) ? 'red' : ''}}>{data?.userId || '--'}</p>
          <p style={{margin: 0, color: getUserBetsLength(data?.userId) ? 'red' : ''}}>{data?.userName || '--'}</p>
        </>
      },
    },
    {
      title: "Dealer",
      // dataIndex: "Dealer",
      key: "Dealer",
      render: (_, data) => {
        return (
          <>
            <p
              style={{
                margin: 0,
                color: getUserBetsLength(data?.userId) ? "red" : "",
              }}
            >
              {data?.parentName || "--"}
            </p>
          </>
        );
      },
    },

    // {
    //   title: 'Time',
    //   dataIndex: 'time',
    //   sorter: (a, b) => sortCol(a, b, 'runnerName'),
    //   render: (text, data) => <p>{data?.betTime ? moment(data?.betTime).format('hh:mm A') : "--"}</p>,
    // },
    {
      title: CAP_PRICE,
      dataIndex: CAMEL_BET_RATE,
      key: 'price',
      sorter: (a, b) => a?.betRate - b?.betRate,
      render: (_, data) => {
        return <p style={{
          whiteSpace: 'nowrap',
          color: getUserBetsLength(data?.userId) ? 'red' : ''
        }}>{data?.betRate || '--'}{data?.TargetScore ?
          <span style={{fontWeight: 'bold', color: "green"}}> {`(T: ${data?.TargetScore || '--'})`}</span> : ''}</p>
      },
    },
    // {
    //   title: CAP_POSITIONS,
    //   dataIndex: LOWER_POSITION,
    //   key: 'position',
    //   sorter: (a, b) => a?.position - b?.position,
    //   render: ColTextCheck,
    // },
    {
      title: CAP_AMOUNT,
      dataIndex: CAMEL_BET_AMOUNT,
      key: 'amount',
      sorter: (a, b) => a?.betAmount - b?.betAmount,
      render: (_, data) => <div
        style={{color: getUserBetsLength(data?.userId) ? 'red' : ''}}>{data?.betAmount || '--'}</div>,
    },
    {
      title: "Longitude",
      dataIndex: "longitude",
      key: 'longitude',
      render: (_, data) => <div>{data?.locationData?.longitude || '--'}</div>,
    },
    {
      title: "Latitude",
      dataIndex: "latitude",
      key: 'latitude',
      render: (_, data) => <div>{data?.locationData?.latitude || '--'}</div>,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: 'address',
      render: (_, data) => <div>{data?.locationData?.address || '--'}</div>,
    },
    {
      title: "Bet From",
      dataIndex: "device",
      key: 'device',
      render: (_, data) => <div>{data?.device || '--'}</div>,
    },
    {
      title: "VPN",
      dataIndex: "vpn",
      key: 'vpn',
      render: (_, data) => <div>{data?.vpn ? "Yes" : "No"}</div>,
    },
    {
      title: CAP_PLACED,
      dataIndex: CAMEL_CREATED_AT,
      key: 'createdAt',
      sorter: (a, b) => a?.betTime - b?.betTime,
      render: (text, data) => <p
        style={{color: getUserBetsLength(data?.userId) ? 'red' : ''}}> {data?.betTime ? moment(new Date(data?.betTime)).format('YYYY-MM-DD hh:mm:ss a') : '--'}</p>,
    },
    {
      title: 'Rates Record',
      dataIndex: 'ratesRecord',
      key: 'ratesRecord',
      render: (text, data) => {
        return <p style={{margin: 0, padding: 0, display: 'flex', gap: '8px'}}>{
          data?.ratesRecord?.length ? data?.ratesRecord?.map((item) => {
            return <p style={{margin: 0, color: getUserBetsLength(data?.userId) ? 'red' : ''}}>{item}</p>
          }) : '--'
        }</p>
      }
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text, data) => {
        return <div>
          <CustomButton className={style.btnStyles} title="Cancel" onClick={() => {
            setIsConfirmPopUp(true);
            setOpen(false);
            setSingleBetId(data?._id);
          }}/>
        </div>
      }
    },
  ];
  const handleConfirmCancel = () => {
    setIsConfirmPopUp(false);
    setOpen(true);
  }

  const saveHandler = async () => {
    setOpen(false)
    const payload = {
      betId: singleBetId
    }
    const res = await cancelSingleBet(payload);
    if (res?.success) {
      setIsConfirmPopUp(false)
      loadWaitingBetsForManuelData();
    }
  }

  const rowClassName = (record, index) => {
    if (record?.type === 1) {
      if (record?.isfancyOrbookmaker && record?.fancyData) {
        return style.BackRow;
      } else {
        return style.redrow;
      }
    } else {
      if (record?.isfancyOrbookmaker && record?.fancyData) {
        return style.redrow
      } else {
        return style.BackRow
      }
    }

  };
  useEffect(() => {
    const users = [];
    const userBets = {}
    data?.forEach((item, index) => {
      if (users?.findIndex((i) => i === item?.userId) === -1) {
        users?.push(item?.userId)
      }
    })
    users?.forEach((item2) => {
      userBets[item2] = data?.filter((userBets) => userBets?.userId === item2)
    })
    setSpecificUserBets(userBets)
  }, [data]);

  return (
    <div className={style.mainWrapper}>
      <Modal
        open={open}
        title={<TitleBarUpdated title={'Active Bets List'} isButton={true} btnTitle={'Close'}
                                clickHandler={handleCancel}/>}
        closable={false}
        onCancel={handleCancel}
        width={innerWidth >= 500 ? 1000 : 'auto'}
        style={{height: 300}}
        className={theme + " " + style.resultModal}
        forceRender={true}
        footer={[]}
      >
        <div>

          <Table
            className={style.tableStyle}
            dataSource={data?.length ? data : []}
            loading={false}
            columns={columns}
            // responseCountParam={getUserBetsTotal?  getUserBetsTotal?.toString(): '0'}
            // setPageNumber={setPageNumber}
            // queryParam={{ page: pageNumber, numRecords: entries }}
            rowClassName={rowClassName}

          />
        </div>

      </Modal>
      <ConfirmationModal modelTitle="Cancel Single Bet" isOpen={isConfirmPopUp} onCancel={handleConfirmCancel}
                         isConfirmDisable={loadingSingleBetCancel} loadingConfirmBtn={loadingSingleBetCancel}
                         onConfirm={saveHandler}/>
    </div>
  );
});

export default memo(TotalBetsDataModal);

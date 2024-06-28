import Table from "@components/common-components/table";
import { useEffect, useState } from "react";
import styled from "styled-components";
import style from "./style.module.scss";
import {
  formatLargeNumber,
  getSingleUrlParam,
} from "@utils/common-functions";
import useWindowSize from "@utils/hooks/useWindowSize";
import { useStore } from "@stores/root-store";
import { useLocation } from "react-router-dom";
import TitleBarUpdated from "@components/users/common-components/title-bar-updated";

export const ViewFakeBetsOfOddsDataAfterAndBefore = () => {
  const innerWidth = useWindowSize().width;
  const location = useLocation();
  const sportsId = getSingleUrlParam(location, "sportsId");
  const eventId = getSingleUrlParam(location, "id");
  const [fakeBetData, setFakeBetData] = useState(null);
  const {
    bet: { loadAllFakeBetsOddsData, loadingAllFakeBetsOddsData },
  } = useStore(null);
  const handleFakeBetsOdds = async () => {
    const response = await loadAllFakeBetsOddsData(eventId, sportsId);
    if (response?.success) {
      setFakeBetData(response?.AfterBetOdds);
    }
  };
  useEffect(()=>{
    window.scrollTo(0, 0);
}, []);
  useEffect(() => {
    handleFakeBetsOdds();
  }, [eventId]);
  const columns = [
    {
      title: "EventId",
      width:'20%',
      render: (_, data) => <p>1234567</p>,
    },
    {
      title: "Match Name",
      width:'20%',
      render: (_, data) => <p>{data?.runnerName}</p>,
    },
    {
      title: "date&time",
      width:'20%',
      render: (_, data) => <p>23 jul</p>,
    },
    {
      title: (
        <div style={{ display: "flex", gap:4 }}>
          <TableTitle
            newWidth={innerWidth > 890 ? 195 : 60}
            align={innerWidth > 890 ? "flex-end" : "center"}
            marginSet={innerWidth > 890 ? 0 : 5}
            paddingSet={innerWidth > 890 ? 12 : 0}
          >
            Back
          </TableTitle>
          <TableTitle
            newWidth={innerWidth > 890 ? 195 : 60}
            align={innerWidth > 890 ? "flex-start" : "center"}
            // marginSet={innerWidth > 890 ? 0 : 5}
            paddingSet={innerWidth > 890 ? 12 : 0}
          >
            Lay
          </TableTitle>
        </div>
      ),
      width:'40%',
      render: (_, data, ind) => {
        if(data?.Status!=='ACTIVE'){
          return(<div className={style.statusCard}><span>test</span></div>)
        }else{
        return (
          <div style={{ display: "flex", paddingLeft:6}}>
            <div>
              {innerWidth > 890 ? (
                <div style={{ display: "flex" }}>
                  {data?.ExchangePrices?.AvailableToBack?.map((item, index) => {
                    return (
                      <>
                        {data?.ExchangePrices?.AvailableToBack?.length === 1 ? (
                          <>
                            <BackValueWrraper
                              bg={"#8DD2F0"}
                              hoverBg={"#8DD2F0"}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  flexDirection: "column",
                                }}
                              >
                                <BackValues>{""}</BackValues>
                                <TotalValues>{""}</TotalValues>
                              </div>
                            </BackValueWrraper>
                            <BackValueWrraper
                              bg={"#8DD2F0"}
                              hoverBg={"#8DD2F0"}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  flexDirection: "column",
                                }}
                              >
                                <BackValues>{""}</BackValues>
                                <TotalValues>{""}</TotalValues>
                              </div>
                            </BackValueWrraper>
                            <BackValueWrraper
                              bg={"#8DD2F0"}
                              hoverBg={"#8DD2F0"}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  flexDirection: "column",
                                }}
                              >
                                <BackValues>
                                  {item?.price ? item?.price : 0}
                                </BackValues>
                                <TotalValues>
                                  {item?.size
                                    ? formatLargeNumber(item?.size, 1)
                                        ?.toString()
                                        ?.replace(".0", "")
                                    : "0"}
                                </TotalValues>
                              </div>
                            </BackValueWrraper>
                          </>
                        ) : (
                          <BackValueWrraper bg={"#8DD2F0"} hoverBg={"#8DD2F0"}>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "column",
                              }}
                            >
                              <BackValues>
                                {item?.price ? item?.price : 0}
                              </BackValues>
                              <TotalValues>
                                {item?.size
                                  ? formatLargeNumber(item?.size, 1)
                                      ?.toString()
                                      ?.replace(".0", "")
                                  : "0"}
                              </TotalValues>
                            </div>
                          </BackValueWrraper>
                        )}
                      </>
                    );
                  })}
                </div>
              ) : (
                <div style={{ display: "flex" }}>
                  {data?.ExchangePrices?.AvailableToBack?.slice(0, 1)?.map(
                    (item, index) => {
                      return (
                        <BackValueWrraper bg={"#8DD2F0"} hoverBg={"#8DD2F0"}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              flexDirection: "column",
                            }}
                          >
                            <BackValues>
                              {item?.price ? item?.price : 0}
                            </BackValues>
                            <TotalValues>
                              {item?.size
                                ? formatLargeNumber(item?.size, 1)
                                    ?.toString()
                                    ?.replace(".0", "")
                                : "0"}
                            </TotalValues>
                          </div>
                        </BackValueWrraper>
                      );
                    }
                  )}
                </div>
              )}
            </div>
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <div>
                {innerWidth > 890 ? (
                  <div style={{ display: "flex" }}>
                    {data?.ExchangePrices?.AvailableToLay?.map(
                      (item, index) => {
                        return (
                          <>
                            {data?.ExchangePrices?.AvailableToLay?.length ===
                            1 ? (
                              <>
                                <BackValueWrraper
                                  bg={"#FFAFB2"}
                                  hoverBg={"#FFAFB2"}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      flexDirection: "column",
                                    }}
                                  >
                                    <BackValues>
                                      {item?.price ? item?.price : 0}
                                    </BackValues>
                                    <TotalValues>
                                      {item?.size
                                        ? formatLargeNumber(item?.size, 1)
                                            ?.toString()
                                            ?.replace(".0", "")
                                        : "0"}
                                    </TotalValues>
                                  </div>
                                </BackValueWrraper>
                                <BackValueWrraper
                                  bg={"#FFAFB2"}
                                  hoverBg={"#FFAFB2"}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      flexDirection: "column",
                                    }}
                                  >
                                    <BackValues>{""}</BackValues>
                                    <TotalValues>{""}</TotalValues>
                                  </div>
                                </BackValueWrraper>
                                <BackValueWrraper
                                  bg={"#FFAFB2"}
                                  hoverBg={"#FFAFB2"}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      flexDirection: "column",
                                    }}
                                  >
                                    <BackValues>{""}</BackValues>
                                    <TotalValues>{""}</TotalValues>
                                  </div>
                                </BackValueWrraper>
                              </>
                            ) : (
                              <BackValueWrraper
                                bg={"#FFAFB2"}
                                hoverBg={"#FFAFB2"}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    flexDirection: "column",
                                  }}
                                >
                                  <BackValues>
                                    {item?.price ? item?.price : 0}
                                  </BackValues>
                                  <TotalValues>
                                    {item?.size
                                      ? formatLargeNumber(item?.size, 1)
                                          ?.toString()
                                          ?.replace(".0", "")
                                      : "0"}
                                  </TotalValues>
                                </div>
                              </BackValueWrraper>
                            )}
                          </>
                        );
                      }
                    )}
                  </div>
                ) : (
                  <div style={{ display: "flex" }}>
                    {data?.ExchangePrices?.AvailableToLay?.slice(0, 1)?.map(
                      (item, index) => {
                        return (
                          <BackValueWrraper bg={"#FFAFB2"} hoverBg={"#FFAFB2"}>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "column",
                              }}
                            >
                              <BackValues>
                                {item?.price ? item?.price : 0}
                              </BackValues>
                              <TotalValues>
                                {item?.size
                                  ? formatLargeNumber(item?.size, 1)
                                      ?.toString()
                                      ?.replace(".0", "")
                                  : "0"}
                              </TotalValues>
                            </div>
                          </BackValueWrraper>
                        );
                      }
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
       }
      },
    }
  ];
  return (
    <div style={{ padding: "10PX" }}>
      <div className={style.fakeBetWrapper}>
        <TitleBarUpdated title={"Fake Bet Odds"}/>
        <div style={{marginTop: '10px'}}>
        <Table
            loading={loadingAllFakeBetsOddsData}
          checkPagination={false}
          dataSource={fakeBetData}
          columns={columns}
        />
        </div>
      </div>
    </div>
  );
};

const BackValueWrraper = styled.span<{ bg?: string; hoverBg?: string }>`
  width: 60px;
  margin-left: 5px;
  margin-top: 3px;
  padding: 6px 0px;
  // height: 50px;
  display: flex;
  color: #121212;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  // flex-direction: column;
  background-color: ${(p) => (p.bg ? p.bg : "#eeee")};
  .changeBackground {
    background-color: yellow !important;
    transition: background-color 0.5s !important;
  }
  &:hover {
    background-color: ${(p) => p.hoverBg};
    cursor: pointer;
  }
`;

const BackValues = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: #121212;
`;

const TableTitle = styled.span<{
  newWidth?: number;
  align?: any;
  marginSet?: any;
  paddingSet?: any;
}>`
  width: ${(p) => p?.newWidth}px;
  height: 20px;
  display: flex;
  justify-content: ${(p) => (p?.align ? p?.align : "flex-end")};
  margin-left: ${(p) => p?.marginSet}px;
  padding-left: ${(p) => p?.paddingSet}px;
  padding-right: ${(p) => p?.paddingSet}px;
  color: #fff;
  align-items: center;
  background-color: #121212;
`;
const TotalValues = styled.span`
  color: #121212;
`;

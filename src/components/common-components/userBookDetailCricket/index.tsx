import { useEffect, useState } from "react";
import style from "./style.module.scss";
import CustomButton from "../custom-button";
import {
  CAP_ENTRIES,
  CAP_SEARCH,
  CAP_SHOW,
  LOWER_OUTLINED,
  LOWER_SUBMIT,
} from "@utils/const";
import { getSingleUrlParam, sortCol } from "@utils/common-functions";
import { useLocation } from "react-router-dom";
import TitleBarUpdated from "@components/users/common-components/title-bar-updated";
import { useStore } from "@stores/root-store";
import { Empty } from "antd";
export const UserBookDetailCricket = () => {
  const {
    bet: { loadSportBook },
  } = useStore(null);
  const dummyGameArray = ["All", "My Users"];
  const [activeElement, setActiveElement] = useState(dummyGameArray[0]);
  const [entries, setEntries] = useState("10");
  const [pageNumber, setPageNumber] = useState(1);
  const [options] = useState([10, 100, 250, 500, 1000]);
  const [search, setSearch] = useState("");
  const [sportBookData, setSportBookData] = useState([]);

  const [parentData, setParentData] = useState({ winning: 0, loosing: 0 });

  const [sportBookAllData, setSportBookAllData] = useState([]);
  const location = useLocation();
  const receivedData = location.state;
  const matchId = getSingleUrlParam(location, "id");
  const queryMarketId = getSingleUrlParam(location, "marketId");
  const eventName = JSON.parse(localStorage.getItem("userBookEvent"));
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Grouping data by username and summing up values for each runner
  const groupedData = sportBookData.reduce((acc, result) => {
    const existingUser = acc.find((item) => item.username === result.username);

    if (existingUser) {
      existingUser.runners.forEach((runner, index) => {
        runner.value +=
          runner.runnerName === result._id.runnerName
            ? result.totalWinningAmount || 0
            : -result.totalLoosingAmount || 0;
      });
    } else {
      const newUser = {
        username: result.username,
        runners: result.runners.map((runner) => ({
          runnerName: runner.runnerName,
          value:
            runner.runnerName === result._id.runnerName
              ? result.totalWinningAmount || 0
              : -result.totalLoosingAmount || 0,
        })),
      };

      acc.push(newUser);
    }

    return acc;
  }, []);

  useEffect(() => {
    loadSportBookData();
  }, [receivedData]);

  const loadSportBookData = async () => {
    const payload = {
      matchId: matchId,
      myUser: "",
    };
    if (matchId) {
      const res = await loadSportBook(payload);
      console.log(res?.results, "res?.results");
      const filterUserBook = res?.results?.filter(
        (item) => Number(item?.marketId) === Number(queryMarketId)
      );

      if (res?.results?.length) {
        const data = res.results;
        var x = 0;
        var y = 0;
        for (let i = 0; i < data.length; i++) {
          y +=
            data[i].totalLoosingAmount *
            (data[i].parentInfo[0].downLineShare / 100);

          x +=
            data[i].totalWinningAmount *
            (data[i].parentInfo[0].downLineShare / 100);
        }
        console.log(y);
        console.log(x);
        setParentData({ ...parentData, winning: y, loosing: x });
        setSportBookData(filterUserBook);
        setSportBookAllData(filterUserBook);
      }
    }
  };

  const handleChange = (e) => {
    setSearch(e?.target?.value);
    const filterData = sportBookAllData?.filter((z) =>
      z?.username?.toLowerCase()?.includes(e?.target?.value?.toLowerCase())
    );
    setSportBookData(filterData);
  };

  return (
    <div className={style.mainWrapper}>
      <TitleBarUpdated
        title={eventName?.cricket || ""}
        isButton={true}
        btnTitle={"Refresh"}
      />

      <div className={style.marginTopClass}>
        <div className={style.headerBtnCard}>
          <div className={`${style.usersHeaderBtnContainer}`}>
            <div className={style.btnContainer}>
              {dummyGameArray?.length > 0 &&
                dummyGameArray?.map((item, index) => {
                  return (
                    <CustomButton
                      key={index}
                      className={
                        activeElement === item
                          ? style.activeButton
                          : style.headerButtons
                      }
                      variant={LOWER_OUTLINED}
                      htmlType={LOWER_SUBMIT}
                      onClick={() => {
                        setActiveElement(item);
                      }}
                      title={item}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </div>

      <div className={style.marginTopClass}>
        <div className={style.flexSpaceBetweenClass}>
          <div className={style.entriesData}>
            <label>{CAP_SHOW} </label>
            <select
              className={style.inputHeight}
              id="entries"
              value={entries}
              onChange={(e) => {
                setPageNumber(1);
                setEntries(e?.target?.value);
              }}
            >
              {options.map((item) => {
                return (
                  <option label={item?.toString()} className={style.inputColor}>
                    {item}{" "}
                  </option>
                );
              })}
            </select>
            <label> {CAP_ENTRIES}</label>
          </div>

          <div className={style.entriesData}>
            <label>{CAP_SEARCH}: </label>
            <input
              value={search}
              placeholder="search by user name"
              className={style.inputHeight}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
        </div>
      </div>

      {/* here we start */}

      <div style={{ marginTop: "10px" }}>
        <div className="">
          {sportBookData?.length ? (
            <div className={style.tableWrapper}>
              <h4 style={{ margin: 4 }}>{sportBookData[0]?.marketName[0]}</h4>
              <table className={style.customTable}>
                <thead>
                  <tr>
                    <th>Username</th>
                    {sportBookData[0]?.runners?.map((runner, index) => (
                      <th key={index}>{runner?.runnerName}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {groupedData.map((result, index) => (
                    <tr key={index}>
                      <td>{result.username}</td>

                      {result.runners.map((runner, runnerIndex) => (
                        <td
                          key={runnerIndex}
                          style={{
                            color: runner.value >= 0 ? "green" : "red",
                          }}
                        >
                          {runner.value.toFixed(0)}
                        </td>
                      ))}
                    </tr>
                  ))}
                  {activeElement === "All" &&
                    sportBookData[0]?.parentInfo &&
                    sportBookData[0]?.parentInfo.length > 0 && (
                      <tr>
                        <td>{sportBookData[0]?.parentInfo[0].username}</td>

                        <td
                        style={{color: 'green'}}
                        // key={index}
                        // style={{
                        //   color:
                        //     runner?.runnerName ===
                        //     sportBookData[0]?._id?.runnerName
                        //       ? "red"
                        //       : "green",
                        // }}
                        >
                          {/* {runner?.runnerName ===
                            sportBookData[0]?._id?.runnerName
                              ? -(
                                  (sportBookData[0]?.totalWinningAmount *
                                    sportBookData[0]?.parentInfo[0]
                                      .downLineShare) /
                                  100
                                )?.toFixed(0)
                              : (
                                  (sportBookData[0]?.totalLoosingAmount *
                                    sportBookData[0]?.parentInfo[0]
                                      .downLineShare) /
                                  100
                                )?.toFixed(0)} */}

                            {parentData?.winning > 0 &&
                            parentData.winning.toFixed(0)}
                        </td>

                        <td style={{color: 'red'}}>
  {parentData?.loosing > 0 && parentData.loosing.toFixed(0)}
</td>

                        {/* 
                        {sportBookData[0]?.runners.map((runner, index) => (
                          <td
                            key={index}
                            style={{
                              color:
                                runner?.runnerName ===
                                sportBookData[0]?._id?.runnerName
                                  ? "red"
                                  : "green",
                            }}
                          >
                            {runner?.runnerName ===
                            sportBookData[0]?._id?.runnerName
                              ? -(
                                  (sportBookData[0]?.totalWinningAmount *
                                    sportBookData[0]?.parentInfo[0]
                                      .downLineShare) /
                                  100
                                )?.toFixed(0)
                              : (
                                  (sportBookData[0]?.totalLoosingAmount *
                                    sportBookData[0]?.parentInfo[0]
                                      .downLineShare) /
                                  100
                                )?.toFixed(0)}
                          </td>
                        ))} */}
                      </tr>
                    )}
                </tbody>
              </table>
            </div>
          ) : (
            <Empty className={style.emptyBox} />
          )}
        </div>
      </div>
    </div>
  );
};

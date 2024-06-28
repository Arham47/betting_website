import { observer } from "mobx-react";
import { memo, useEffect, useState } from "react";
import style from "./style.module.scss";
import { Col, Row } from "antd";
import { CAP_ENTRIES, CAP_SEARCH, CAP_SHOW, DOUBLE_DASH } from "@utils/const";
import useWindowSize from "@utils/hooks/useWindowSize";
import { BiMinusCircle, BiPlusCircle } from "react-icons/bi";

interface Props {}
const AccountStateMent: React.FC<Props> = observer(({ ...props }) => {
  const [entries, setEntries] = useState("10");
  const [options] = useState([10, 25, 50, 100]);
  const [isShowData, setIsShowData] = useState([]);
  const data = useWindowSize().width;
  const [search, setSearch] = useState("");
const dummyArray = [
  {
    runner: 'impress Rockets',
    price: 37500,
    size: 500,
    side: 'B',
    PL: -500,
    placeAt: '6/9/2023 12:33:42 pm',
    matcheAt: '6/9/2023 12:33:42 pm',
    settleAt: '6/9/2023 12:33:42 pm',
    customer: 'mmabatter',
    dealer: 'mmafinalmaster',
    orderId: '1380873077',
    fullod: '348@3.65-124@3.7-21@3.75==77@3.8-153@3.85-254@3.9'
  }
]
useEffect(()=>{
  window.scrollTo(0, 0);
}, []);
  const handleChange = (e) => {
    setSearch(e?.target?.value);
  };
  return (
    <div className={style.mainWrraper}>
      <Row>
        <Col span={8}>
          <div className={style.rowOne}>
            <div>Winner</div>
            <div className={style.rowContentWrapper}>8. Zipping Lennox</div>
          </div>
        </Col>
        <Col span={8}>
          <div className={style.rowOne}>
            <div>Net PL</div>
            <div className={style.rowContentWrapper}>5000</div>
          </div>
        </Col>
        <Col span={8}>
          <div className={style.rowOne}>
            <div>Winner</div>
            <div className={style.rowContentWrapper}>mmabatter</div>
          </div>
        </Col>
      </Row>
      <div className={style.flexMargin}>
        <div>
        <div className={style.entriesData}>
              <label>{CAP_SHOW} </label>
              <select
                className={style.inputHeight}
                id="entries"
                value={entries}
                onChange={(e) => {
                  setEntries(e?.target?.value);
                }}
              >
                {options.map((item) => {
                  return (
                    <option
                      label={item?.toString()}
                      className={style.inputColor}
                    >
                      {item}{" "}
                    </option>
                  );
                })}
              </select>
              <label> {CAP_ENTRIES}</label>
            </div>
        </div>
        <div>
        <div className={style.entriesData}>
          <label>{CAP_SEARCH}: </label>
          <input
            value={search}
            className={style.inputHeight}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>
        </div>
      </div>
      <div className={style.tableWrapperClass}>
      <table className={style.newtable}>
          <thead>
            <tr className={style.theadUnColor}>
              <th className={style.width16}>Runner</th>
              <th className={style.width9}>Price</th>
              {data > 450 && data <= 850 ? (
                <>
                  <th className={style.width9}>{'Size'}</th>
                </>
              ) : data > 850 && data <= 1170 ? (
                <>
                  {" "}
                  <th className={style.width9}>{'Size'}</th>
                  <th className={style.width9}>{'Side'}</th>
                  <th className={style.width9}>{'P/L'}</th>
                  <th className={style.width9}>{'PlaceAt'}</th>
                  <th className={style.width9}>{'Matched At'}</th>
                </>
              ) : data > 1170 ? (
                <>
                  <th className={style.width9}>{'Size'}</th>
                  <th className={style.width10}>{'Side'}</th>
                  <th className={style.width10}>{'P/L'}</th>
                  <th className={style.width10}>{'PlaceAt'}</th>
                  <th className={style.width10}>{'Matched At'}</th>
                  <th className={style.width10}>{'Settled At'}</th>
                  <th className={style.width20}>{'Customer'}</th>
                  <th className={style.width20}>{'Dealer'}</th>
                  <th className={style.width20}>{'Order-ID'}</th>
                  <th className={style.width20}>{'fullOdds'}</th>
                </>
              ) : (
                ""
              )}
            </tr>
          </thead>
          <tbody>
            { dummyArray?.length ? (
              dummyArray?.map((item, index) => {
                return (
                  <>
                    {" "}
                    <tr key={index}>
                      <td className={style.onlyWidth16}>
                        <div className={style.userNameWrapper}>
                        {data<1170 ? <div className={style.tooltipWrraper}>
                            {isShowData?.length ? <BiMinusCircle className={style.minusIcon}
                              style={{ fontSize: "15px" }}
                              onClick={() => {
                                const data = isShowData?.find(
                                  (z) => z === item?.orderId
                                );
                                if (data) {
                                  const filterData = isShowData?.filter(
                                    (z) => z !== item?.orderId
                                  );
                                  setIsShowData(filterData);
                                } else {
                                  setIsShowData([...isShowData, item?.orderId]);
                                }
                              }}
                            />:
                            <BiPlusCircle className={style.plusIcon}
                              style={{ fontSize: "15px" }}
                              onClick={() => {
                                const data = isShowData?.find(
                                  (z) => z === item?.orderId
                                );
                                if (data) {
                                  const filterData = isShowData?.filter(
                                    (z) => z !== item?.orderId
                                  );
                                  setIsShowData(filterData);
                                } else {
                                  setIsShowData([...isShowData, item?.orderId]);
                                }
                              }}
                            />
                            }
                          </div> : ''}
                          <div
                          >
                              {item?.runner || DOUBLE_DASH}
                          </div>
                          
                        </div>
                      </td>
                      <td className={style.width9}>
                        {item?.price}
                      </td>
                      {data > 450 && data <= 850 ? (
                        <td className={style.width9}>{item?.size}</td>
                      ) : data > 850 && data <= 1170 ? (
                        <>
                          <td className={style.width9}>{item?.size}</td>
                          <td className={style.width9}>{item?.side}</td>
                          <td className={style.width9}>{item?.PL}</td>
                          <td className={style.width9}>
                            {item?.placeAt || 0}
                          </td>
                          <td className={style.width9}>
                            {item?.matcheAt || 0}
                          </td>
                        </>
                      ) : data > 1170 ? (
                        <>
                          <td className={style.width9}>{item?.size}</td>
                          <td className={style.width10}>{item?.side}</td>
                          <td className={style.width10}>{item?.PL}</td>
                          <td className={style.width10}>
                            {item?.placeAt || 0}
                          </td>
                          <td className={style.width10}>
                            {item?.matcheAt || 0}
                          </td>
                          <td className={style.width10}>
                            {item?.settleAt}
                          </td>
                          <td className={style.width20}>
                            <div className={style.userIcons}>
                              {item?.customer}
                            </div>
                          </td>
                          <td className={style.width20}>
                            <div className={style.userIcons}>
                              {item?.dealer}
                            </div>
                          </td> <td className={style.width20}>
                            <div className={style.userIcons}>
                              {item?.orderId}
                            </div>
                          </td> <td className={style.width20}>
                            <div className={style.userIcons}>
                              {item?.fullod}
                            </div>
                          </td>
                        </>
                      ) : (
                        ""
                      )}
                    </tr>
                    {isShowData?.find((z) => z === item?.orderId) && data < 450 ? (
                      <tr>
                        {" "}
                        {/* <ul className={style.paddingLeft22}> */}
                          <div className={style.listStyleFont14}>
                            <b>{'Size'}: </b>{" "}
                            <span className={style.paddingLeft10}>
                              {item?.size}
                            </span>
                          </div>
                          <div className={style.listStyleFont14}>
                            <b>{'Side'}: </b>{" "}
                            <span className={style.paddingLeft10}>
                              {item?.side}
                            </span>
                          </div>
                          <div className={style.listStyleFont14}>
                            <b>{'P/L'}:</b>{" "}
                            <span className={style.paddingLeft10}>
                              {item?.PL}
                            </span>
                          </div>
                          <div className={style.listStyleFont14}>
                            <b>{'PlaceAt'}:</b>{" "}
                            <span className={style.paddingLeft10}>
                              {item?.placeAt}
                            </span>
                          </div>
                          <div className={style.listStyleFont14}>
                            <b>{'Matched At'}:</b>{" "}
                            <span className={style.paddingLeft10}>
                              {item?.matcheAt}
                            </span>
                          </div>
                          <div className={style.listStyleFont14}>
                            <b>{'Settled At'}:</b>{" "}
                            <span className={style.paddingLeft10}>
                              {item?.settleAt}
                            </span>
                          </div>
                          <div className={style.listStyleFont14}>
                            <div className={style.listStyleOption}>
                              <b> {'Customer'}:</b>
                              {"   "}
                              <div
                                style={{ display: "flex" }}
                                className={style.userIcons}
                              >
                                {item?.customer}
                              </div>
                            </div>
                          </div>

                          <div className={style.listStyleFont14}>
                            <div className={style.listStyleOption}>
                              <b> {'Dealer'}:</b>
                              {"   "}
                              <div
                                style={{ display: "flex" }}
                                className={style.userIcons}
                              >
                                {item?.dealer}
                              </div>
                            </div>
                          </div>
                          <div className={style.listStyleFont14}>
                            <div className={style.listStyleOption}>
                              <b> {'Order-ID'}:</b>
                              {"   "}
                              <div
                                style={{ display: "flex" }}
                                className={style.userIcons}
                              >
                                {item?.orderId}
                              </div>
                            </div>
                          </div>
                          <div className={style.listStyleFont14}>
                            <div className={style.listStyleOption}>
                              <b> {'FullOdds'}:</b>
                              {"   "}
                              <div
                                style={{ display: "flex" }}
                                className={style.userIcons}
                              >
                                {item?.fullod}
                              </div>
                            </div>
                          </div>
                        {/* </ul> */}
                      </tr>
                    ) : isShowData?.find((z) => z === item?.orderId) &&
                      data <= 850 ? (
                      <tr>
                        {" "}
                        <td colSpan={3}>
                          <div className={style.listStyleFont14}>
                            <b>{'Side'}: </b>{" "}
                            <span className={style.paddingLeft10}>
                              {item?.side}
                            </span>
                          </div>
                          <div className={style.listStyleFont14}>
                            <b>{'P/L'}:</b>{" "}
                            <span className={style.paddingLeft10}>
                              {item?.PL}
                            </span>
                          </div>
                          <div className={style.listStyleFont14}>
                            <b>{'PlaceAt'}:</b>{" "}
                            <span className={style.paddingLeft10}>
                              {item?.placeAt}
                            </span>
                          </div>
                          <div className={style.listStyleFont14}>
                            <b>{'Matched At'}:</b>{" "}
                            <span className={style.paddingLeft10}>
                              {item?.matcheAt}
                            </span>
                          </div>
                          <div className={style.listStyleFont14}>
                            <b>{'Settled At'}:</b>{" "}
                            <span className={style.paddingLeft10}>
                              {item?.settleAt}
                            </span>
                          </div>
                          <div className={style.listStyleFont14}>
                            <div className={style.listStyleOption}>
                              <b> {'Customer'}:</b>
                              {"   "}
                              <div
                                style={{ display: "flex" }}
                                className={style.userIcons}
                              >
                                {item?.customer}
                              </div>
                            </div>
                          </div>
                          <div className={style.listStyleFont14}>
                            <div className={style.listStyleOption}>
                              <b> {'Dealer'}:</b>
                              {"   "}
                              <div
                                style={{ display: "flex" }}
                                className={style.userIcons}
                              >
                                {item?.dealer}
                              </div>
                            </div>
                          </div>
                          <div className={style.listStyleFont14}>
                            <div className={style.listStyleOption}>
                              <b> {'Order-ID'}:</b>
                              {"   "}
                              <div
                                style={{ display: "flex" }}
                                className={style.userIcons}
                              >
                                {item?.orderId}
                              </div>
                            </div>
                          </div>
                          <div className={style.listStyleFont14}>
                            <div className={style.listStyleOption}>
                              <b> {'FullOdds'}:</b>
                              {"   "}
                              <div
                                style={{ display: "flex" }}
                                className={style.userIcons}
                              >
                                {item?.fullod}
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ) : isShowData?.find((z) => z === item?.orderId) &&
                      data <= 1170 ? (
                      <tr>
                        {" "}
                        <td colSpan={7}>
                          <div className={style.listStyleFont14}>
                            <b>{'Settled At'}:</b>{" "}
                            <span className={style.paddingLeft10}>
                              {item?.settleAt}
                            </span>
                          </div>
                          <div className={style.listStyleFont14}>
                            <div className={style.listStyleOption}>
                              <b> {'Customer'}:</b>
                              {"   "}
                              <div
                                style={{ display: "flex" }}
                                className={style.userIcons}
                              >
                                {item?.customer}
                              </div>
                            </div>
                          </div>
                          <div className={style.listStyleFont14}>
                            <div className={style.listStyleOption}>
                              <b> {'Dealer'}:</b>
                              {"   "}
                              <div
                                style={{ display: "flex" }}
                                className={style.userIcons}
                              >
                                {item?.dealer}
                              </div>
                            </div>
                          </div>
                          <div className={style.listStyleFont14}>
                            <div className={style.listStyleOption}>
                              <b> {'Order-ID'}:</b>
                              {"   "}
                              <div
                                style={{ display: "flex" }}
                                className={style.userIcons}
                              >
                                {item?.orderId}
                              </div>
                            </div>
                          </div>
                          <div className={style.listStyleFont14}>
                            <div className={style.listStyleOption}>
                              <b> {'FullOdds'}:</b>
                              {"   "}
                              <div
                                style={{ display: "flex" }}
                                className={style.userIcons}
                              >
                                {item?.fullod}
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      ""
                    )}
                  </>
                );
              })
            ) : (
              <td
                style={{ border: "none" }}
                colSpan={data > 1170 ? 9 : data > 850 ? 7 : data > 450 ? 3 : 5}
              >
                <div className={style.noRecordClass}>No Records</div>
              </td>
            )}
          </tbody>
        </table>
        </div>
    </div>
  );
});

export default memo(AccountStateMent);

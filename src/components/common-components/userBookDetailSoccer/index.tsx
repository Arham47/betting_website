import { useEffect, useState } from 'react' 
import style from "./style.module.scss"
import CustomButton from '../custom-button';
import { CAP_ENTRIES, CAP_SEARCH, CAP_SHOW, LOWER_OUTLINED, LOWER_SUBMIT } from '@utils/const';
import Table from '../table';
import { ColTextCheck } from '../export-common-components/table-columns-text-check';
import { getSingleUrlParam, sortCol } from '@utils/common-functions';
import { useLocation } from 'react-router-dom';
import TitleBarUpdated from '@components/users/common-components/title-bar-updated';
import { useStore } from '@stores/root-store';
import { Empty } from 'antd';
export const UserBookDetailSoccer = () => {
  const {bet: {loadSportBook},
  user: {getUserInfo}
} = useStore(null);
    const dummyGameArray = [
        "All",
        "My Users",
      ];
    const [activeElement, setActiveElement] = useState(dummyGameArray[0]);
    const [entries, setEntries] = useState("10");
    const [pageNumber, setPageNumber] = useState(1);
    const [options] = useState([10, 100, 250, 500, 1000]);
    const [search, setSearch] = useState("");
    const [sportBookData, setSportBookData] = useState([])
    const [sportBookAllData, setSportBookAllData] = useState([])
    const [eventNam, setEventNam] = useState(null)
    const location = useLocation();
    const receivedData = location.state;
    const matchId = getSingleUrlParam(location, 'id');
    const queryMarketId = getSingleUrlParam(location, "marketId");
    const eventName = JSON.parse(localStorage.getItem('userBookEvent'));
    useEffect(()=>{
      window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    loadSportBookData();
  }, [receivedData])
  const loadSportBookData = async() => {
    const payload = {
      matchId: matchId,
      myUser: ''
    }
    if(matchId){
      const res = await loadSportBook(payload);
      if(res?.results?.length){ 
      console.log(res?.results,"res?.results"); 
      const filterUserBook = res?.results?.filter((item)=> Number(item?.marketId) === Number(queryMarketId));
        // const result = {};

        // res?.results?.forEach((record) => {
        // const marketName = record?.marketName[0];
        // const runnerName = record?._id?.runnerName;
        // const dummy = [];
        // console.warn('record')
        // if(marketName){
        //   record?.runners?.forEach((item) => {
        //   // console.warn('runner')
        //   if(runnerName === item?.runnerName){
        //       dummy.push({...item, profitVal: (record?.betRateAverage * record?.betAmountTotal)-record?.betAmountTotal})
        //     }else{
        //       dummy.push({...item, profitVal: -record?.betAmountTotal})
        //     }
        //   })
        // }         
        // console.warn('dummy', dummy)

        // });

        setSportBookData(filterUserBook)
        setSportBookAllData(filterUserBook)
        
      }
    }
  }

    const handleChange = (e) => {
        setSearch(e?.target?.value);
        const filterData = sportBookAllData?.filter((z) => z?.username?.toLowerCase()?.includes(e?.target?.value?.toLowerCase()))
        setSportBookData(filterData);
      };

// const dynamicColumns = runnersData?.length > 0 ? 
// runnersData?.map((item, idx) => {
//     return {
//       title: item?.runnerName || '',
//       dataIndex: `runner${idx}`, // Use a unique dataIndex for each dynamic column
//       key: `runner${idx}`, // Use a unique key for each dynamic column
//       render: (text, record) => {
//         console.log('record', record, 'item', item)
//         if(record?.isParent){
//           return <div style={{color:record?._id?.runnerName==item?.runnerName ? "red" : 'green'}}>
//           {(record?._id?.runnerName==item?.runnerName) ?  -record?.lossAmount : record?.winAmount}
//         </div>
//         }
//         return <div style={{color:record?._id?.runnerName==item?.runnerName ? "green" : 'red'}}>
//           {(record?._id?.runnerName==item?.runnerName) ?  record?.totalWinningAmount : record?.totalLoosingAmount}
//         </div>
//       },
//     };
// }) : [];
  return (
    <div className={style.mainWrapper}>
        <TitleBarUpdated title={eventName?.soccer || ''} isButton={true} btnTitle={'Refresh'}/>

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
              placeholder='search by user name'
              className={style.inputHeight}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
        </div>
      </div>
      <div style={{marginTop: '10px'}}>
      {/* <Table
          responseData={sportBookData}
          columns={dynamicColumns}
          className={style.tableWrapperMain}
          responseCountParam={"10"}
          setPageNumber={setPageNumber}
          queryParam={{ page: pageNumber, numRecords: entries }}
        /> */}
        <div className="">
      {sportBookData?.length ? sportBookData?.map((result, index) => {
        if (result.runners.length === 0) {
          return null; // Skip rendering if runners array is empty
        }
        // const userColumn = {
        //   title: 'User Name',
        //   dataIndex: 'userName',
        //   key: 'userName',
        //   render: (text, record) => {
        //     return <div>
        //       {record?.username || ''}
        //     </div>
        //   },
        // }
        // const tableColumns = result.runners.map((runner, index) => (
        //   {title: runner?.runnerName,
        //   dataIndex: 'userName',
        //   key: 'userName',
        //   // render: (text, record) => {
        //   //   return <div>
        //   //     {record?.username || ''}
        //   //   </div>
        //   // },
        // }
        // ))
        // const tableColumns2 = [userColumn, ...tableColumns]
        // const parentObj = (result.parentInfo && result.parentInfo.length > 0) ? {username:result.parentInfo[0].username, } : {}
        // const dataSource = [...sportBookData, parentObj]
        return (
          <div key={index} className={style.tableWrapper}>
            <h4 style={{margin:4}}>{result?.marketName[0]}</h4>
            <span style={{margin:4}}>{result._id.runnerName}</span>
            {/* <Table 
            dataSource={dataSource}
            columns={ tableColumns2}
            /> */}
            <table className={style.customTable}>
              <thead>
                <tr>
                  <th>Username</th>
                  {result?.runners?.map((runner, index) => (
                    <th key={index}>{runner.runnerName}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{result.username}</td>
                  {result.runners.map((runner, index) => (
                    <td key={index} style={{color:runner?.runnerName === result?._id?.runnerName ? 'green' : 'red'}}>
                      {runner?.runnerName === result?._id?.runnerName ? result?.totalWinningAmount?.toFixed(0): `-${result?.totalLoosingAmount?.toFixed(0)}`}
                    </td>
                  ))}
                </tr>
                {activeElement === 'All' && result?.parentInfo && result?.parentInfo.length > 0 && (
                  <tr>
                    <td>{result?.parentInfo[0].username}</td>
                    {result?.runners.map((runner, index) => (
                      <td key={index} style={{color:runner?.runnerName === result?._id?.runnerName ? 'red' : 'green'}}>
                        {runner?.runnerName === result?._id?.runnerName? -((result?.totalWinningAmount *result?.parentInfo[0].downLineShare) /100)?.toFixed(0)
                          : ((result?.totalLoosingAmount *result?.parentInfo[0].downLineShare) /100)?.toFixed(0)}
                      </td>
                    ))}
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        );
      })
    :
    <Empty className={style.emptyBox}/>
    }
    </div>
      </div>
    </div>
  )
}

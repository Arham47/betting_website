/* eslint-disable eqeqeq */
import { observer } from "mobx-react";
import style from "./style.module.scss";
import { useEffect, useState } from "react";
import CustomButton from "@components/common-components/custom-button";
import { useStore } from "@stores/root-store";
import { Col, Row, Select, Spin } from "antd";
import {
  CheckCircleFilled,
} from "@ant-design/icons";
import { truncate } from "@utils/common-functions";
import { CommonInput } from "@components/common-components/input";
import TitleBarUpdated from "@components/users/common-components/title-bar-updated";

const { Option } = Select;
export const CasinoGames = observer(() => {
  const [isSelectedGames, setIsSelectedGames] = useState([]);
  const [selectedAllCategories, setSelectedAllCategories] = useState([]);
  const [allCategoryOptions, setAllCategoryOptions] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(null);
  const [originalCategoryOption, setOriginalCategoryOption] = useState([]);
  const [addNewOptions, setNewAddOptions] = useState([]);
  const [deSelectCategories, setDeSelectCategories] = useState([]);
  const [concatedArray, setConcatedArray] = useState([]);
  const [selectedCategoriesOption, setSelectedCategoriesOption] = useState([]);
  const [selectedGameListByCategory, setSelectedGameListByCategory] = useState(
    []
  );
  const [filterSelectedGame, setFilterSelectedGame] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const {
    bet: {
      loadAllCasinoCategoryGames,
      loadingAllCasinoGameList,
      loadAllCasinoGameListByCategory,
      postCasinoSelectedGames,
      loadingPostSelectedGames,
    },
  } = useStore(null);
  useEffect(()=>{
    window.scrollTo(0, 0);
}, []);
  const handleLoadGameCategory = async () => {
    const response = await loadAllCasinoCategoryGames();
    const data = response?.results;
    let dummyDataId = [];
    const dummyDataObject = [];
    for (let i = 0; i < data?.length; i++) {
      if (data[i]?.status == "2") {
        dummyDataId.push(data[i]._id);
        dummyDataObject.push({
          _id: data[i]?._id,
          status: data[i]?.status,
          category: data[i]?.category,
        });
      }
    }
    setOriginalCategoryOption(dummyDataId);
    setSelectedAllCategories(dummyDataId);
    setConcatedArray(dummyDataObject);
    setNewAddOptions(dummyDataObject);
    const filterDataOfSelectedCategories = data
      // eslint-disable-next-line eqeqeq
      ?.filter((item) => item?.status != "2")
      ?.map((item) => {
        return {
          ...item,
          label: item?.category,
          value: item?._id,
        };
      });
    setSelectedCategoriesOption(filterDataOfSelectedCategories);
    setAllCategoryOptions(data);
  };
  useEffect(() => {
    setSelectedAllCategories([]);
    setSelectedCategories([]);
    setNewAddOptions([]);
    setDeSelectCategories([]);
    setIsSelectedGames([]);
    setSelectedGameListByCategory([]);
    setSearchValue("");
    setFilterSelectedGame([]);
    handleLoadGameCategory();
  }, []);
  useEffect(() => {
    const conCatedummyArray = addNewOptions.concat(deSelectCategories);
    const filteredArray = allCategoryOptions
      ?.filter(
        (obj) =>
          !conCatedummyArray.some(
            // eslint-disable-next-line eqeqeq
            (item) => item?._id === obj?._id && item?.status == 2
          )
      )
      ?.map((item) => {
        return {
          ...item,
          label: item?.category,
          value: item?._id,
        };
      });
    setConcatedArray(conCatedummyArray);
    setSelectedCategoriesOption(filteredArray);
  }, [deSelectCategories, addNewOptions]);
  const handleChange = (value) => {
    setSelectedCategories([]);
    setSelectedGameListByCategory([]);
    setSearchValue("");
    setFilterSelectedGame([]);
    for (const id of value) {
      const foundObject = allCategoryOptions.find((obj) => obj?._id === id);
      const dummyData = { ...foundObject };
      if (dummyData?._id) {
        dummyData.status = 2;
        const findData = addNewOptions?.find(
          (item) => item?._id === dummyData?._id
        );
        if (!findData?._id) {
          const isAlreadExist = concatedArray?.find((z) => z?._id == id);
          if (isAlreadExist) {
            const filterArray = deSelectCategories?.filter((z) => z?._id != id);
            setDeSelectCategories(filterArray);
          }
          setNewAddOptions([...addNewOptions, dummyData]);
        }
      }
    }
    setSelectedAllCategories(value);
  };
  const handleSaveGames = async () => {
    const updateArray = concatedArray?.map((z) => {
      return { ...z, status: Number(z?.status) };
    });
    const payload = {
      casinoCategories: updateArray,
    };
    const res = await postCasinoSelectedGames(payload);
    if (res?.success) {
      setOriginalCategoryOption([]);
      setSelectedAllCategories([]);
      setConcatedArray([]);
      setNewAddOptions([]);
      setSelectedCategories(null);
      setSelectedGameListByCategory([]);
      setDeSelectCategories([]);
      setSearchValue("");
      handleLoadGameCategory();
    }
  };
  const handleSelectedChange = async (value) => {
    setSelectedCategories(value);
    const res = await loadAllCasinoGameListByCategory(value?.value);
    if (res?.success) {
      setSelectedGameListByCategory(res?.results);
      setSearchValue("");
      setFilterSelectedGame(res?.results);
      const filterArray = res?.results
        ?.filter((item) => item?.status == 1)
        ?.map((item) => {
          return item?.game?.id;
        });
      setIsSelectedGames(filterArray);
      const selectedGameObject = {
        _id: value?.value,
        status: 1,
        games: filterArray,
      };
      const findObject = concatedArray?.find(
        (item) => item?._id === value?.value
      );
      if (!findObject?._id) {
        setConcatedArray([...concatedArray, selectedGameObject]);
      }
    } else {
      setSelectedGameListByCategory([]);
      setSearchValue("");
      setFilterSelectedGame([]);
    }
  };
  const handleDeselect = (id) => {
    setSelectedCategories([]);
    setSelectedGameListByCategory([]);
    setSearchValue("");
    setFilterSelectedGame([]);
    const findObject = originalCategoryOption?.find((item) => item == id);
    const findData = addNewOptions?.find((item) => item?._id === id);
    if (findData?._id) {
      const filterData = addNewOptions?.filter((item) => item?._id !== id);
      setNewAddOptions(filterData);
    }
    if (findObject) {
      const data = allCategoryOptions?.find((item) => item?._id === findObject);
      const dummyData = { ...data };
      dummyData["status"] = 0;
      setDeSelectCategories([...deSelectCategories, dummyData]);
    }
  };
  const handleFilterValue = (e) => {
    setSearchValue(e?.target?.value);
    if (e?.target?.value?.trim() === "") {
      setFilterSelectedGame(selectedGameListByCategory);
    } else {
      const results = selectedGameListByCategory?.filter((item) =>
        item?.game?.name
          ?.toLowerCase()
          .includes(e?.target?.value?.toLowerCase())
      );
      setFilterSelectedGame(results);
    }
  };
  const handleMobileFilter =(e)=>{
    if(e?.value==='all'|| !e?.value){
      setFilterSelectedGame(selectedGameListByCategory);
    }
    else {
      const filterValue = e?.value==='mobile' ? true : false
      const results = selectedGameListByCategory?.filter((item) =>
        item?.game?.mobile === filterValue);
      setFilterSelectedGame(results);
    }
  }
  return (
    <div className={style.mainWrapper}>
      <TitleBarUpdated title={"All Category"}  />
      <div
        className={style.marginTopClass}
        style={{
          display: "flex",
          justifyContent: "flex-end",
          width: "90%",
          margin: "auto",
          marginBottom: "10px",
          marginTop: '10px'
        }}
      >
        <CustomButton
          title={"Save Games"}
          disabled={loadingPostSelectedGames}
          customClass={style.btnStyle}
          loading={loadingPostSelectedGames}
          onClick={() => {
            handleSaveGames();
          }}
        />
      </div>
      <div className={style.card}>
        <div className={style.dropdownContainer}>
          <div className={style.heading}> Select Whole Categories: </div>
          <div className={style.dropdown}>
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              onChange={handleChange}
              value={selectedAllCategories}
              onDeselect={handleDeselect}
            >
              {allCategoryOptions?.map((item, index) => {
                return (
                  <Option key={index} value={item?._id} label={item?.category}>
                    {item?.category}
                  </Option>
                );
              })}
            </Select>
          </div>
        </div>
        <div className={style.dropdownContainer}>
          <div className={style.heading}>Categories:</div>
          <div className={style.dropdownClass}>
            <div className={style.selcetSingleCategory}>
            <Select
              labelInValue
              style={{ width: "100%" }}
              onChange={handleSelectedChange}
              value={selectedCategories}
              options={selectedCategoriesOption}
            ></Select>
            </div>
            <div className={style.selcetSingleCategory}>
             <Select
              labelInValue
              className={style.selcetSingleCategory}
              style={{ width: "100%", paddingTop:"12px" }}
              onChange={(e)=> handleMobileFilter(e) }
              placeholder="Mobile / Desktop"
              options={[
                { value: 'all', label: 'All' },
                { value: 'mobile', label: 'Mobile' },
                { value: 'desktop', label: 'Desktop' },
              ]}
            ></Select>
            </div>
          </div>
        </div>
        {selectedGameListByCategory?.length ? (
          <div className={style.dropdownContainer}>
            <div className={style.dropdownClass}>
              <CommonInput
                placeholder="Search Game"
                onChange={(e) => handleFilterValue(e)}
                value={searchValue}
                className={style.searchClass}
              />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      {loadingAllCasinoGameList ? (
        <Spin className={style.antIconClass} size="large" />
      ) : filterSelectedGame?.length ? (
        <>
          <div className={style.FlexWraperForGame}>
            <Row gutter={10}>
              {filterSelectedGame?.map((item, index) => {
                return (
                  <Col xs={12} sm={12} md={6} lg={4} style={{ marginTop: 10 }}>
                    <div
                      className={style.imageContainer}
                      key={index}
                      style={{
                        boxShadow: isSelectedGames?.find(
                          (z) => z === item?.game?.id
                        )
                          ? "0 0 0 0.2rem rgb(49, 122, 250, .7)"
                          : "",
                      }}
                      onClick={() => {
                        let tempData = [...isSelectedGames];
                        const data = tempData?.find(
                          (z) => z === item?.game?.id
                        );

                        if (data) {
                          const filterData = tempData?.filter(
                            (z) => z != item?.game?.id
                          );
                          tempData = filterData;
                          setIsSelectedGames(filterData);
                        } else {
                          setIsSelectedGames([...tempData, item?.game?.id]);
                          tempData = [...tempData, item?.game?.id];
                        }
                        const updteDta = concatedArray?.map((z) => {
                          if (z?._id === selectedCategories?.value) {
                            return { ...z, games: tempData };
                          }
                          return z;
                        });
                        setConcatedArray(updteDta);
                      }}
                    >
                      <img
                        className={style.image}
                        style={{
                          objectFit: "cover",
                          width: "100%",
                        }}
                        src={
                          item?.game?.image_filled
                        }
                        alt="logo"
                      />
                      <div className={style.textOverlay}>
                        {isSelectedGames?.find((z) => z === item?.game?.id) ? (
                          <CheckCircleFilled />
                        ) : (
                          ""
                        )}
                        <p
                          title={
                            item?.game?.name?.length > 16
                              ? item?.game?.name
                              : ""
                          }
                        >
                          {truncate(item?.game?.name, 16)}
                        </p>
                      </div>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
});

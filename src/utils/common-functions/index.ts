import { DOUBLE_DASH, LOWER_ERROR, LOWER_TOKEN } from "@utils/const";
import { notification } from "@utils/notifications";
import { constRoute } from "@utils/route";
import { resetStore } from "@stores/root-store";
import { roleNameTypeUserList } from "@utils/json-data";
// import xls from "xlsx";
import * as xls from "xlsx";
import * as FileSaver from "file-saver";

// import { saveAs } from "file-saver";
import * as _ from "lodash";
import moment from "moment";
export const addDebounce = (fn, delay) => {
  let timer;
  return (() => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(), delay);
  })();
};

export const catchError = (
  error,
  at = "Mention Store Action Name To Track Error At:"
) => {
  console.log(`======================= Start =========================`);
  console.log("At:", at, error);
  const { status, data } = error.response;
  console.log(
    "At:",
    at,
    " | status: ",
    status,
    `| ${LOWER_ERROR} data: `,
    data
  );
  if (status === 400 || status === 404) {
    if(!(localStorage.getItem('logoutStatus') === 'true')){
   data.message&& notification.error(data.message);
}
  }  
if(data?.message?.includes('Invalid or expired authorization token')){
localStorage.removeItem('adminToken')
if(!(localStorage.getItem('logoutStatus') === 'true')){
  window.location.reload();
}
}
  data?.errors?.length > 0 &&
    data.errors?.forEach((item) => {
      item?.msg&& notification.error(item?.msg);
    });
  console.log(`======================= End ========================= \n\n\n\n`);
};

export const onLogOutClearAll = (naviagte = null) => {
  naviagte(constRoute.login);
  localStorage.removeItem('adminToken')
  resetStore();
};

export const getUserOnRole = (role) => {
  return (
    roleNameTypeUserList?.find((item) => item?.role === role) || {
      name: DOUBLE_DASH,
      role: "",
    }
  );
};

export const sortCol = (a, b, dataIndex) => {
  if (a[dataIndex]?.length > 0 && b[dataIndex]?.length > 0) {
    return a[dataIndex].length - b[dataIndex].length;
  } else {
    return null;
  }
};
export const s2ab = (s) => {
  const buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
  const view = new Uint8Array(buf); //create uint8array as viewer
  for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff; //convert to octet
  return buf;
};

export const fitToColumn = (arrayOfArray) => {
  // get maximum character of each column
  return arrayOfArray[0].map((a, i) => ({
    wch: Math.max(
      ...arrayOfArray.map((a2) => (a2[i] ? a2[i].toString().length : 0))
    ),
  }));
};
export const generateExcel = (
  file_name,
  title,
  subject,
  sheet_name,
  author,
  headings,
  columns,
  file_data,
  footers = [""]
) => {
  const arr = [];
  if (file_data?.length) {
    file_data.map((item) => {
      const obj = {};
      const keys = Object.keys(item);
      keys.map((key) => {
        if (item[key]?.toString()) obj[key] = item[key];
        else obj[key] = " ";
        return null;
      });
      arr.push(obj);
      return null;
    });
  }
  const work_book = xls.utils.book_new();
  work_book.Props = {
    Title: title,
    Subject: subject,
    Author: author,
    CreatedDate: new Date(),
  };
  work_book.SheetNames.push(sheet_name);
  const sheet_data = xls.utils.aoa_to_sheet([
    ...headings,
    columns,
    ...arr?.map((row) => _.values(row)),
    footers,
  ]);
  sheet_data["!cols"] = fitToColumn([columns]);
  work_book.Sheets[sheet_name] = sheet_data;
  const work_book_export = xls.write(work_book, {
    bookType: "xlsx",
    type: "binary",
  });
  FileSaver.saveAs(
    new Blob([s2ab(work_book_export)], { type: "application/octet-stream" }),
    `${file_name}.xlsx`
  );
};
export const getvalidDateDMY = (date) => {
  if (date === "" || date === undefined) {
    return "";
  } else {
    const resdate = new Date(date);
    const year = resdate.getFullYear();
    const month =
      (resdate.getMonth() + 1).toString().length === 1
        ? "0" + (resdate.getMonth() + 1)
        : (resdate.getMonth() + 1).toString();
    const day =
      resdate.getDate().toString().length === 1
        ? "0" + resdate.getDate()
        : resdate.getDate().toString();
    return day + "-" + month + "-" + year;
  }
};

export const initialConsole = (
  at = "\n  Mention Console Name To Track initialConsole function called \n --------",
  msg = "\n Add message to know the purpose \n --------",
  value = "What kind of value you want to console \n"
) => {
  console.log(
    `\n ------------------------ \n ${at} \n ------------------------ \n ${msg}  \n ------------------------ \n`,
    value
  );
  return value || null;
};

export const convertImagePathToBase64 = async (path) => {
  const response = await fetch(path);
  const blob = await response.blob();
  const base64 = await blobToBase64(blob);
  return base64;
};

export const convertBase64StringToHtmlUrl = (base64StringPath) => {
  const base64String = base64StringPath;
  const binaryString = window.atob(base64String);
  const charCodes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    charCodes[i] = binaryString.charCodeAt(i);
  }
  const htmlDecoder = new TextDecoder("utf-8");
  const htmlString = htmlDecoder.decode(charCodes);
  const htmlBlob = new Blob([htmlString], { type: "text/html" });
  const htmlUrl = URL.createObjectURL(htmlBlob);
  return htmlUrl;
};

export const blobToBase64 = async (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      const base64String = reader.result;
      resolve(base64String);
    };
    reader.onerror = function () {
      reject(new Error("Failed to convert blob to base64"));
    };
  });
};

export function getSingleUrlParam(
  location: any,
  name: string
): string | undefined {
  const params = new URLSearchParams(location.search);
  return params.get(name);
}
export function numberWithCommas(value: any) {
  if (
    value === "NaN" ||
    Number.isNaN(value) ||
    value === "" ||
    value === undefined
  ) {
    return "";
  } else {
    return value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }
}

export function thousandSeperator(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export const truncate = function (
  str: string,
  length: number = 16,
  ending: string = "..."
) {
  if (str?.length > length) {
    return str.substring(0, length - ending.length) + ending;
  } else {
    return str;
  }
};

export const unixTimestamp = (unixTimestamp, dateFormat = "DD-MM-YYYY") => {
  const date = new Date(unixTimestamp * 1000);
  const formattedDate = moment(date, 'MM/DD/YYYY').format(dateFormat);
  return formattedDate;
};
export function formatLargeNumber(num: number, precision: number = 0) {
  // if (Math.abs(num) > 999 && Math.abs(num) < 1000000) {
  //   return (num / 1000).toFixed(precision) + 'K'; // convert to K for number from > 1000 < 1 million
  // } else
   if (Math.abs(num) >= 1000000000) {
    return (num / 1000000000).toFixed(precision) + 'B'; // convert to B for number from > 1 billion
  } else if (Math.abs(num) >= 1000000) {
    return (num / 1000000).toFixed(precision) + 'M'; // convert to M for number from > 1 million
  } else if (Math.abs(num) < 1000000) {
    return num?.toFixed(precision)?.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    //first code if we do not need to show with NumberWithCommoos
    // return num?.toFixed(precision)?.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","); // if value < 1000, nothing to do
  } else {
    return num; // Anything else should be return as is.
  }
}
export function formatLargeNumberWithKValues(num: number, precision: number = 0) {
  if (Math.abs(num) > 999 && Math.abs(num) < 1000000) {
    return (num / 1000).toFixed(precision) + 'K'; // convert to K for number from > 1000 < 1 million
  } else if (Math.abs(num) >= 1000000000) {
    return (num / 1000000000).toFixed(precision) + 'B'; // convert to B for number from > 1 billion
  } else if (Math.abs(num) >= 1000000) {
    return (num / 1000000).toFixed(precision) + 'M'; // convert to M for number from > 1 million
  } else if (Math.abs(num) < 1000) {
    // return num?.toFixed(precision)?.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    //first code if we do not need to show with NumberWithCommoos
    return num?.toFixed(precision); // if value < 1000, nothing to do
  } else {
    return num; // Anything else should be return as is.
  }
}

export const getDateStatus = (date) => {
  const currentDate = new Date();
  const targetDate = new Date(date);
  const dateObject = new Date(targetDate);
  const month = dateObject.getMonth() + 1;
  const getDate = dateObject.getDate(); 
  const dateWithMonth = `${month}/${getDate}`;
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();
  const targetYear = targetDate.getFullYear();
  const targetMonth = targetDate.getMonth();
  const targetDay = targetDate.getDate();
  if (
    currentYear === targetYear &&
    currentMonth === targetMonth &&
    currentDay === targetDay
  ) {
    return 'Today';
  } else if (
    currentYear === targetYear &&
    currentMonth === targetMonth &&
    currentDay + 1 === targetDay
  ) {
    return 'Tomorrow';
  } else {
    return dateWithMonth; 
  }
}

export const getTime = (dateString) => {
  const dateObject = new Date(dateString);
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();
  const timeString = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
return timeString;
}

export const capitalizeFirstCharacter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const convertFirstCharToLowerCase = (str) => {
  if (str.length === 0) {
    return str; // Return the empty string if the input is empty
  } else {
    var firstChar = str.charAt(0);
    var remainingChars = str.slice(1);
    var convertedFirstChar = firstChar.toLowerCase();
    return convertedFirstChar + remainingChars;
  }
}

export const getTimeDiffe = (time) => {
  const parsedDate = moment(new Date (), 'MMM D h:mm a');
  const timeDifference = parsedDate.diff(time)
  if(moment.duration(timeDifference)?.hours()){
    const hours = moment.duration(timeDifference)?.hours()
    const minutes = moment.duration(timeDifference)?.minutes()
    return hours>=0 ? `${hours} hours and ${minutes} minutes ago` : ''
  }else{
    const minutes = moment.duration(timeDifference)?.minutes()
    return minutes>=0 ? `${minutes} minutes ago` : ''
  }
}

export const getTimeDiff = (timeString) => {
  const currentTime = moment();
  const time = moment(timeString); // Convert input string to moment object

  if (time.isSameOrAfter(currentTime)) {
    const timeDifferenceMinutes = time.diff(currentTime, 'minutes');

    if (timeDifferenceMinutes <= 1) {
      return 'a minute ago';
    } else if (timeDifferenceMinutes < 60) {
      return ` in ${timeDifferenceMinutes} minutes`;
    } else {
      const hours = Math.floor(timeDifferenceMinutes / 60);
      const minutes = timeDifferenceMinutes % 60;

      if (hours === 1) {
        return `in ${hours} hour and ${minutes} minutes `;
      } else {
        return `in ${hours} hours and ${minutes} minutes ago`;
      }
    }
  } else {
    const timeDifferenceMinutes = currentTime.diff(time, 'minutes');

    if (timeDifferenceMinutes <= 1) {
      return 'a minute ago';
    } else if (timeDifferenceMinutes < 60) {
      return `${timeDifferenceMinutes} minutes ago`;
    } else {
      const hours = Math.floor(timeDifferenceMinutes / 60);
      const minutes = timeDifferenceMinutes % 60;

      if (hours === 1) {
        return `${hours} hour and ${minutes} minutes ago`;
      } else {
        return `${hours} hours and ${minutes} minutes ago`;
      }
    }
  }
};
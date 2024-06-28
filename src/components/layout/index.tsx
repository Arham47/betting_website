import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { constRoute } from "@utils/route";
import PrivateLayout from "./main-layout/private-layout";
import PublicLayout from "./main-layout/public-layout";
import WholePageLoader from "@components/common-components/whole-page-loader";
import { CAMEL_ISBETTER, LOWER_TOKEN } from "@utils/const";

const DefaultLayout = observer(() => {
  const navigate = useNavigate();
  const location = useLocation()
  const [adminRole, setIsAdminRole] = useState(localStorage.getItem('adminRole'))
  const [isToken, setIsToken] = useState(localStorage.getItem('adminToken'));
  useEffect(() => {
    const storedIsBetter = localStorage.getItem('adminRole');
    const storedLowerToken = localStorage.getItem('adminToken');
    handleTokenAndNavigation(storedLowerToken, storedIsBetter);
  }, [localStorage.getItem('adminToken'), localStorage.getItem('adminRole')]);
  
  const handleTokenAndNavigation = (storedLowerToken, storedIsBetter) => {
    if (storedLowerToken && storedLowerToken.length > 0) {
      setIsToken(storedLowerToken);
      setIsAdminRole(storedIsBetter);
      if(window?.location?.hash === '#/login')navigate(constRoute?.dashboard);
      if (!isPrivacyPolicyOrTerms()) navigate(window?.location?.hash?.replaceAll('#/', ''));
    } else {
      clearLocalStorageAndNavigate();
    }
  };
  
  const isPrivacyPolicyOrTerms = () => {
    const validPaths = ['/privacyPolicy', '/terms-and-conditions', '/KYC', '/rules-regulation', "/self-exclusion-policy", "/under-age-policy", "/aml", "/fairness-and-rng", '/about-us', '/responsible-game', '/dispute', '/A-P-B'];
    const { pathname } = location;
    return validPaths.includes(pathname);
  };
  
  const clearLocalStorageAndNavigate = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('currentLink');
    if (!isPrivacyPolicyOrTerms()) {
      navigate(constRoute?.login);
   
    }
    setIsToken('');
    setIsAdminRole('');
  };
  console.log('isToken', isToken, 'adminRole', adminRole)

  return (
    (isToken === null && <WholePageLoader />) || adminRole!=="5" ? ( isToken  ? <PrivateLayout /> : <PublicLayout />) : <PublicLayout />  );
});

export default DefaultLayout;

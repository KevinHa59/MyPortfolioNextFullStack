const { useRouter } = require("next/router");
import { getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import MyAPIs from "../pages/api-functions/MyAPIs";

const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Current time in seconds
    return decodedToken.exp < currentTime;
  } catch (error) {
    return true;
  }
};

const withAuth = (WrappedComponent) => {
  const ComponentWithAuth = (props) => {
    const router = useRouter();
    let cookies = getCookie("user");
    cookies = cookies ? JSON.parse(cookies) : null;
    useEffect(() => {
      validateToken();
    }, [cookies, router]);

    async function validateToken() {
      if (!cookies || isTokenExpired(cookies.token)) {
        // if there is no cookie -> redirect to login
        if (!cookies) {
          localStorage.setItem("redirectPath", router.asPath);
          router.replace("/authentication/login");
        }
        // if there is cookie but token expired -> refresh new token
        else {
          try {
            const newToken = await MyAPIs.User().refreshToken();
            // if refresh token success
            if (newToken) {
              let newCookies = getCookie("user");
              cookies = newCookies ? JSON.parse(newCookies) : null;
            } else {
              // store current page
              localStorage.setItem("redirectPath", router.asPath);
              router.replace("/authentication/login");
            }
          } catch (error) {
            console.error("Error refreshing token:", error);
            localStorage.setItem("redirectPath", router.asPath);
            router.replace("/authentication/login");
          }
        }
      }
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};

export default withAuth;

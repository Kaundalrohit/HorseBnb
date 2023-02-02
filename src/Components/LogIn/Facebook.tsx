import { useEffect, useState } from "react";
import { FB_appId } from "../../config";
type props = {
  handleToken: (token: string) => void;
}
export default function Facebook({ handleToken }: props) {

  const [show, setShow] = useState(true);
  const getFbUserData = () => {
    (window as any).FB.login(function (response: any) {
      if (response.authResponse) {
        var access_token = (window as any).FB.getAuthResponse()["accessToken"];
        localStorage.setItem("token", access_token);
        handleToken(access_token);
        (window as any).FB.api("/me", function (response: any) {
          console.log("Good to see you, " + response.name + ".");
        });
        setShow(false);
      } else {
        console.log("User cancelled login or did not fully authorize.");
      }
    });
  };
  const outFbUserData = () => {
    (window as any).FB.logout(function (res: any) {
      console.log("logOut");
      setShow(true);
    });
  };
  (window as any).fbAsyncInit = function () {
    (window as any).FB?.init({
      appId: FB_appId,
      cookie: true,
      xfbml: true,
      version: "v15.0",
    });
  };

  useEffect(() => {
    (window as any).fbAsyncInit();
  });

  return (
    <div>
      {show ? (
        <button onClick={getFbUserData} className="btn btn-warning me-3">
          Login to FB
        </button>
      ) : (
        <button onClick={outFbUserData} className="btn btn-danger">
          Logout
        </button>
      )}
    </div>
  );
}

import { useEffect } from "react";
// import { Navigate, useNavigate } from "react-router-dom";
type props = {
    handleToken: (token: string) => void;
}

export default function GoogleSdk(props: props) {

    // const navigate = useNavigate();

    const loadGoogleMapScript = (callback: any) => {
        if (typeof (window as any).google === 'object' && typeof (window as any).google.maps === 'object') {
            callback();
        } else {
            const googleMapScript = document.createElement("script");
            googleMapScript.src = `https://accounts.google.com/gsi/client`;
            window.document.body.appendChild(googleMapScript);
            googleMapScript.addEventListener("load", callback);
        }
    }

    const loginWithGoogle = async (response: any) => {
        console.log(response.credential);
        localStorage.setItem("token", response.credential)
        props.handleToken(response.credential)
        // navigate("/profilesetting")
        // debugger
        // await loginWithSocial("GOOGLE", response.credential)
    }
    const initLoginWithGoogle = () => {
        loadGoogleMapScript(() => {
            const google = (window as any).google
            google?.accounts?.id?.initialize({
                client_id: '56578242597-2bnalu2om5a7ghrbmogu81itc00m7t0c.apps.googleusercontent.com',
                callback: loginWithGoogle,
                cancel_on_tap_outside: false
            });
            google?.accounts?.id?.renderButton(
                document.getElementById('g_id_signout1'),
                { theme: "outline", size: "large", type: 'standard', }  // customization attributes
            );
            // google.accounts.id.prompt()
        })
    }
    // eslint-disable-next-line
    useEffect(() => { initLoginWithGoogle() }, [])


    return <div id="g_id_signout1" className="d-inline-block" >Login</div>;
}

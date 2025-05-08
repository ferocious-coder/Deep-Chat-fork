import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Logo from "./shared/Logo";
import { useAuth } from "../context/AuthContext";
import NavigationLink from "./shared/NavigationLink";
import { useLocation } from "react-router-dom";
const Header = () =>{
    const auth = useAuth();
    const location = useLocation();
    return (
        <AppBar sx={{
        bgcolor:"transparent", 
        position:"static",
        boxShadow:"none"}}>
        <Toolbar sx={{display:"flex"}}>
                <Logo/>
        <div>
        {auth?.isLoggedIn ? (
        <>
          {location.pathname === "/chat" ? (
            <NavigationLink
              bg="#00fffc"
              to="/"
              text="Go to Home"
              textColor="black"
            />
          ) : (
            <NavigationLink
              bg="#00fffc"
              to="/chat"
              text="Go to Chat"
              textColor="black"
            />
          )}
          
          <NavigationLink
            bg="#51538f"
            to="/"
            text="Logout"
            onClick={auth.logout}
            textColor="black"
          />
        </>
      ) : (
        <>
          <NavigationLink
            bg="#00fffc"
            to="/login"
            text="Login"
            textColor="black"
          />
          <NavigationLink
            bg="#51538f"
            textColor="white"
            to="/signup"
            text="Signup"
          />
        </>
      )}
    </div>
            </Toolbar>
        </AppBar>
    );
};
export default Header;
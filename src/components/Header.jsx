import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Avatar from "./Avatar";
import { auth } from "../firebase.js";
import { logout } from "../features/userSlice/userSlice.js";

const Header = () => {
  const [showMenu, setshowMenu] = useState(false);
  const restrictedRoutes = ["/login", "/register"];
  const location = useLocation();
  const isRestricted = restrictedRoutes.includes(location.pathname);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(logout());
    auth.signOut();
    navigate("/login");
  };

  return (
    !isRestricted && (
      <div className="sticky top-0 w-[100%] bg-purple-600 py-1">
        <div className="w-[90%] mx-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-white text-3xl font-semibold p-1">
              <Link to="/">Chatt</Link>
            </h1>
            <div className="flex gap-x-4 items-center">
              <div className="flex items-center gap-x-4 md:hidden">
                <h1 className="text-white text-xl ">{user?.displayName}</h1>
                <Avatar img={user?.photoURL} width={40} />
              </div>
              <div
                onClick={() => {
                  setshowMenu(!showMenu);
                }}
              >
                <IoSettingsOutline
                  style={{ fontSize: "2rem", color: "white" }}
                />
              </div>
              <div className="relative">
                {showMenu && (
                  <div className="absolute text-sm border border-purple-500 -right-5 top-7 bg-white rounded-md w-[80px] flex flex-col gap-y-2 py-1 items-center cursor-pointer ">
                    <div
                      className="hover:bg-purple-400 font-semibold border-y hover:text-white duration-75 px-1 rounded-md py-1"
                      onClick={handleSignOut}
                    >
                      Log Out
                    </div>
                    <Link target="_blank" to="https://github.com/aais1">
                    <div className="hover:bg-purple-400 font-semibold hover:text-white duration-75 px-1 rounded-md py-1">
                      Github
                    </div>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Header;

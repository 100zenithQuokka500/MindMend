import { createContext, useEffect, useState, useRef, useContext } from "react";
import PropTypes from "prop-types";
import { baseUrl, getAndDeleteReq, postAndPatchReq } from "../apiCalls/apiCalls";
import { toast } from "react-toastify";

const AuthContext = createContext({
  user: null,
  registerUser: () => {},
  loginUser: () => {},
  logoutUser: () => {},
  currentUser: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const toastId = useRef(null);

  const registerUser = async (userData) => {
    try {
      toastId.current = toast.loading("Registering user...");
      const data = await postAndPatchReq(`${baseUrl}/user/signup`, "POST", userData);
      setUser(data.data.user);
      toast.update(toastId.current, { render: "User registered!", type: "success", isLoading: false, autoClose: 2000 });
    } catch (err) {
      toast.update(toastId.current, { render: err.message || "Registration failed", type: "error", isLoading: false, autoClose: 2000 });
    }
  };

  const loginUser = async (credentials) => {
    try {
      toastId.current = toast.loading("Logging in...");
      const data = await postAndPatchReq(`${baseUrl}/user/signin`, "POST", credentials);
      setUser(data.data.user);
      toast.update(toastId.current, { render: "Login successful!", type: "success", isLoading: false, autoClose: 2000 });
    } catch (err) {
      toast.update(toastId.current, { render: err.message || "Login failed", type: "error", isLoading: false, autoClose: 2000 });
    }
  };

  const logoutUser = async () => {
    try {
      await getAndDeleteReq(`${baseUrl}/user/logout`, "GET");
      setUser(null);
      toast.success("Logged out successfully!");
    } catch (err) {
      toast.error(err.message || "Logout failed");
    }
  };

  const currentUser = async () => {
    try {
      const data = await getAndDeleteReq(`${baseUrl}/user/me`, "GET");
      setUser(data.data.user);
    } catch (error) {
      if (error?.response?.status !== 401) {
        console.error("Error fetching current user:", error);
      }
      setUser(null);
    }
  };

  useEffect(() => {
    currentUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, registerUser, loginUser, logoutUser, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
export const useAuth = () => useContext(AuthContext);
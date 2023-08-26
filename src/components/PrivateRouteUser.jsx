const PrivateRouteUser = ({ children }) => {
    const token = JSON.parse(localStorage.getItem("token"))
    const role = JSON.parse(localStorage.getItem("role"))
    
    if(token && role === "user") return children
    else if(token && role === "admin") location.href = "/admin"
    else location.href = "/"
}


export default PrivateRouteUser;

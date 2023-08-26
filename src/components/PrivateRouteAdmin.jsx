const PrivateRouteAdmin = ({ children }) => {
    const token = JSON.parse(localStorage.getItem("token"))
    const role = JSON.parse(localStorage.getItem("role"))

    if(token && role === "admin") return children
    else location.href = "/"
}

export default PrivateRouteAdmin;

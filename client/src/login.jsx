import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
    const navigate = useNavigate();
    const [eusername, setEUsername] = useState("");
    const [Epassword, setEPassword] = useState("");
    const [users,setUsers] = useState([
    {
    username: null,
    password: null
    }
  ])
   

    function handleLogin(evt) {
        
        evt.preventDefault();
       
      setUsers([...users, { username: eusername, password: Epassword }]);
    

        users.forEach((item) => {
            var userfound = false

             if (item.username === eusername && item.password === Epassword) {
            console.log("Login successful");
            userfound = true;
            navigate("/chat", { state: { username: eusername } });
             console.log(users);
            return;
            
        }

            if (eusername === "" || Epassword === "") {
                userfound = false;
            alert("Please fill in all fields");
            console.log(users)
            return;
        }
        });

    }



        return (
            <div className="flex flex-col items-center justify-center  mt-32">


                <div className="bg-gray-100 p-5 rounded-2xl shadow-xl" >
                    <h1 className="text-3xl font-bold text-center p-5">Login Here</h1>
                    <table>
                        <tbody>
                            <tr>
                                <td className="p-2">Username:</td>
                                <td className="p-2"><input type="text"
                                    className="border rounded p-1"
                                    onChange={(e) => setEUsername(e.target.value)

                                    }
                                /></td>
                            </tr>
                            <tr>
                                <td className="p-2">Password:</td>
                                <td className="p-2"><input type="Password" className="border rounded p-1" onChange={(e) => setEPassword(e.target.value)} /></td>
                            </tr>
                            <tr>
                                <td colSpan="2" className="text-center">
                                    <button className="bg-blue-500 text-white px-4 py-2 mb-5 rounded w-full mt-3"
                                        onClick={handleLogin}>Login</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        )
    }
    export default Login;
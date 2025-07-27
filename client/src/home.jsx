

import { useNavigate } from "react-router-dom";
function Home() {

    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center   mt-20" >
            <h1 className="text-3xl font-bold" >Welcome to the Chat Application</h1>

            <>
                <p className="text-lg mt-10 font-semibold">Please log in to continue.</p>
                <button
                    className="mt-10 px-4 py-2 bg-blue-500 text-white rounded min-w-52 font-bold"
                    onClick={() => navigate('/login')}>
                    Log In
                </button>
            </>

        </div>

    )
}

export default Home;
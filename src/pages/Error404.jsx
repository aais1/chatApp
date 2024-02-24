import { Navigate } from "react-router-dom";

const Error404 = () => {

    const goHome = () => {
        return <Navigate to="/home" />;
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-gray-800">404</h1>
            <p className="text-lg text-gray-600">Page not found</p>
            <button
                className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600"
                onClick={goHome}
            >
                Go back
            </button>
        </div>
    );
};

export default Error404;

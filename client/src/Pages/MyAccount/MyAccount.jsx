import { useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";

const MyAccount = () => {
    const { user } = useContext(AuthContext);
    return (
        <div>
            <div className="bg-gray-100 shadow-xl overflow-hidden hover:shadow-2xl rounded-xl p-5 transition-all duration-500 transform">
                <div className="flex items-center gap-4">
        <img src={
                    user.photoURL
                    ? user.photoURL
                    : "https://i.ibb.co/0QZCv5C/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png"
                }
        className="w-32 group-hover:w-36 group-hover:h-36 h-32 object-center object-cover rounded-full transition-all duration-500 delay-500 transform"
        />
        <div className="w-fit transition-all transform duration-500">
            <h1 className="text-gray-600 dark:text-gray-200 font-bold">
            {user.displayName}
            </h1>
            <p className="text-gray-400">{user.email}</p>
            <a
            className="text-xs text-gray-500 dark:text-gray-200 group-hover:opacity-100 opacity-0 transform transition-all delay-300 duration-500">
            {user.email}
            </a>
        </div>
                </div>
            </div>
        </div>
    );
};

export default MyAccount;
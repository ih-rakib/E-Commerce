import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateProfileMutation } from "../../../redux/features/auth/authApi";
import avatarImg from "../../../assets/avatar.png";
import { toast } from "react-toastify";
import { setUser } from "../../../redux/features/auth/authSlice";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading, isError, error, isSuccess }] =
    useUpdateProfileMutation();

  const [formData, setFormData] = useState({
    username: user?.username || "",
    profileImg: user?.profileImg || "",
    bio: user?.bio || "",
    profession: user?.profession || "",
    userId: user?._id || "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await updateProfile(formData).unwrap();
      dispatch(setUser(response.user));
      if (response.user) alert("Profile updated successfully!");
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error updating profile", err);
      toast.error("Failed to update profile");
    }
  };

  useEffect(() => {
    if (user) {
      setFormData({
        username: user?.username || "",
        profileImg: user?.profileImg || "",
        bio: user?.bio || "",
        profession: user?.profession || "",
        userId: user?._id || "",
      });
    }
  }, [user]);

  return (
    <div className="container mx-auto p-7">
      <div className="bg-white shadow-md rounded-lg p-7">
        <div className="flex items-center mb-4">
          <img
            src={formData.profileImg || avatarImg}
            alt="avatar image"
            className="w-32 h-32 object-cover rounded-full"
          />
          <div className="ml-7">
            <h3 className="text-2xl font-semibold">
              {formData?.username || "N/A"}
            </h3>
            <p className="text-gray-700">{formData?.bio || "N/A"}</p>
            <p className="text-gray-700">{formData?.profession || "N/A"}</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="ml-auto text-blue-500 hover:text-blue-700"
          >
            <i className="ri-edit-box-line text-xl"></i>
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 md:w-1/3 max-w-xl mx-auto relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 size-8 hover:text-black"
            >
              <i className="ri-close-line text-2xl"></i>
            </button>

            <h3 className="text-xl font-semibold mb-4">Update Profile</h3>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded mt-2"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="profession" className="block text-gray-700">
                  Profession
                </label>
                <input
                  type="text"
                  id="profession"
                  name="profession"
                  value={formData.profession}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded mt-2"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="profileImg" className="block text-gray-700">
                  Profile Image URL
                </label>
                <input
                  type="text"
                  id="profileImg"
                  name="profileImg"
                  value={formData.profileImg}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded mt-2"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="bio"
                  className="block text-gray-700 text-sm font-medium"
                >
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded mt-2"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`${
                    isLoading ? "bg-gray-400" : "bg-blue-500"
                  } text-white px-4 py-2 rounded`}
                >
                  {isLoading ? "Updating..." : "Update"}
                </button>
                {isError && (
                  <span className="mt-2 text-red-500 text-sm">
                    Failed to update profile, Please try again
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;

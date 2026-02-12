import React from "react";
// import Sidebar from "@/components/profile/sidebar";
import SidebarProfile from "@/components/Sidebar/SidebarProfile";

interface ProfileWrapperProps {
  children: React.ReactNode;
}

const ProfileWrapper = ({ children }: ProfileWrapperProps) => {
  return (
    <div
      className="mt-120 lg:mt-100 md:mt-80 container"
      style={{
        backgroundColor: "#EDEDF4",
      }}
    >
      <div className="row">
        <div className="col-3 bg-white pt-20 xl:d-none">
          <SidebarProfile />
        </div>

        <div className="col-9 pr-0 xl:col-12 xl:w-1/1 xl:px-0">
          <div className="pl-30 pb-100 lg:pb-50 md:pb-20 bg-white xl:px-10">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileWrapper;

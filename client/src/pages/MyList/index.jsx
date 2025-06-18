import React from "react";
import MyListItems from "./myListItems";
import AccountSideBar from "../../components/AccountSideBar";

const MyList = () => {
  return (
    <section className="py-10 w-full">
      <div className="container flex gap-5">
        {/* Sidebar */}
        <div className="col1 w-[20%]">
          <AccountSideBar />
        </div>

        {/* Main content */}
        <div className="col2 w-[70%]">
          <div className="shadow-md rounded-md bg-white">
            <div className="py-2 px-3 border-b border-[rgba(0,0,0,0.1)]">
              <h2 className="text-xl font-semibold">My List</h2>
              <p className="mt-1">
                There are <span className="font-bold text-primary">8</span> products in your My List
              </p>
            </div>

            {/* List Items */}
            <div>
              <MyListItems />
              <MyListItems />
              <MyListItems />
              <MyListItems />
              <MyListItems />
              <MyListItems />
              <MyListItems />
              <MyListItems />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyList;

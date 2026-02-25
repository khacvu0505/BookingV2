import OffCanvasComponent from "@/components/OffCanvas/OffCanvasComponent";
import React from "react";
import { useDispatch } from "react-redux";
import { setSearchValue } from "@/features/app/appSlice";
import LocationSearch from "../SearchBar/LocationSearch";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

const OffCanvasLocation = () => {
  const dispatch = useDispatch();
  const { search = "" } = useLocation();
  const { type = "hotel" } = (queryString.parse(search) || {}) as Record<string, string>;

  const handleChangeValue = (value: Record<string, any>) => {
    dispatch(setSearchValue(value));
  };

  return (
    <OffCanvasComponent id="offcanvas-location-search">
      <LocationSearch
        handleChangeValue={handleChangeValue}
        isOffCanvas={true}
        type={type}
      />
    </OffCanvasComponent>
  );
};

export default OffCanvasLocation;

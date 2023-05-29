import React from "react";
import MenuCategoryButton from "./FilterCategoryButton";
import { Menu, MenuType, FoodType } from "../data/menu";
import { FilterValuesType } from "../hooks/useFilter";
import { changeButtonColor } from "../components/FilterCategoryButton";
import OtherFilterButton from "./OtherFilterButton";
import ModalButton from "./ModalButton";
import { ButtonTypeEnum } from "../enums/ButtonTypeEnum";

type PropsType = {
  filterMenuByCategory: (
    categories: (keyof MenuType)[],
    filters: {
      isNew?: boolean;
      isBestSeller?: boolean;
    }
  ) => void;
  toggleFilterModal: () => void;
  selectedCategories: (keyof MenuType)[];
  setSelectedCategories: React.Dispatch<
    React.SetStateAction<(keyof MenuType)[]>
  >;
  filterValues: FilterValuesType;
  setFilterValues: React.Dispatch<React.SetStateAction<FilterValuesType>>;
  removeFilter: () => void;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
};

function FilterModal(props: PropsType) {
  const {
    filterMenuByCategory,
    toggleFilterModal,
    selectedCategories,
    setSelectedCategories,
    filterValues,
    setFilterValues,
    removeFilter,
    setSearchValue,
  } = props;

  const menuData: MenuType = Menu;
  const typeData: Array<String> = FoodType; console.log(typeData);

  function getMenuCategories(): Array<JSX.Element> {
    let subMenuItems: Array<JSX.Element> = [];

    for (const subMenu in menuData) {
      let createdSubMenu = (
        <MenuCategoryButton
          name={subMenu}
          selectCategory={selectCategory}
          selectedCategories={selectedCategories}
        />
      );

      subMenuItems.push(createdSubMenu);
    }

    return subMenuItems.map((item) => item);
  }

  function getTypeCategories(): Array<JSX.Element> {
    let subMenuItems: Array<JSX.Element> = [];

    for (const typeTitle of typeData) {
      let createdSubMenu = (
        <MenuCategoryButton
          name={typeTitle}
          selectCategory={selectTypeCategories}
          selectedCategories={selectedCategories}
        />
      );

      subMenuItems.push(createdSubMenu);
    }

    return subMenuItems.map((item) => item);
  }

  function selectCategory(categoryName: string): void {
    setSelectedCategories((prevData) => {
      if (selectedCategories.includes(categoryName as keyof MenuType)) {
        return prevData.filter((item) => {item !== categoryName});
      }

      return [...prevData, categoryName as keyof MenuType];
    });
  }

  function selectTypeCategories(filterName: string): void {
    setFilterValues((prevData) => {
        return {
          ...prevData,
          type: filterName,
        };
      });
  }

  function selectOtherCategories(filterName: string): void {
    if (filterName === "New") {
      setFilterValues((prevData) => {
        return {
          ...prevData,
          isNew: !filterValues.isNew,
        };
      });
    }

    if (filterName === "Best Seller") {
      setFilterValues((prevData) => {
        return {
          ...prevData,
          isBestSeller: !filterValues.isBestSeller,
        };
      });
    }
  }

  function applyFilters(): void {
    filterMenuByCategory(selectedCategories, filterValues);
    toggleFilterModal();
    setSearchValue("");
  }

  const applyFilterButton = (
    <ModalButton
      label={"Apply filters"}
      onClick={applyFilters}
      type={ButtonTypeEnum.FILLED}
    />
  );
  const clearFilterButton = (
    <ModalButton
      label={"Clear"}
      onClick={removeFilter}
      type={ButtonTypeEnum.OUTLINE}
    />
  );

  function displayModalButtons(): JSX.Element {
    if (
      selectedCategories.length !== 0 ||
      filterValues.isNew ||
      filterValues.isBestSeller
    ) {
      return (
        <>
          <hr className="w-100 mt-4 border-[#e6a881]" />
          <div className="flex justify-end gap-2 mt-2">
            {applyFilterButton}
            {clearFilterButton}
          </div>
        </>
      );
    }

    return (
      <>
        <hr className="w-100 mt-4 border-[#e6a881]" />
        <div className="flex justify-end gap-2 mt-2">{applyFilterButton}</div>
      </>
    );
  }

  const bestSellerButtonColor = changeButtonColor(filterValues.isBestSeller);
  const newButtonColor = changeButtonColor(filterValues.isNew);

  return (
    <div className="fixed mt-5 m-3">
      <div className="z-10 p-4 w-100 rounded-md bg-[#FDF2D7] border-[1px] border-[#AD6639] flex justify-center flex-col">
        <div className="flex justify-end">
          <button onClick={toggleFilterModal}>
            <img src="/assets/close_icon.png" />
          </button>
        </div>

        <div>
          <p className="font-oxygen font-bold text-[#AD6639] text-lg mb-2">
            Menu Categories
            <hr className="w-100 mt-1 border-[#AD6639]" />
          </p>

          <div className="flex flex-wrap gap-1">{getMenuCategories()}</div>
        </div>

        <div>
          <p className="font-oxygen font-bold text-[#AD6639] text-lg mb-2">
            Menu Categories
            <hr className="w-100 mt-1 border-[#AD6639]" />
          </p>

          <div className="flex flex-wrap gap-1">{getTypeCategories()}</div>
        </div>

        <div className="mt-3">
          <p className="font-oxygen font-bold text-[#AD6639] text-lg">
            Others
            <hr className="w-100 mt-1 border-[#AD6639] mb-2" />
          </p>

          <div className="flex flex-wrap gap-1">
            <OtherFilterButton
              name={"Best Seller"}
              selectOtherCategories={selectOtherCategories}
              buttonColor={bestSellerButtonColor}
            />
            <OtherFilterButton
              name={"New"}
              selectOtherCategories={selectOtherCategories}
              buttonColor={newButtonColor}
            />
          </div>
        </div>

        {displayModalButtons()}
      </div>
    </div>
  );
}

export default FilterModal;

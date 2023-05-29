import React, { useState } from "react";
import { MenuType, FoodType } from "../data/menu";

export type FilterValuesType = {
  isNew: boolean;
  isBestSeller: boolean;
  type: string,
};

function useFilter(
  menuData: MenuType,
  setMenuData: React.Dispatch<React.SetStateAction<MenuType>>
) {

  const [selectedCategories, setSelectedCategories] = useState<
    Array<keyof MenuType>
  >([]);

  const [filterValues, setFilterValues] = useState<FilterValuesType>({
    isNew: false,
    isBestSeller: false,
    type: '',
  });

  const [appliedSelectedCategories, setAppliedSelectedCategories] = useState<
    Array<keyof MenuType>
  >([]);

  const [appliedFilterValues, setAppliedFilterValues] =
    useState<FilterValuesType>({
      isNew: false,
      isBestSeller: false,
      type: '',
    });

  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);

  const [originalMenuData] = useState<MenuType>(menuData);

  function removeFilter(): void {
    setSelectedCategories([]);
    setFilterValues({
      isNew: false,
      isBestSeller: false,
      type: '',
    });
    setMenuData(originalMenuData);
  }

  const otherFiltersOnlyAreSelected =
    selectedCategories.length === 0 &&
    (filterValues.isNew || filterValues.isBestSeller);

  const noFiltersAreSelected =
    selectedCategories.length === 0 &&
    !filterValues.isNew &&
    !filterValues.isBestSeller &&
    filterValues.type === ''
    ;

  function filterMenuByCategory(
    categories: (keyof MenuType)[],
    filters: {
      isNew?: boolean;
      isBestSeller?: boolean;
      type: string,
    } = {}
  ) {
    let filteredMenu: any = {};

    if (otherFiltersOnlyAreSelected) {
      categories = Object.keys(menuData) as (keyof MenuType)[];
    }

    if (noFiltersAreSelected) {
      setAppliedSelectedCategories([]);
      setAppliedFilterValues({
        isNew: false,
        isBestSeller: false,
        type: '',
      });
      return setMenuData(originalMenuData);
    }

    for (const subMenu in originalMenuData) {
      let categoryMenu = originalMenuData[subMenu as keyof MenuType];

      if (
        !categories.includes(subMenu as keyof MenuType) &&
        (!filters.isNew && !filters.isBestSeller && filterValues.type === '')
      ) {
        categoryMenu = [];
      }

      if (filters.isNew && categories.includes(subMenu as keyof MenuType)) {
        categoryMenu = categoryMenu.filter((item) => item.isNew === true);
      }

      if (
        filters.isBestSeller &&
        categories.includes(subMenu as keyof MenuType)
      ) {
        categoryMenu = categoryMenu.filter(
          (item) => item.isBestSeller === true
        );
      }

      if (
        filters.type !== '' &&
        categories.includes(subMenu as keyof MenuType)
      ) {
        console.log(categoryMenu);
        console.log(filters.type)
        categoryMenu = categoryMenu.filter(
          (item) => item.type === filters.type
        );
      }

      filteredMenu[subMenu] = categoryMenu;
    }

    setMenuData(filteredMenu);
    setAppliedSelectedCategories(selectedCategories);
    setAppliedFilterValues(filterValues);
  }

  function toggleFilterModal(): void {
    setShowFilterModal(!showFilterModal);
    setSelectedCategories(appliedSelectedCategories);
    setFilterValues(appliedFilterValues);
  }

  return {
    selectedCategories,
    setSelectedCategories,
    filterValues,
    setFilterValues,
    filterMenuByCategory,
    removeFilter,
    toggleFilterModal,
    showFilterModal,
    setAppliedSelectedCategories,
    setAppliedFilterValues
  };
}

export default useFilter;

import { Chinese, Indian, Filipino, BEEF, PORK, CHICKEN, VEGETARIAN, DESSERT, OTHERS } from "./subMenus";

export type MenuType = {
    chinese: SubMenuType[],
    indian: SubMenuType[],
    filipino: SubMenuType[],
}

export const FoodType: Array<string> = [BEEF, PORK, CHICKEN, VEGETARIAN, DESSERT, OTHERS];

export const Menu: MenuType = {
    chinese: Chinese,
    indian: Indian,
    filipino: Filipino
}
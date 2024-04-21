import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/data/types/screen";
import HomePage from ".";


const selectHomePage = (state: AppRootState) => state.homePage;

export const retrivePopularDishes = createSelector(
    selectHomePage,
    (HomePage) => HomePage.popularDishes
);

export const retriveNewDishes = createSelector(
    selectHomePage,
    (HomePage) => HomePage.popularDishes
);

export const retriveTopUsers = createSelector(
    selectHomePage,
    (HomePage) => HomePage.popularDishes
);
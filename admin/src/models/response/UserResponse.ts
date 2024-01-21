export interface UserResponse {
    email: string;
    name: string;
    _id: string;
}

export interface MealTimes {
    [key: string]: MealEntry[];
}

export interface MealEntry {
    _id: string,
    userId: string,
    text: string,
    date: string,
    foodIntake: string,
    hungryScale: number,
    satietyScale: number,
    __v: number
}

export interface UserDataResponse {
    user: UserResponse;
    mealTimes: MealTimes;
}
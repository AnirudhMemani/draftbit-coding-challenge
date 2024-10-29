import { UnitType } from "./constants";

export type TUnit = keyof typeof UnitType;

export type TMarginPaddingApiResponse = Record<keyof IMarginPaddingSettings, { value: string; unit: TUnit }>;

export interface IValueWithUnit {
    defaultValue: string;
    currentValue: string;
    defaultUnit: TUnit;
    currentUnit: TUnit;
    isFocused: boolean;
}

export interface IMarginPaddingSettings {
    marginTop: IValueWithUnit;
    marginBottom: IValueWithUnit;
    marginLeft: IValueWithUnit;
    marginRight: IValueWithUnit;
    paddingTop: IValueWithUnit;
    paddingBottom: IValueWithUnit;
    paddingLeft: IValueWithUnit;
    paddingRight: IValueWithUnit;
}

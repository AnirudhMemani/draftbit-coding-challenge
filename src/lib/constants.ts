export const UnitType = { POINTS: "pt", PERCENTAGE: "%", AUTO: "auto" } as const;

export const SERVER_URL = process.env.REACT_SERVER_URL || "http://localhost:12346";

export const version = "/api/v1";

export const LOCAL_STORAGE_KEYS = {
    COMPONENT_ID: "@component-id",
} as const;

export const componentId = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.COMPONENT_ID) ?? "");

import axios from "axios";
import { SetStateAction, useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import { componentId, UnitType } from "../lib/constants";
import { trimLeadingZeros } from "../lib/helpers";
import { IMarginPaddingSettings, TUnit } from "../lib/types";
import { cn } from "../lib/utils";

type TMarginPaddingSectionProps = {
    isLoading: boolean;
    marginPadding: IMarginPaddingSettings | null;
    setMarginPadding: React.Dispatch<SetStateAction<IMarginPaddingSettings | null>>;
};

/**
 * MarginPaddingSection Component
 *
 * This React functional component manages and displays margin and padding settings
 * for a given layout. It provides input fields and unit selectors for each margin
 * and padding property, allowing the user to adjust values and save changes.
 * The component also tracks input focus, default values, and changes,
 * enabling users to discard or reset values if necessary.
 *
 * Props:
 * - `isLoading` (boolean): Indicates if data is loading, showing a loader when true.
 * - `marginPadding` (IMarginPaddingSettings | null): The current margin and padding settings,
 *    including default and current values and units for each property.
 * - `setMarginPadding` (React.Dispatch<SetStateAction<IMarginPaddingSettings | null>>):
 *    Function to update the state of margin and padding settings.
 *
 * State:
 * - `inputWidth` (number): Tracks the width of the input element based on content,
 *    ensuring the entire input is displayed.
 *
 * Helper Functions:
 * - `buildRequestBody`: Formats the current margin and padding values into a structure
 *    suitable for the API request payload.
 * - `setCurrentAsDefault`: Resets the default values and units for margin and padding
 *    to their current values, updating the initial state.
 * - `handleSaveChanges`: Sends a PUT request with current settings to the backend API.
 *    Updates default values if the request is successful.
 * - `handleDiscardChanges`: Resets the current values and units for all properties
 *    to their respective default values.
 * - `handleInputChange`: Validates and updates the input value for a given margin or padding key.
 * - `handleFocusChange`: Updates focus status for the specified key, toggling styles
 *    based on focus.
 * - `handleUnitSelection`: Updates the unit for a specified key when a new unit is selected
 *    from the dropdown.
 *
 * UI Structure:
 * - Renders input and dropdown selectors for each margin and padding property.
 * - Buttons for saving and discarding changes.
 *
 * API:
 * - PUT request to `/api/v1/component/${componentId}/margin-padding` updates margin
 *    and padding values on the backend.
 *
 * @returns JSX.Element
 */

export const MarginPaddingSection: React.FC<TMarginPaddingSectionProps> = ({
    isLoading,
    marginPadding,
    setMarginPadding,
}): React.JSX.Element => {
    const spanRef = useRef<HTMLSpanElement | null>(null);
    const [inputWidth, setInputWidth] = useState<number>(0);

    useEffect(() => {
        if (spanRef.current) {
            setInputWidth(spanRef.current.offsetWidth);
        }
    }, [marginPadding]);

    const buildRequestBody = (settings: IMarginPaddingSettings) => {
        return Object.keys(settings).reduce(
            (acc, key) => {
                const prop = key as keyof IMarginPaddingSettings;
                acc[prop] = {
                    value: settings[prop].currentUnit !== "AUTO" ? Number(settings[prop].currentValue) : undefined,
                    unit: settings[prop].currentUnit,
                };
                return acc;
            },
            {} as Record<keyof IMarginPaddingSettings, { value?: number; unit: TUnit }>
        );
    };

    const setCurrentAsDefault = (settings: IMarginPaddingSettings) => {
        return Object.keys(settings).reduce((acc, key) => {
            const prop = key as keyof IMarginPaddingSettings;
            acc[prop] = {
                ...settings[prop],
                defaultValue: settings[prop].currentValue,
                defaultUnit: settings[prop].currentUnit,
            };
            return acc;
        }, {} as IMarginPaddingSettings);
    };

    const handleSaveChanges = async () => {
        if (!marginPadding) {
            return;
        }

        try {
            const requestBody = buildRequestBody(marginPadding);
            console.log("\n\n\nrequestBody:", requestBody);

            const { status } = await axios.put(
                `http://localhost:12346/api/v1/component/${componentId}/margin-padding`,
                requestBody
            );

            if (status === 200) {
                setMarginPadding(setCurrentAsDefault(marginPadding));
                alert("Values saved successfully");
                return;
            }

            console.log("Failed to update margin and padding details");
        } catch (error) {
            console.log("Error updating margin and padding details", error);
        }
    };

    const handleDiscardChanges = () => {
        if (!marginPadding) {
            return;
        }

        setMarginPadding((prev) =>
            prev
                ? Object.keys(prev).reduce((acc, key) => {
                      const prop = key as keyof IMarginPaddingSettings;
                      acc[prop] = {
                          ...prev[prop],
                          currentValue: prev[prop].defaultValue,
                          currentUnit: prev[prop].defaultUnit,
                      };
                      return acc;
                  }, {} as IMarginPaddingSettings)
                : prev
        );
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, key: keyof IMarginPaddingSettings) => {
        const inputValue = trimLeadingZeros(event.target.value.trim());

        if (/^\d*\.?\d*$/.test(inputValue) || inputValue === "") {
            setMarginPadding((prev) =>
                prev
                    ? {
                          ...prev,
                          [key]: { ...prev[key], currentValue: inputValue },
                      }
                    : prev
            );
        } else {
            let hasDot = false;
            const sanitizedValue = inputValue
                .replace(/[^0-9.]/g, "")
                .replace(/(\..*?)\..*/g, "$1")
                .split("")
                .filter((char) => {
                    const charCode = char.charCodeAt(0);
                    if (charCode >= 48 && charCode <= 57) {
                        return true;
                    }
                    if (charCode === 46 && !hasDot) {
                        hasDot = true;
                        return true;
                    }
                    return false;
                })
                .join("");

            setMarginPadding((prev) =>
                prev
                    ? {
                          ...prev,
                          [key]: {
                              ...prev[key],
                              currentValue: sanitizedValue,
                          },
                      }
                    : prev
            );
        }
    };

    const handleFocusChange = (key: keyof IMarginPaddingSettings, isFocused: boolean) => {
        setMarginPadding((prev) =>
            prev
                ? {
                      ...prev,
                      [key]: {
                          ...prev[key],
                          isFocused,
                      },
                  }
                : prev
        );
    };

    const handleUnitSelection = (event: React.ChangeEvent<HTMLSelectElement>, key: keyof IMarginPaddingSettings) => {
        const unitValue = event.target.value as TUnit;

        setMarginPadding((prev) =>
            prev
                ? {
                      ...prev,
                      [key]: {
                          ...prev[key],
                          currentUnit: unitValue,
                          isFocused: false,
                      },
                  }
                : prev
        );
    };

    const renderInput = (key: keyof IMarginPaddingSettings) => {
        if (!marginPadding) {
            return;
        }

        const { currentValue, defaultValue, currentUnit, defaultUnit, isFocused } = marginPadding[key];

        const hasChanged = currentValue !== defaultValue || currentUnit !== defaultUnit;

        return (
            <div
                className={cn(
                    "flex items-center",
                    isFocused && currentUnit !== "AUTO" && "divide-x divide-blue-600 rounded ring-2 ring-blue-600",
                    !isFocused && hasChanged && "underline decoration-yellow-400 decoration-dotted underline-offset-4"
                )}
                onFocus={() => handleFocusChange(key, true)}
                onBlur={() => handleFocusChange(key, false)}
            >
                {currentUnit !== "AUTO" &&
                    (isFocused ? (
                        <div>
                            <span className="absolute -z-50 whitespace-pre opacity-0" ref={spanRef}>
                                {currentValue}
                            </span>
                            <input
                                type="text"
                                className="min-w-6 rounded bg-transparent px-px text-mono-50 focus:outline-none"
                                style={{ width: inputWidth }}
                                onChange={(event) => handleInputChange(event, key)}
                                value={currentValue}
                                onFocus={(event) => event.target.select()}
                                autoFocus
                            />
                        </div>
                    ) : (
                        <span className="text-mono-50" onClick={() => handleFocusChange(key, true)}>
                            {currentValue}
                        </span>
                    ))}

                <select
                    onChange={(event) => handleUnitSelection(event, key)}
                    value={currentUnit}
                    className={cn("rounded bg-transparent focus:outline-none", isFocused && "text-center")}
                >
                    {Object.entries(UnitType).map(([unit, label], index) => (
                        <option key={`${index}-${unit}`} value={unit} className="bg-mono-900">
                            {label}
                        </option>
                    ))}
                </select>
            </div>
        );
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!marginPadding) {
        return <div>Failed to fetch values</div>;
    }

    return (
        <section className="p-2">
            {/* Rows container */}
            <div className="space-y-3 overflow-hidden rounded bg-mono-700 px-3 py-5 text-[#95a2b9]">
                {/* Row 1 */}
                <div className="relative flex w-full items-center justify-center">{renderInput("marginTop")}</div>
                {/* Row 2 */}
                <div className="flex items-center justify-between gap-6 px-2">
                    {renderInput("marginLeft")}
                    <div className="w-full border-4 border-[#28334d] p-3">
                        <div className="flex items-center justify-center">{renderInput("paddingTop")}</div>
                        <div className="flex items-center justify-between">
                            {renderInput("paddingLeft")}
                            {renderInput("paddingRight")}
                        </div>
                        <div className="flex items-center justify-center">{renderInput("paddingBottom")}</div>
                    </div>
                    {renderInput("marginRight")}
                </div>
                {/* Row 3 */}
                <div className="relative flex w-full items-center justify-center">{renderInput("marginBottom")}</div>
            </div>

            <div className="flex items-center justify-end gap-3">
                <Button onClick={handleDiscardChanges}>Discard</Button>
                <Button onClick={handleSaveChanges}>Save</Button>
            </div>
        </section>
    );
};

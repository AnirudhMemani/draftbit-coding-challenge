import axios from "axios";
import React, { useEffect, useState } from "react";
import Collapsible from "../components/Collapsible";
import ViewExamples from "../components/ViewExamples";
import { componentId } from "../lib/constants";
import { IMarginPaddingSettings, IValueWithUnit, TMarginPaddingApiResponse } from "../lib/types";
import { MarginPaddingSection } from "../sections/MarginPadding";
import "../styles/PropertiesPanel.css";

/**
 * PropertiesPanel Component
 *
 * This component serves as a side panel within the application UI that provides
 * interactive sections for configuring component properties, such as margin and padding.
 * The panel includes expandable sections and fetches relevant data from an API.
 *
 * @component
 * @returns {React.FC} The PropertiesPanel component rendering sections for margin, padding, examples, etc.
 */
const PropertiesPanel: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [marginPadding, setMarginPadding] = useState<IMarginPaddingSettings | null>(null);

    /**
     * Creates a structured object representing margin or padding values with units.
     *
     * This helper function takes a property name and maps data from the API response
     * into an object that contains both the default and current values and units.
     *
     * @param {TMarginPaddingApiResponse} data - The API response containing margin/padding data.
     * @param {keyof TMarginPaddingApiResponse} prop - The specific margin/padding property to retrieve.
     * @returns {IValueWithUnit} An object with default and current values and units for the property.
     */
    const createValueUnitObject = (
        data: TMarginPaddingApiResponse,
        prop: keyof TMarginPaddingApiResponse
    ): IValueWithUnit => ({
        defaultValue: data[prop].value,
        currentValue: data[prop].value,
        defaultUnit: data[prop].unit,
        currentUnit: data[prop].unit,
        isFocused: false,
    });

    /**
     * Maps the API response data to the application's state format.
     *
     * This function converts the API response into the structured format
     * expected by the `marginPadding` state, ensuring consistent data handling
     * within the component.
     *
     * @param {TMarginPaddingApiResponse} data - The response from the margin and padding API.
     * @returns {IMarginPaddingSettings} The mapped data object for component state.
     */
    const mapApiResponseToState = (data: TMarginPaddingApiResponse): IMarginPaddingSettings => ({
        marginTop: createValueUnitObject(data, "marginTop"),
        marginBottom: createValueUnitObject(data, "marginBottom"),
        marginLeft: createValueUnitObject(data, "marginLeft"),
        marginRight: createValueUnitObject(data, "marginRight"),
        paddingTop: createValueUnitObject(data, "paddingTop"),
        paddingBottom: createValueUnitObject(data, "paddingBottom"),
        paddingLeft: createValueUnitObject(data, "paddingLeft"),
        paddingRight: createValueUnitObject(data, "paddingRight"),
    });

    /**
     * Fetches margin and padding configuration data for the given component ID.
     *
     * This asynchronous function calls the backend API to retrieve margin and padding
     * settings for the specified component, updates the `marginPadding` state on success,
     * and logs an error on failure.
     *
     * @param {string} id - The component's unique ID.
     */
    const fetchMarginPaddingData = async (id: string) => {
        try {
            setIsLoading(true);
            const { data, status } = await axios.get(`http://localhost:12346/api/v1/component/${id}/margin-padding`);

            if (status === 200) {
                setMarginPadding(mapApiResponseToState(data));
                return;
            }
            console.error(`Failed to fetch margin and padding data | Status: ${status} | Data: ${data}`);
        } catch (error) {
            console.error("Error fetching margin and padding settings", error);
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * useEffect hook to initialize margin and padding data.
     *
     * This hook checks if `marginPadding` data is already available.
     * If not, and if a `componentId` is available, it calls `fetchMarginPaddingData`
     * to load the settings from the backend API.
     */
    useEffect(() => {
        if (!marginPadding && componentId) {
            fetchMarginPaddingData(componentId);
        }
    }, [marginPadding, componentId]);

    return (
        <aside className="PropertiesPanel">
            <Collapsible title="Load examples">
                <ViewExamples />
            </Collapsible>
            <Collapsible title="Margins & Padding">
                <MarginPaddingSection
                    isLoading={isLoading}
                    marginPadding={marginPadding}
                    setMarginPadding={setMarginPadding}
                />
            </Collapsible>
            <Collapsible title="Size">
                <span>example</span>
            </Collapsible>
        </aside>
    );
};

export default PropertiesPanel;

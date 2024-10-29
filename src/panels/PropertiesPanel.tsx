import axios from "axios";
import React, { useEffect, useState } from "react";
import Collapsible from "../components/Collapsible";
import ViewExamples from "../components/ViewExamples";
import { componentId } from "../lib/constants";
import { IMarginPaddingSettings, IValueWithUnit, TMarginPaddingApiResponse } from "../lib/types";
import { MarginPaddingSection } from "../sections/MarginPadding";
import "../styles/PropertiesPanel.css";

const PropertiesPanel: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [marginPadding, setMarginPadding] = useState<IMarginPaddingSettings | null>(null);

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

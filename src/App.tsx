import axios from "axios";
import React, { useEffect } from "react";
import { componentId, LOCAL_STORAGE_KEYS, SERVER_URL, version } from "./lib/constants";
import PropertiesPanel from "./panels/PropertiesPanel";
import "./styles/App.css";

function App(): React.JSX.Element {
    const fetchComponentId = async () => {
        try {
            const { data, status } = await axios.get(`${SERVER_URL}${version}/component`);
            if (status === 200) {
                localStorage.setItem(LOCAL_STORAGE_KEYS.COMPONENT_ID, JSON.stringify(data?.componentId));
                return;
            }
            console.error("Could not fetch component ID");
        } catch (error) {
            console.error("Error fetching component ID");
        }
    };

    useEffect(() => {
        if (!componentId) {
            fetchComponentId();
        }
    }, [componentId]);

    return (
        <div className="App">
            <PropertiesPanel />
        </div>
    );
}

export default App;

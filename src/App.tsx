import axios from "axios";
import React, { useEffect } from "react";
import { componentId, LOCAL_STORAGE_KEYS, SERVER_URL, version } from "./lib/constants";
import PropertiesPanel from "./panels/PropertiesPanel";
import "./styles/App.css";

/**
 * App Component
 *
 * The primary component responsible for fetching and storing a unique component ID
 * in local storage, then rendering the `PropertiesPanel`. It serves as the main
 * container for application logic and components.
 *
 * @returns {React.JSX.Element} The App component with a properties panel.
 */
function App(): React.JSX.Element {
    /**
     * Fetches the component ID from the server.
     *
     * This asynchronous function makes a GET request to retrieve the component ID from
     * the server. Upon a successful response (HTTP 200), it stores the component ID
     * in local storage. If unsuccessful, it logs an error message to the console.
     */
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

    /**
     * useEffect hook to fetch component ID if it doesn't exist in constants.
     *
     * This hook checks if a `componentId` is defined. If not, it calls `fetchComponentId`
     * to retrieve and store the component ID.
     */
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

import { useState } from "react";

const Collapsible: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <section className="Collapsible">
            <button className="Collapsible-button" onClick={() => setCollapsed((prev) => !prev)}>
                <span>{title}</span> <span>{collapsed ? "+" : "-"}</span>
            </button>
            {!collapsed && <div className="Collapsible-content">{children}</div>}
        </section>
    );
};

export default Collapsible;

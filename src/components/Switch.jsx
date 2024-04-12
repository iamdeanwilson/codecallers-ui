export const Switch = ({ toggleTheme, theme }) => {
    return (
        <div className="container-switch">
            <label className="switch">
                <input type="checkbox" checked={theme === 'dark'} onChange={toggleTheme} />
                <span className="slider round"></span>
            </label>
        </div>
    );
};
import "./index.css";

const TabItem = (props) => {
  const { tabDetails, clickTabItem, isActive } = props;
  const { tabId } = tabDetails;
  const onClickTabItem = () => {
    clickTabItem(tabId);
  };

  const activeTabBtnClassName = isActive ? "active-tab-btn" : "";

  return (
    <li className="tab-item-container ">
      <button
        type="submit"
        className={`tab-btn ${activeTabBtnClassName}`}
        onClick={onClickTabItem}
      >
        {tabId}
      </button>
    </li>
  );
};

export default TabItem;

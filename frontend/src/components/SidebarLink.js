import { useNavigate } from "react-router-dom";

function SidebarLink({ Icon, text, active }) {
  const navigate = useNavigate();

  function navigateHandler() {
    navigate(`/${text}`);
  }

  return (
    <div
      onClick={navigateHandler}
      className={`text-blackText flex items-center justify-center xl:justify-start text-xl space-x-3 hoverAnimation ${
        active ? "text-primaryColor" : ""
      }`}
    >
      <Icon
        className={`h-8 w-8 ${active ? "text-primaryColor" : "text-blackText"}`}
      />
      <span className="hidden xl:inline">{text}</span>
    </div>
  );
}

export default SidebarLink;

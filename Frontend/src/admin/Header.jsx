import SearchBar from "../ui/SearchBar";
import NotificationBar from "./Notification";
import Welcome from "./Welcome";

function Header({ isOpen, setIsOpen, search, notif, isLoading }) {
  return (
    !isLoading && (
      <header className="pt-11 px-10 pr-[1.5rem] flex items-center justify-between h-[fit-content] mb-12 max-[770px]:pl-max-[600px]:flex-col max-[600px]:gap-8 max-[600px]:pl-6">
        <Welcome isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="flex items-center max-[300px]:flex-col-reverse max-[300px]:gap-2">
          {notif && <NotificationBar />}
          <div className="w-7"></div>
          {search && <SearchBar />}
        </div>
      </header>
    )
  );
}

export default Header;

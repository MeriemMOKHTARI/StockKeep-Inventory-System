function SelectPermission({ children, name, id, onBlur, onChange }) {
  return (
    <div className="py-4 flex items-center border-b-2 border-[#F0F1F3] mb-4">
      <input type="checkbox" className="rounded-full" id="permission" />
      <label
        htmlFor="permission"
        className="font-poppins text-[1.3rem] text-[#48505E] font-medium ml-16"
      >
        {children}
      </label>
    </div>
  );
}

export default SelectPermission;

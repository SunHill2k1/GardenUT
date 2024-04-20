type props = {
  type: string;
  value?: string;
  placeHolder: string;
  handleChangeValue?: any;
  className?: string;
  handleSearch?: any;
};

function SearchInput({
  type,
  value,
  placeHolder,
  handleChangeValue,
  className,
  handleSearch,
}: props) {
  return (
    <input
      className={className}
      type={type}
      placeholder={placeHolder}
      value={value}
      onChange={handleChangeValue}
      onKeyUp={handleSearch}
    />
  );
}

export default SearchInput;

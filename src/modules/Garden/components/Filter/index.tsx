import classNames from "classnames/bind";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "~/components/Button";
import SearchInput from "~/components/SearchInput";
import style from "./Filter.module.scss";

const cx = classNames.bind(style);

type filterProps = {
  categories: any;
  filterChange: any;
  handleFilterChange: Function;
  handleSetPrice: Function;
};

function Filter({
  categories,
  filterChange,
  handleFilterChange,
  handleSetPrice,
}: filterProps) {
  const [activeBtnFilter, setActiceBtnFilter] = useState(false);

  //search
  const [searchValue, setSearchValue] = useState<string>("");
  const handleChangeValue = (e: any) => {
    setSearchValue(e.target.value);
  };

  const navigate = useNavigate();

  const handleSearch = (e: any) => {
    navigate(`/products/search/${searchValue}`);
  };

  return (
    <>
      <div className={cx("list-btn-filter")}>
        <Button
          primary
          className={cx("btn-filter")}
          onClick={() => setActiceBtnFilter(!activeBtnFilter)}
        >
          <i className="bx bx-filter"></i>
        </Button>
        <div className={cx("search-bar")}>
          <SearchInput
            type="text"
            placeHolder="Tìm kiếm"
            value={searchValue}
            handleChangeValue={handleChangeValue}
          />
          <Button
            iconOnly
            rightIcon={<i className="bx bx-search"></i>}
            className={cx("search-btn")}
            onClick={handleSearch}
          />
        </div>
      </div>

      {activeBtnFilter ? (
        <div className={cx("filter-container")}>
          <div
            className={cx("filter-overlay")}
            onClick={() => setActiceBtnFilter(!activeBtnFilter)}
          ></div>
          <div className={cx("filter-mobile")}>
            <FilterItem
              categories={categories}
              filterChange={filterChange}
              handleFilterChange={handleFilterChange}
              handleSetPrice={handleSetPrice}
            />
          </div>
        </div>
      ) : (
        <div className={cx("filter")}>
          <FilterItem
            categories={categories}
            filterChange={filterChange}
            handleFilterChange={handleFilterChange}
            handleSetPrice={handleSetPrice}
          />
        </div>
      )}
    </>
  );
}

const FilterItem = ({
  categories,
  filterChange,
  handleFilterChange,
  handleSetPrice,
}: filterProps) => {
  const handleSetFilters = (e: any) => {
    const idType = parseInt(e.target.id);

    if (e.target.checked) {
      handleFilterChange((prev: any) =>
        [...prev, idType].filter((item: any) => item !== -1)
      );
    } else {
      handleFilterChange(filterChange.filter((item: any) => item !== idType));
    }
  };

  const navigate = useNavigate();
  const handleClearAll = () => {
    handleFilterChange([]);
    navigate("/products");
    handleSetPrice({ priceFrom: -1, priceTo: -1 });
  };

  const handleIsChecked = (item: number) => {
    return filterChange.includes(item);
  };

  const [priceRange, setPriceRange] = useState<any>({
    priceFrom: -1,
    priceTo: -1,
  });

  return (
    <>
      <h3>Lọc</h3>
      {(filterChange.length > 0 ||
        priceRange.priceTo !== -1 ||
        priceRange.priceTo !== -1) && (
        <div className={cx("clear-all")}>
          <Button primary onClick={handleClearAll}>
            Thiết lập lại
          </Button>
        </div>
      )}
      <div className={cx("categories")}>
        <div className={cx("title")}>Thể loại</div>
        {categories.map((item: any, i: number) => (
          <div className={cx("category-item")} key={i}>
            <input
              type="checkbox"
              id={item.id}
              checked={handleIsChecked(item.id)}
              onChange={handleSetFilters}
            />
            <label htmlFor={item.id}>{item.name}</label>
          </div>
        ))}
      </div>
      <div className={cx("prices")}>
        <div className={cx("title")}>Giá</div>
        <div className={cx("price")}>
          <div className={cx("start-price")}>
            <input
              type="text"
              placeholder="Min"
              value={priceRange.priceFrom}
              onChange={(e) =>
                setPriceRange({ ...priceRange, priceFrom: e.target.value })
              }
            />
          </div>
          <div>
            <i className="bx bx-minus"></i>
          </div>
          <div className={cx("end-price")}>
            <input
              type="text"
              placeholder="Max"
              min={priceRange.priceFrom}
              value={priceRange.priceTo}
              onChange={(e) =>
                setPriceRange({ ...priceRange, priceTo: e.target.value })
              }
            />
          </div>
        </div>
        <Button
          primary
          className={cx("btn-price")}
          onClick={() => handleSetPrice(priceRange)}
        >
          Áp dụng
        </Button>
      </div>
    </>
  );
};

export default Filter;

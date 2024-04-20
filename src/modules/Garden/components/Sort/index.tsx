import classNames from "classnames/bind";
import { useState } from "react";
import style from "./Sort.module.scss";

const cx = classNames.bind(style);

type props = {
  handleSort?: any;
  sortValue?: string;
};

function Sort({ handleSort, sortValue }: props) {
  const handleSetSort = (e: any) => {
    handleSort(e.target.value);
  };

  return (
    <div className={cx("sort")}>
      {/* <div className={cx("title")}>Sort</div> */}
      <div className={cx("list-sort")}>
        {/* <button
          value="popular"
          className={
            sortValue == "popular" ? cx("btn-sort", "active") : cx("btn-sort")
          }
          onClick={handleSetSort}
        >
          Popular
        </button>
        <button
          value="mostNew"
          className={
            sortValue == "mostNew" ? cx("btn-sort", "active") : cx("btn-sort")
          }
          onClick={handleSetSort}
        >
          Most New
        </button> */}
        <select className={cx("btn-sort")} onChange={handleSetSort}>
          <option hidden>Giá</option>
          <option value="ascending">Tăng dần</option>
          <option value="descending">Giảm dần</option>
        </select>
      </div>
    </div>
  );
}

export default Sort;

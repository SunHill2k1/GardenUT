import React, { useState } from "react";

//style
import classNames from "classnames/bind";
import style from "./Pagination.module.scss";

//components
import Button from "../Button";

const cx = classNames.bind(style);

type props = {
  pageIndex: number;
  pageSize: number;
  totalRecord: number;
  onChangeSize?: Function;
  onChangePageIndex: Function;
  onChangePageSize: Function;
};

function Pagination({
  pageIndex,
  pageSize,
  totalRecord,
  onChangePageSize,
  onChangePageIndex,
}: props) {
  const [range, setRange] = useState<any>({
    start: 0,
    end: 5,
  });
  const TotalPage: number = Math.ceil(totalRecord / pageSize);
  // INIT
  const LIST_BUTTON: number[] = [];

  for (let i = 0; i < TotalPage; i++) {
    LIST_BUTTON.push(i);
  }

  const handleChangePage = (page: number) => {
    onChangePageIndex(page);

    if (page >= range.end) {
      setRange((prev: any) => {
        return {
          start: prev.start + pageSize,
          end: prev.end + pageSize,
        };
      });
    }

    if (page < range.start) {
      setRange((prev: any) => {
        return {
          start: prev.start - pageSize < 0 ? 0 : prev.start - pageSize,
          end: prev.end - pageSize < 0 ? 5 : prev.end - pageSize,
        };
      });
    }
  };

  return (
    <div className={cx("pagination")}>
      <div className={cx("page-size")}>
        <label>Số lượng hiển thị:</label>
        <select
          value={pageSize}
          onChange={(e) => onChangePageSize(e.target.value)}
          className={cx("page-size")}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </div>
      <div className={cx("btn-list")}>
        <Button
          rounded
          leftIcon={<i className="bx bxs-chevron-left"></i>}
          className={cx("btn-page")}
          onClick={() => handleChangePage(pageIndex - 1)}
          disabled={pageIndex <= 0}
        ></Button>
        {LIST_BUTTON.slice(range.start, range.end).map((btn, index) => (
          <Button
            rounded
            key={index}
            onClick={() => handleChangePage(btn)}
            className={
              btn === pageIndex ? cx("btn-page-active") : cx("btn-page")
            }
          >
            {btn + 1}
          </Button>
        ))}

        <Button
          rounded
          leftIcon={<i className="bx bxs-chevron-right"></i>}
          className={cx("btn-page")}
          onClick={() => handleChangePage(pageIndex + 1)}
          disabled={pageIndex + 1 === TotalPage}
        ></Button>
      </div>
    </div>
  );
}

export default Pagination;

import React, { useEffect, useState } from "react";
import { products } from "./ProductsArr";
import { FaSearch } from "react-icons/fa";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";

export default function ProductList() {
  const [itemList] = useState(products);
  const [filteredItems, setFilteredItems] = useState(products);
  const [boxValue, setBoxValue] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [showcheckbox, setShowCheckbox] = useState(false);
  // Filter items based on selected brand
  const handleBrandFilter = (brand) => {
    setSelectedBrand(brand);
    applyFilters(search, boxValue, brand);
  };

  // Handle search input changes
  const handleSearch = (e) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
    applyFilters(newSearch, boxValue, selectedBrand);
  };

  // Handle checkbox changes
  const handleCheckbox = (e) => {
    const { value, checked } = e.target;
    const updatedBoxValue = checked
      ? [...boxValue, value.toLowerCase()]
      : boxValue.filter((item) => item !== value.toLowerCase());

    setBoxValue(updatedBoxValue);
    applyFilters(search, updatedBoxValue, selectedBrand);
  };

  // Apply all filters
  const applyFilters = (searchTerm, categories, brandFilter) => {
    let result = itemList;

    // Apply brand filter
    if (brandFilter !== "all") {
      result = result.filter(
        (item) => item.brand.toLowerCase() === brandFilter.toLowerCase()
      );
    }

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.color.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply checkbox filter
    if (categories.length > 0) {
      result = result.filter((item) =>
        categories.includes(item.type.toLowerCase())
      );
    }

    setFilteredItems(result);
  };

  ///////////////////////////////////////////
  function handlefilteredbox() {
    setShowCheckbox(!showcheckbox);
  }
  const activeshowcheckbox = showcheckbox ? "active" : "";
  ///////////////////////////////////
  return (
    <div>
      <div className="btn-div">
        {["all", "hm", "dolce gabana", "nick", "zara", "xxl", "gucci"].map(
          (brand) => (
            <button key={brand} onClick={() => handleBrandFilter(brand)}>
              {brand.charAt(0).toUpperCase() + brand.slice(1)}
            </button>
          )
        )}
      </div>
      <div className="search-div">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search by name, color, or brand"
        />
        <FaSearch className="search-icon" />
      </div>
      <div className={`filter-div ${activeshowcheckbox}`}>
        <div className="header">
          <h1>Filter</h1>
          {showcheckbox ? (
            <BiSolidUpArrow onClick={handlefilteredbox} />
          ) : (
            <BiSolidDownArrow onClick={handlefilteredbox} />
          )}
        </div>
        <div className={`checkbox-div`}>
          {["Jeans", "T-shirt", "Jacket"].map((item) => (
            <label key={item}>
              <input type="checkbox" value={item} onChange={handleCheckbox} />
              {item}
            </label>
          ))}
        </div>
      </div>
      <div className="wrapper">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <div className="container" key={index}>
              <img src={item.img} alt={item.name} />
              <div className="text-div">
                <h3>Name: {item.name}</h3>
                <h4>Color: {item.color}</h4>
                <h4>Brand: {item.brand}</h4>
                <p>Price: ${item.price}</p>
              </div>
              <button>Add To Cart</button>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
}

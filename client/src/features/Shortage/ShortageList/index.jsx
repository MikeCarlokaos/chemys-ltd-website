import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as shortageApi from "../../../services/shortageService";
import PrevIcon from "../../../assets/icons/PrevIcon";
import NextIcon from "../../../assets/icons/NextIcon";
import arrowRight from "../../../assets/icons/arrow-right.svg";

const ShortageList = () => {
  const [shortages, setShortages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortCriteria, setSortCriteria] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [search, setSearchTerm] = useState("");

  const itemsPerPage = 10;

  useEffect(() => {
    fetchShortages();
  }, [currentPage, sortCriteria, sortOrder, search]);

  const sortShortages = (shortages, criteria, order) => {
    return shortages.slice().sort((a, b) => {
      const valueA = a[criteria];
      const valueB = b[criteria];
      return valueA.localeCompare(valueB) * (order === "desc" ? -1 : 1);
    });
  };

  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const navigate = useNavigate();

  const fetchShortages = async (
    page = currentPage,
    criteria = sortCriteria,
    order = sortOrder,
    searchTerm = search
  ) => {
    console.log("Fetching shortages with search term:", searchTerm);

    try {
      const response = await shortageApi.fetchShortages({
        page,
        limit: itemsPerPage,
        criteria,
        order,
        searchTerm,
      });

      console.log("API response:", response);

      if (response && response.shortages && response.totalItems) {
        const sortedShortages = sortShortages(
          response.shortages,
          criteria,
          order
        );
        setShortages(sortedShortages);

        const calculatedTotalPages = Math.ceil(
          response.totalItems / itemsPerPage
        );
        setTotalPages(calculatedTotalPages);
      } else {
        console.error("Invalid data format received from the API:", response);
      }
    } catch (error) {
      console.error("Error fetching shortages:", error);
    }
  };

  const handlePageChange = async (newPage) => {
    setCurrentPage(newPage);
    await fetchShortages(newPage, sortCriteria, sortOrder, search);
  };

  const handleGotoPage = (selectedPage) => {
    handlePageChange(selectedPage);
  };

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const handleSortCriteriaChange = (e) => {
    const newSortCriteria = e.target.value;
    setSortCriteria(newSortCriteria);
    fetchShortages(currentPage, newSortCriteria, sortOrder, search);
  };

  const handleSortOrderChange = (e) => {
    const newSortOrder = e.target.value;
    setSortOrder(newSortOrder);
    fetchShortages(currentPage, sortCriteria, newSortOrder, search);
  };

  const handleSearchTermChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    setCurrentPage(1);
    fetchShortages(1, sortCriteria, sortOrder, newSearchTerm);
  };

  const handleRequestButtonClick = (shortageData) => {
    navigate("/contact", { state: { shortageData } });

    // Scroll to the contact form section after a short delay
    setTimeout(() => {
      const contactFormSection = document.getElementById(
        "contact-form-section"
      );
      if (contactFormSection) {
        contactFormSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 500); // Adjust the delay as needed
  };

  return (
    <div className="w-full h-full flex p-2 md:p-10">
      <div className="flex-1 flex flex-col">
        <div className="flex flex-col items-center justify-between gap-y-2 py-2 md:flex-row md:p-4 md:gap-0">
          <div className="w-full md:flex-grow md:ml-4">
            <input
              type="text"
              value={search}
              onChange={handleSearchTermChange}
              placeholder="Search by shortage or alternatives"
              className="w-full px-4 py-2 border-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          <div className="w-full flex items-center justify-center space-x-2 md:ml-4 md:justify-end">
            <label>Sort By:</label>
            <select
              value={sortCriteria}
              onChange={handleSortCriteriaChange}
              className="px-4 py-2 border-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            >
              <option value="name">Shortage Name</option>
              <option value="alternatives">Alternative</option>
            </select>
            <select
              value={sortOrder}
              onChange={handleSortOrderChange}
              className="px-4 py-2 border-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>

        <div>
          <table className="w-full border-2 border-slate-800 table-fixed text-center">
            <thead>
              <tr className="border-b-2 border-slate-800">
                <th className="py-2 px-4">Shortage Name</th>
                <th className="py-2 px-4">Alternative</th>
                <th className="py-2 px-4">Form</th>
                <th className="py-2 px-4">Pack Size</th>
                <th className="py-2 px-4">Request Medicine</th>
              </tr>
            </thead>
            <tbody>
              {shortages.map((shortage) => (
                <tr
                  key={shortage._id}
                  className="border-b border-slate-800 odd:bg-slate-200"
                >
                  <td className="py-2 px-4">{shortage.name}</td>
                  <td className="py-2 px-4">{shortage.alternatives}</td>
                  <td className="py-2 px-4">{shortage.form}</td>
                  <td className="py-2 px-4">{shortage.packSize}</td>
                  <td className="py-2 px-4">
                    {/* Request button */}
                    <div className="group">
                      <button
                        onClick={() => handleRequestButtonClick(shortage)}
                        className="px-4 py-2 border rounded-2xl bg-primary-300 text-white group-hover:bg-tertiary active:bg-secondary"
                      >
                        Request
                        <span>
                          <img
                            src={arrowRight}
                            alt="arrow"
                            className="inline w-0 h-3 invert align-baseline ease-in-out duration-300 group-hover:w-10"
                          />
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center items-center py-2 px-4">
          <div className="flex space-x-4">
            <button
              onClick={() => handleGotoPage(1)}
              disabled={currentPage === 1}
              className="cursor-pointer disabled:opacity-0"
            >
              <PrevIcon className="h-5 w-5" color={"#000000"} />
            </button>
            {pageNumbers.map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handleGotoPage(pageNumber)}
                className={`px-4 py-2 border rounded-md  ${
                  currentPage === pageNumber
                    ? "bg-primary-300 text-white"
                    : "hover:bg-white"
                }`}
              >
                {pageNumber}
              </button>
            ))}
            <button
              onClick={() => handleGotoPage(totalPages)}
              disabled={currentPage === totalPages}
              className="cursor-pointer disabled:opacity-0"
            >
              <NextIcon className="h-5 w-5" color={"#000000"} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShortageList;

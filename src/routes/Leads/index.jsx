/** @format */

import React, { useState, useEffect } from 'react';
import './index.css';
import {
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineClockCircle,
} from 'react-icons/ai';
import { HiOutlineChevronDown } from 'react-icons/hi';
import { getSpecificLead, getAllLeads } from '../../Api/adminApi';
import { allSendRequestForVendor } from '../../Api/vendorApi';
import { setFetching } from '../../redux/reducer/fetching';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import DeleteLeadConfimation from '../../components/DeleteLeadConfirmation';
import jwtDecode from 'jwt-decode';
import Pagination from '../../components/Pagination';
import LeadDetailsModal from '../../components/LeadDetailsModal';
import ConfirmModal from '../../components/ConfirmModal';
import { IndexFunction } from '../../utils/IndexFunction';
import moment from 'moment';
import { TOKEN } from '../../constant';

const Leads = () => {
  const [showEditVendor, setShowEditVendor] = useState(false);
  const [showLeadDetail, setShowLeadDetail] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [routes, setRoutes] = useState(false);
  const [allLeads, setAllLeads] = useState([]);
  const [specificLeads, setSpecificLeads] = useState({});
  const [userId, setUserId] = useState(null);
  const itemsPerPage = 10;

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = 'Leads';
    fetchAllLeads(currentPage);
  }, [currentPage]);

  const fetchAllLeads = async (currentPage) => {
    const token = localStorage.getItem('auth_token');
    dispatch(setFetching(true));
    try {
      const response = await getAllLeads(currentPage, token);
      if (response.status === 200) {
        console.warn(response);
        // const data = response.data?.data;
        setAllLeads(response?.data.lead);
        setTotalPages(response.data.totalPages);
        setRoutes(true);
      } else {
        setAllLeads([]);
      }
    } catch (error) {
      setAllLeads([]);
    } finally {
      dispatch(setFetching(false));
    }
  };

  // Pagination
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentData = allLeads;

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSpecificLead = async (id) => {
    console.warn(id);
    const token = localStorage.getItem('auth_token');
    dispatch(setFetching(true));
    try {
      const response = await getSpecificLead(token, id);
      console.log(response);
      if (response.status === 200) {
        console.log(response);
        setSpecificLeads(response?.data);
        dispatch(setFetching(false));
        setShowLeadDetail(true);
      }
    } catch (error) {
      dispatch(setFetching(false));
      toast.error('Leads not found!');
    }
  };

  const handleDeleteLeadModal = async (id) => {
    console.warn(id);
    // const token = localStorage.getItem('auth_token');
    // dispatch(setFetching(true));
    setUserId(id);
    setShowEditVendor(true);
    // try {
    //   const response = await getSpecificLead(token, id);
    //   console.log(response);
    //   if (response.status === 200) {
    //     dispatch(setFetching(false));
    //     toast.success('Delete Leads Successfully!');
    //     fetchAllLeads();
    //   }
    // } catch (error) {
    //   dispatch(setFetching(false));
    //   toast.error('Leads not found!');
    // }
  };

  const handleDropdown = (id) => {
    setAllLeads((prevVendors) =>
      prevVendors.map((user) => ({
        ...user,
        show: user._id === id ? !user.show : user.show,
      })),
    );
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );
  const customWidth = {
    width: '330px',
  };

  console.log(TOKEN);
  return (
    <>
      <div className="table-subContainer">
        <h5 className="customHeading">Leads</h5>
        <div className="table-main table-main-routes">
          <div className="table-container">
            <div className="table-wrapper px-4" style={{ height: '100vh' }}>
              <table className="tables">
                <thead className="table-heads head-design">
                  <tr className="head-tr" style={{ height: '4rem' }}>
                    <th>Sr. No.</th>
                    <th>User</th>
                    <th>Date</th>
                    <th>Email Address</th>
                    <th>Phone Number</th>
                    <th>Message</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="table-bodys">
                  {allLeads.length > 0
                    ? allLeads.map((lead, index) => (
                        <tr className="body-tr" key={index}>
                          <td>
                            {IndexFunction(
                              (currentPage - 1) * itemsPerPage + index + 1,
                            )}
                          </td>
                          <td>{lead.fullname}</td>
                          <td>
                            {lead?.createdAt
                              ? moment(lead?.createdAt).format('DD MMM YYYY')
                              : 'N/A'}
                          </td>
                          <td>{lead.email}</td>
                          <td>{lead.phoneNumber}</td>
                          <td>{lead.message}</td>
                          <td>
                            <div className="btn-align-center">
                              <span>Lead Action</span>
                              <div
                                className="dropdown "
                                style={{ width: '0px' }}
                              >
                                <button
                                  className=" select-option"
                                  type="button"
                                  id="dropdownMenuButton1"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <HiOutlineChevronDown fontSize={22} />
                                </button>
                                <ul
                                  className={`${'dropdown-menu drop-down  '}`}
                                  aria-labelledby="dropdownMenuButton1"
                                >
                                  <li
                                    onClick={() => handleSpecificLead(lead._id)}
                                  >
                                    View Details
                                  </li>
                                  <li
                                    onClick={() =>
                                      handleDeleteLeadModal(lead._id)
                                    }
                                  >
                                    Delete Lead
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </table>
            </div>
            <Pagination
              customWidth={customWidth}
              routes={routes}
              currentPage={currentPage}
              totalPages={totalPages}
              handlePrevPage={handlePrevPage}
              handleNextPage={handleNextPage}
              handlePageClick={handlePageClick}
              pageNumbers={pageNumbers}
            />
          </div>
        </div>
      </div>
      {showLeadDetail ? (
        <LeadDetailsModal
          specificLeads={specificLeads}
          setShowLeadDetail={setShowLeadDetail}
        />
      ) : null}
      {showEditVendor ? (
        <DeleteLeadConfimation
          fetchAllLeads={fetchAllLeads}
          dispatch={dispatch}
          userId={userId}
          setShowEditVendor={setShowEditVendor}
        />
      ) : null}
    </>
  );
};

export default Leads;

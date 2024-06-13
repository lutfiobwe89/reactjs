import React, { useState } from "react";
import ModalDelete from "./ModalDelete";
import ModalEdit from "./ModalEdit";
import ModalAdd from "./ModalAdd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Table({ dataTh, dataTd, columDb, buttonData, endpoint, columnDetail, judulModalEdit, inputData }) {
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [endpointReplaced, setEndpointReplaced] = useState({});
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [isOpenModalAdd, setIsOpenModalAdd] = useState(false);
  const navigate = useNavigate();

  function handleModalDelete(id) {
    const endpointDetail = endpoint['detail'];
    const endpointDelete = endpoint['delete'];
    const detailReplaced = endpointDetail.replace('{id}', id);
    const deleteReplaced = endpointDelete.replace('{id}', id);
    const replace = {
      "detail": detailReplaced,
      "delete": deleteReplaced
    };
    setEndpointReplaced(replace);
    setIsOpenModalDelete(true);
  }

  function handleModalEdit(id) {
    const endpointsDetail = endpoint['detail'];
    const endpointsUpdate = endpoint['update'];
    const detailReplaced = endpointsDetail.replace('{id}', id);
    const updateReplaced = endpointsUpdate.replace('{id}', id);
    const replaced = {
      "detail": detailReplaced,
      "update": updateReplaced
    };
    setEndpointReplaced(replaced);
    setIsOpenModalEdit(true);
  }

  function handleModalAdd() {
    const replaced = {
      "store": endpoint['store']
    };
    setEndpointReplaced(replaced);
    setIsOpenModalAdd(true);
  }

  function handleRestore(id) {
    const endpointRestore = endpoint['restore'].replace("{id}", id);
    axios.get(endpointRestore, {
      headers: {
        'Authorization': 'bearer ' + localStorage.getItem('access_token'),
      }
    })
      .then(res => {
        Swal.fire({
          title: 'Success',
          text: 'Data was successfully restored',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          navigate('/stuffs');
        });
      })
      .catch(err => {
        navigate('/login');
      });
  }

  return (
    <>
      <br />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-6 mx-auto mt-8">
        {buttonData.includes("create") && (
          <button
            onClick={handleModalAdd}
            style={{
              padding: '0.5rem 1rem',
              fontSize: '1rem',
              fontWeight: '500',
              color: '#ffffff',
              backgroundColor: '#34d058',
              border: '1px solid #34d058',
              borderRadius: '0.375rem',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              outline: 'none',
              transition:
                'background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s',
            }}
            className="focus:ring-4 focus:ring-green-100 hover:bg-green-100 hover:text-green-700 dark:bg-green-800 dark:text-green-400 dark:border-green-600 dark:hover:bg-green-700 dark:hover:text-white dark:focus:ring-green-700"
          >
            Create
          </button>
        )}
        {buttonData.includes("trash") && (
          <Link to={'/stuffs/trash'} className="ml-3 inline-flex items-center px-4 py-2 text-sm font-medium text-yellow-900 bg-white border border-yellow-200 rounded-lg hover:bg-yellow-100 hover:text-yellow-700 focus:outline-none focus:ring-4 focus:ring-yellow-100 dark:bg-yellow-800 dark:text-yellow-400 dark:border-yellow-600 dark:hover:bg-yellow-700 dark:hover:text-white dark:focus:ring-yellow-700">
            Trash
          </Link>
        )}
        <br />
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {dataTh.map((data, index) => (
                <th scope="col" className="px-6 py-3" key={index}>
                  {data}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.entries(dataTd).map(([index, value]) => (
              <tr className="bg-white border-b dark:border-gray-700" key={index}>
                <td className="px-6 py-4">{parseInt(index) + 1}.</td>
                {Object.entries(columDb).map(([i, v]) => {
                  const cellValue = !v ? value[i] : value[i.replace(/[!@#$%^&]/, "")] ? value[i.replace(/[!@#$%^&]/, "")][v] : "0";
                  return (
                    <td key={i} style={{ color: cellValue === "0" ? 'red' : '' }}>
                      {cellValue}
                    </td>
                  );
                })}
                <td>
                  {buttonData.includes('edit') && (
                    <button
                      onClick={() => handleModalEdit(value.id)}
                      type="button"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      style={{ marginRight: '8px' }} // Adding margin to the right for spacing
                    >
                      Edit
                    </button>
                  )}
                  {buttonData.includes('delete') && (
                    <a
                      onClick={() => handleModalDelete(value.id)}
                      href="#"
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
                      style={{ marginLeft: '8px' }} // Adding margin to the left for spacing
                    >
                      Delete
                    </a>
                  )}
                  {buttonData.includes('restore') && (
                    <a
                      onClick={() => handleRestore(value.id)}
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      style={{ marginLeft: '8px' }} // Adding margin to the left for spacing
                    >
                      Restore
                    </a>
                  )}
                  {buttonData.includes('permanent-delete') && (
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      style={{ marginLeft: '8px' }} // Adding margin to the left for spacing
                    >
                      Permanent-delete
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ModalDelete isOpen={isOpenModalDelete} closeModal={() => setIsOpenModalDelete(false)} endpoint={endpointReplaced} columnDetail={columnDetail} />
      <ModalEdit isOpen={isOpenModalEdit} closeModal={() => setIsOpenModalEdit(false)} judulModal={judulModalEdit} inputData={inputData} endpoints={endpointReplaced} />
      <ModalAdd isOpen={isOpenModalAdd} closeModal={() => setIsOpenModalAdd(false)} judulModal={judulModalEdit} inputData={inputData} endpoints={endpointReplaced} />
    </>
  );
}
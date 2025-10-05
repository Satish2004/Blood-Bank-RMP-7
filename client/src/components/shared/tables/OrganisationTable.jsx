import React from "react";
import moment from "moment";

import PropTypes from "prop-types";

export default function OrganisationTable({ data = [], heading, onDelete }) {
  return (
    <div className="flex md:pl-64 m-8 flex-col">
      <h1 className="flex items-center justify-center text-white mb-4 font-serif text-4xl md:text-6xl font-bold bg-gradient-to-b from-red-600 to-pink-300 mx-8 rounded-lg py-3">
        {heading}
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Organisation Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Address
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time & Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.length > 0 ? (
              data.map((org) => (
                <tr key={org._id}>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {org.organisationName || org.name || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {org.email || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {org.phone || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {org.address || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {org.updatedAt
                      ? moment(org.updatedAt).format("DD/MM/YYYY hh:mm A")
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm text-right">
                    <button
                      onClick={() => onDelete(org._id)}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-6 text-gray-500 font-semibold"
                >
                  No Organisation Data Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

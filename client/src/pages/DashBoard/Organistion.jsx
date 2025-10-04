import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import OrganisationTable from "../../components/shared/tables/OrganisationTable";
import API from "../../services/API";

import { useSelector } from "react-redux";

const Organisation = () => {
  const [organisations, setOrganisations] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user?._id) return;

    const fetchOrganisations = async () => {
      try {
        let response;

        // Donor fetches organisations
        if (user.role === "donar") {
          response = await API.get(`/inventory/get-organisation`, {
            params: { userId: user._id },
          });
        }

        // Hospital fetches organisations
        if (user.role === "hospital") {
          response = await API.get(`/inventory/get-organisation-for-hospital`, {
            params: { userId: user._id },
          });
        }

        if (response?.data?.success) {
          setOrganisations(response.data.organisations);
        }
      } catch (error) {
        console.error("Error fetching organisations:", error);
      }
    };

    fetchOrganisations();
  }, [user]);

  return (
    <Layout>
      <OrganisationTable data={organisations} heading="Organisation Records" />
    </Layout>
  );
};

export default Organisation;

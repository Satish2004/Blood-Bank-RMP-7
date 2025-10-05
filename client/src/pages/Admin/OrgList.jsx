import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import OrganisationTable from "../../components/shared/tables/OrganisationTable";
import API from "../../services/API";
import { toast } from "react-toastify";

const OrgList = () => {
  const [organisations, setOrganisations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrganisations = async () => {
    try {
      const res = await API.get("/admin/organisation-list");
      if (res.data?.success) {
        setOrganisations(res.data.organisationData || []);
      } else {
        toast.error("Failed to fetch organisation data");
      }
    } catch (error) {
      console.error("Error fetching organisations:", error);
      toast.error("Server error fetching organisation data");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this organisation?"))
      return;
    try {
      const res = await API.delete(`/admin/delete-user/${id}`);
      if (res.data?.success) {
        toast.success(res.data.message);
        setOrganisations((prev) => prev.filter((o) => o._id !== id));
      }
    } catch (error) {
      console.error("Error deleting organisation:", error);
      toast.error("Failed to delete organisation");
    }
  };

  useEffect(() => {
    fetchOrganisations();
  }, []);

  return (
    <Layout>
      {loading ? (
        <p className="text-center text-2xl mt-8">Loading...</p>
      ) : (
        <OrganisationTable
          data={organisations}
          heading="Organisation Records"
          onDelete={handleDelete}
        />
      )}
    </Layout>
  );
};

export default OrgList;

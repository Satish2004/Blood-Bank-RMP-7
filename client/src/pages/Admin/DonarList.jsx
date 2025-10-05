import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import API from "../../services/API";
import Layout from "../../components/shared/Layout/Layout";
import TableForAdmin from "../../components/shared/tables/TableForAdmin";
import Spinner from "../../components/shared/Spinner";
import { toast } from "react-toastify";

const DonarList = () => {
  const { loading, user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);

  // ✅ Fetch Donor Data
  const getDonarData = async () => {
    try {
      const { data } = await API.get("/admin/donar-list");
      console.log("✅ Donar data response:", data);

      if (data?.success) {
        setData(data.donarData);
      } else {
        toast.error("Failed to fetch donor data");
      }
    } catch (error) {
      console.error("❌ Error fetching donors:", error);
      toast.error("Server error fetching donor list");
    }
  };

  useEffect(() => {
    getDonarData();
  }, []);

  return (
    <Layout>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="md:pl-64">
            <h1 className="flex mt-8 items-center text-black mb-2 justify-center font-serif text-6xl font-bold mx-8 py-2 rounded-lg">
              Welcome Admin {user?.name}
            </h1>
          </div>
          <TableForAdmin data={data} list="Donar List" />
        </>
      )}
    </Layout>
  );
};

export default DonarList;

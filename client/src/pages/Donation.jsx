import React, { useEffect, useState } from "react";
import Layout from "../components/shared/Layout/Layout";
import { useSelector } from "react-redux";
import API from "../services/API";
import ConsumerAndDonationTable from "../components/shared/tables/ConsumerAndDonationTable";
import { toast } from "react-toastify";

const Donation = () => {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch donation/inventory records
  const getDonationData = async () => {
    if (!user?._id) return;

    try {
      setLoading(true);

      const res = await API.get("/inventory/get-inventory-hospital", {
        params: {
          userId: user._id, // Current logged-in user
          inventoryType: "in", // "in" means donations received
        },
      });

      if (res.data?.success) {
        // Backend should return inventory array
        setData(res.data.inventory || []);
      } else {
        toast.error("Failed to fetch donation records");
      }
    } catch (error) {
      console.error("Error fetching donation records:", error);
      toast.error("Server error fetching donation records");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDonationData();
  }, [user]);

  return (
    <Layout>
      {loading ? (
        <p className="text-center text-2xl mt-8">Loading donation records...</p>
      ) : data.length === 0 ? (
        <p className="text-center text-xl mt-8 text-gray-500">
          No donations found.
        </p>
      ) : (
        <ConsumerAndDonationTable data={data} heading="Donation Records" />
      )}
    </Layout>
  );
};

export default Donation;

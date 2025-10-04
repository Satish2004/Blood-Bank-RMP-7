import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/API";
import { useSelector } from "react-redux";
import ConsumerAndDonationTable from "../../components/shared/tables/ConsumerAndDonationTable";

const Donation = () => {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);

  const getConsumerData = async () => {
    if (!user?._id) return;

    try {
      const { data } = await API.get("/inventory/get-inventory-hospital", {
        params: {
          userId: user._id,
          inventoryType: "in", // only donations
        },
      });

      if (data?.success) {
        setData(data.inventory);
      }
    } catch (error) {
      console.error("Error fetching donation records:", error);
    }
  };

  useEffect(() => {
    getConsumerData();
  }, [user]);

  return (
    <Layout>
      <ConsumerAndDonationTable data={data} heading="Donation Records" />
    </Layout>
  );
};

export default Donation;

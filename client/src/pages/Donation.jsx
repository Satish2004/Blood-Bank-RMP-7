import React, { useEffect, useState } from "react";
import Layout from "../components/shared/Layout/Layout";
import { useSelector } from "react-redux";
import API from "../services/API";
import ConsumerAndDonationTable from "../components/shared/tables/ConsumerAndDonationTable";

const Donation = () => {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);

  const getConsumerData = async () => {
    try {
      const { data } = await API.get("/inventory/get-inventory-hospital", {
        params: {
          userId: user._id,
          inventoryType: "in",
          donar: user._id,
        },
      });

      if (data?.success) {
        setData(data.inventory);
      }
    } catch (error) {
      console.error("Error fetching inventory:", error);
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

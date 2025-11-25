import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { viewedService } from '../../redux/reducers/serviceReducer';

function RecentService() {
  const dispatch = useDispatch();
  const { recentView = [], loading, error } = useSelector((state) => state.service);

  useEffect(() => {
    // async function ব্যবহার করে dispatch করা
    const fetchRecent = async () => {
      try {
        await dispatch(viewedService()).unwrap();
      } catch (err) {
        console.error("Failed to fetch recent services:", err);
      }
    };

    fetchRecent();
  }, [dispatch]); // শুধু প্রথমবার load হওয়ার জন্য dependency array

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Recently Viewed Services</h2>
      {recentView.length === 0 ? (
        <p>No recent services found.</p>
      ) : (
        <ul className="space-y-3">
          {recentView.map((service) => (
            <li key={service._id} className="p-3 border rounded-md shadow hover:bg-gray-50 transition">
              <h3 className="font-bold">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RecentService;

import React from "react";

function Earning() {
  // Dummy data
  const totalEarnings = 35000;
  const todayEarnings = 1200;
  const monthlyEarnings = 8500;

  const recentTransactions = [
    { id: 1, service: "AC Repair", amount: 1200, date: "2025-10-06" },
    { id: 2, service: "Plumbing", amount: 800, date: "2025-10-05" },
    { id: 3, service: "Cleaning", amount: 1500, date: "2025-10-04" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Page Title */}
        <h2 className="text-2xl font-bold text-gray-700">Earnings Dashboard</h2>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-xl shadow text-center hover:shadow-lg transition">
            <h3 className="text-gray-500 text-sm">Total Earnings</h3>
            <p className="text-xl font-semibold text-gray-800 mt-2">৳{totalEarnings}</p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow text-center hover:shadow-lg transition">
            <h3 className="text-gray-500 text-sm">Today's Earnings</h3>
            <p className="text-xl font-semibold text-gray-800 mt-2">৳{todayEarnings}</p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow text-center hover:shadow-lg transition">
            <h3 className="text-gray-500 text-sm">This Month</h3>
            <p className="text-xl font-semibold text-gray-800 mt-2">৳{monthlyEarnings}</p>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <h3 className="text-lg font-semibold text-gray-700 p-5 border-b">Recent Transactions</h3>
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100 text-gray-500 uppercase text-xs">
              <tr>
                <th className="p-3 border-b">#</th>
                <th className="p-3 border-b">Service</th>
                <th className="p-3 border-b">Amount</th>
                <th className="p-3 border-b">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50">
                  <td className="p-3 border-b text-gray-700">{t.id}</td>
                  <td className="p-3 border-b text-gray-700">{t.service}</td>
                  <td className="p-3 border-b font-medium text-gray-800">৳{t.amount}</td>
                  <td className="p-3 border-b text-gray-700">{t.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Earning;



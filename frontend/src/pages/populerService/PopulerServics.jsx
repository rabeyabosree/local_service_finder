import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { populerService } from '../../redux/reducers/serviceReducer';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function PopulerServices() {
  const dispatch = useDispatch();
  const { populerServices = [] } = useSelector((state) => state.service);

  useEffect(() => {
    dispatch(populerService());
  }, [dispatch]);

  return (
    <section className="max-w-7xl mx-auto px-5 py-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Popular Services
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {populerServices.length === 0 ? (
          <p className="text-gray-500 text-center col-span-full">
            No services available.
          </p>
        ) : (
          populerServices.map((service) => (
            <Link
              key={service._id}
              to={`/service/${service._id}`}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1 duration-300 overflow-hidden"
            >
              <div className="relative w-full h-48">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4 flex flex-col justify-between h-48">
                <div>
                  <h3 className="font-semibold text-lg text-gray-800 mb-1">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2 truncate">
                    {service.description}
                  </p>
                  <p className="text-xs text-gray-400">
                    {service.location}
                  </p>
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <span className="font-bold text-green-600">৳{service.price}</span>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <FaStar className="w-4 h-4" />
                    <span className="text-sm">{service.averageRating || 0}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-3">
                  <img
                    src={service.provider.avatar}
                    alt={service.provider.name}
                    className="w-8 h-8 rounded-full border border-gray-200"
                  />
                  <p className="text-xs text-gray-600 truncate">
                    {service.provider.name}
                  </p>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </section>
  );
}

export default PopulerServices;


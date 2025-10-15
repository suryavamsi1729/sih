import React from "react";

interface SamratData {
  latitude_deg: number;
  H_m: number;
  B_m: number;
  Hy_m: number;
  gnomon_angle_deg: number;
}

const SamratYantraView: React.FC = () => {
  const data: SamratData = {
    latitude_deg: 27,
    H_m: 2,
    B_m: 3.9252210110103,
    Hy_m: 4.40537852917053,
    gnomon_angle_deg: 27,
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-primary border border-border rounded-[8px] text-white min-h-screen">
      {/* Table Section */}
      <div className="md:w-1/2 bg-gray-900 rounded-2xl shadow-lg p-6 flex flex-col justify-center">
        <h2 className="text-2xl font-semibold mb-4 text-center text-white">
          Samrat Yantra Data
        </h2>
        <table className="w-full text-left border-collapse border border-gray-700">
          <thead>
            <tr className="bg-gray-800">
              <th className="p-2 border border-gray-700">Latitude (°)</th>
              <th className="p-2 border border-gray-700">H (m)</th>
              <th className="p-2 border border-gray-700">B (m)</th>
              <th className="p-2 border border-gray-700">Hy (m)</th>
              <th className="p-2 border border-gray-700">Gnomon Angle (°)</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center hover:bg-gray-800 transition-colors">
              <td className="p-2 border border-gray-700">{data.latitude_deg}</td>
              <td className="p-2 border border-gray-700">{data.H_m}</td>
              <td className="p-2 border border-gray-700">{data.B_m.toFixed(3)}</td>
              <td className="p-2 border border-gray-700">{data.Hy_m.toFixed(3)}</td>
              <td className="p-2 border border-gray-700">{data.gnomon_angle_deg}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Image Section */}
      <div className="md:w-1/2 bg-gray-900 rounded-2xl shadow-lg p-4 flex justify-center items-center">
        <img
          src="src/assets/samart.jpeg"
          alt="Samrat Yantra 3D Visualization"
          className="rounded-lg object-contain w-full h-auto border border-gray-700"
        />
      </div>
    </div>
  );
};

export default SamratYantraView;

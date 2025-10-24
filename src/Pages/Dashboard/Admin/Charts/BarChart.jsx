import Chart from 'react-apexcharts';

const BarChart = ({ bookingPerDate }) => {
   const dates = bookingPerDate?.map((item) => item._id) || [];
   const bookings = bookingPerDate?.map((item) => item.totalBookings) || [];

   const series = [
      {
         name: 'Bookings',
         data: bookings,
      },
   ];

   const options = {
      chart: {
         type: 'bar',
      },
      plotOptions: {
         bar: {
            distributed: true,
         },
      },
      xaxis: {
         categories: dates,
      },
      colors: [
         '#26A0FC',
         '#26E7A6',
         '#FEBC3B',
         '#FF6178',
         '#8B75D7',
         '#46B3A9',
      ],
   };

   return (
      <div>
         <Chart options={options} series={series} type="bar" />
      </div>
   );
};

export default BarChart;

import Chart from 'react-apexcharts';

const LineChart = ({ bookedVsDelivery }) => {
   const dates = bookedVsDelivery?.map((item) => item._id) || [];
   const bookings = bookedVsDelivery?.map((item) => item.totalBookings) || [];
   const totalDelivered =
      bookedVsDelivery?.map((item) => item.totalDelivered) || [];

   const series = [
      {
         name: 'Total Bookings',
         data: bookings,
      },
      {
         name: 'Total Delivered',
         data: totalDelivered,
      },
   ];

   const options = {
      chart: {
         type: 'line',
      },
      stroke: {
         curve: 'smooth',
         width: 3,
      },
      xaxis: {
         categories: dates,
         title: { text: 'Date' },
      },
      yaxis: {
         title: { text: 'Total Count' },
      },
      colors: ['#26A0FC', '#26E7A6'],
      dataLabels: { enabled: true },
      legend: {
         position: 'bottom',
      },
   };

   return <div>
      <Chart options={options} series={series} type='line' />
   </div>;
};

export default LineChart;

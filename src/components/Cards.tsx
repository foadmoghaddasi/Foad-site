import { ArrowCircleLeft } from "iconsax-react";
import Image from "../assets/images/Slide.png";

const Cards = () => {
  return (
    <div className="w-full bg-white mt-16 py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 px-4">
        {/* Card 1 */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition flex flex-col justify-between">
          <img
            src={Image}
            alt="Image"
            className="w-full h-50 object-cover rounded-lg mb-4"
          />
          <p className="text-gray-600 text-right">
            این متن مربوط به توضیحات کارت اول است. شما می‌توانید هر متنی که
            می‌خواهید در اینجا اضافه کنید. این یک نمونه متن تستی است.
          </p>
          <div className="flex justify-start mb-8">
            <ArrowCircleLeft size="32" color="#2ccce4" variant="Bulk" />
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition flex flex-col justify-between">
          <img
            src={Image}
            alt="Image"
            className="w-full h-50 object-cover rounded-lg mb-4"
          />
          <p className="text-gray-600 text-right">
            این متن مربوط به توضیحات کارت دوم است. شما می‌توانید هر متنی که
            می‌خواهید در اینجا اضافه کنید. این یک نمونه متن تستی است.
          </p>
          <div className="flex justify-start mb-8">
            <ArrowCircleLeft size="32" color="#2ccce4" variant="Bulk" />
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition flex flex-col justify-between">
          <img
            src={Image}
            alt="Image"
            className="w-full h-50 object-cover rounded-lg mb-4"
          />
          <p className="text-gray-600 text-right">
            این متن مربوط به توضیحات کارت سوم است. شما می‌توانید هر متنی که
            می‌خواهید در اینجا اضافه کنید. این یک نمونه متن تستی است.
          </p>
          <div className="flex justify-start mb-8">
            <ArrowCircleLeft size="32" color="#2ccce4" variant="Bulk" />
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition flex flex-col justify-between">
          <img
            src={Image}
            alt="Image"
            className="w-full h-50 object-cover rounded-lg mb-4"
          />
          <p className="text-gray-600 text-right">
            این متن مربوط به توضیحات کارت چهارم است. شما می‌توانید هر متنی که
            می‌خواهید در اینجا اضافه کنید. این یک نمونه متن تستی است.
          </p>
          <div className="flex justify-start mb-8">
            <ArrowCircleLeft size="32" color="#2ccce4" variant="Bulk" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;

import { useContext } from "react";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthProvider";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import ScrollToTop from "../../../hooks/ScrollToTop";
import { Rating } from "@smastrom/react-rating";
import ProductDescription from "./ProductDescription";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { BiImageAdd } from 'react-icons/bi';
import { GiPlainCircle } from 'react-icons/gi';
const ProductDetails = () => {
    const productDetails = useLoaderData()
    const {user} = useContext(AuthContext)
    const { _id ,photo } = productDetails;
    
const url = `https://99-pro-shop-server.vercel.app/review/${_id}`;
  const {data: data = [] , refetch} = useQuery({
    queryKey: ['product'],
    queryFn: async () => {
      const res = await fetch(url);
      const data = await res.json();
      return data
    }
  })
    
  const [rating, setRating] = useState(0);
 const img_hosting_token = import.meta.env.VITE_Image_Upload_token;
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

  // State to store the selected image and image URL
  const [selectedImage, setSelectedImage] = useState(null);
// const [imageURL, setImageURL] = useState('');
  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);

  };
  const handleImageDelete = () => {
  setSelectedImage(null);

};

  const onSubmit = async (data) => {
   
    try {
        toast('review uploading.....')
      if (selectedImage) {
        // Upload the image to imgBB
        const imgFormData = new FormData();
        imgFormData.append('image', selectedImage);

        const imgResponse = await fetch(img_hosting_url, {
          method: 'POST',
          body: imgFormData,
        });

        const imgData = await imgResponse.json();

        if (imgData.success) {
          const imgURL = imgData.data.display_url;

          // Construct the review data with the image URL
          const date = new Date();
          const day = date.getDate();
          const month = date.getMonth() + 1;
          const year = date.getFullYear();
          const currentDate = `${day}-${month}-${year}`;
          const hour = date.getHours();
          const minutes = date.getMinutes();
          const currentTime = `${hour}:${minutes}`;
          const time = currentTime;
          const postDate = currentDate;

          const newItem = {
            message: data.message,
            id: productDetails._id,
            photo: imgURL, // Use the stored image URL
            email: user.email,
            customerName: user.displayName,
            postTime: time,
            postDate: postDate,
            rating: rating
          };

          // Send the review data to your server
          const response = await fetch('https://99-pro-shop-server.vercel.app/review', {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify(newItem),
          });

          const result = await response.json();
          console.log(result)
            reset();   // Clear the form
            setSelectedImage(null);
            
            refetch(); // Assuming refetch is a function to refresh your data
          if (result.success) {
            reset();   // Clear the form
            
            refetch(); // Assuming refetch is a function to refresh your data
         
        } else {
            toast.error('Error adding review. Please try again.');
            toast.dismiss();
          }
        } else {
          toast.error('Error uploading the image. Please try again.');
        }
      } else {
        // Handle the case when no image is selected
        toast.error('Please select an image before submitting.');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred. Please try again later.');
      toast.dismiss();
    }
  };
    return (
        <ScrollToTop>
        <div className="bg-sky-50/80">
               <div className="2xl:container mb-2 2xl:mx-auto lg:py-8 lg:px-16 md:py-6 md:px-4 py-5 px-2 ">
            <div className=" flex justify-center items-start lg:flex-row  flex-col gap-8 ">
                {/* <!-- Description Div --> */}
                <ProductDescription 
                   productDetails={productDetails}
                > </ProductDescription>

    {/* <!-- Preview Images Div For larger Screen--> */}
                
                <div className="w-full bg-sky-100 lg:h-[30rem] sm:w-96 md:w-11/12 md:mx-auto  p-4 shadow-sm rounded-lg shadow-sky-300 lg:w-6/12 flex lg:flex-row flex-col lg:gap-8 sm:gap-6 gap-4">
                   
                    <div className=" w-full  mx-auto lg:w-6/12 carousel-container">
                        <Carousel  showArrows={true}  axis="horizontal" showThumbs={true}>
                        <div>
                            <img src={photo} />
                        </div>
                        <div>
                            <img src={photo} />
                            
                        </div>
                      </Carousel>
                    </div>
                </div>
            </div>

             <div className="flex justify-center items-star  lg:flex-row flex-col gap-8 ">
    {/* <!-- user Review show Div --> */}
               
                <div className="mt-10 h-[30rem] overflow-y-scroll bg-sky-100/50  px-4  w-full sm:w-96 md:w-11/12 md:mx-auto lg:w-8/12 items-center">
                <div className="bg-sky-100/60 shadow-lg flex justify-between  my-2 py-1 rounded-2xl items-center lg:px-8 md:px-4 px-2"> 
                        <GiPlainCircle className="text-[#B0DDEF] text-sm"/>
                          <h2 className="font-medium  tracking-wide font-[Montserrat] lg:mx-6 md:mx-3 mx-2 lg:text-xl mdLtext-lg text-md  text-pink-500">Users review in this product</h2>
                        <GiPlainCircle className="text-[#B0DDEF] text-sm"/>
                      </div>

                 { data?.map((userData) =>(

                    <div  key={userData._id} 
                     className="bg-sky-50 p-2 mb-1 rounded-md shadow-md shadow-sky-200/80">
                        <div className=" flex flex-row justify-between ">
                        <div className=" flex flex-row space-x-3">
                        <div className="block h-full " >
                            <div className="flex items-center gap-x-3">
                            <img className="inline-block h-[2.375rem] w-[2.375rem] rounded-full" src={user?.photoURL} alt="Image Description"/>
                            <div className="grow border-b border-1 border-sky-300/70">
                                <span className="block text-sm font-semibold text-gray-800 ">{userData.customerName}</span>
                             
                            </div>
                            </div>
                        </div>
                        </div>
                        <div>
                         <p className=" text-xs leading-4 text-pink-700 hover:underline hover:text-pink-500  ">{userData.postTime}</p>
                         <p className=" text-xs leading-4 text-pink-700 hover:underline hover:text-pink-500  ">{userData.postDate}</p>
                        </div>
                       
                    </div>
                    <p className=" font-normal  leading-6 text-md text-gray-600 mt-2 bg-sky-50"><span className="text-sky-500/70 text-xs">Review: </span>{userData.message}</p>
                    <div className="h-[8rem] flex justify-between items-start">
                        <img src={userData.photo} className="w-[6rem] h-[8rem] object-contain"></img>
                    <Rating
                              style={{ maxWidth: 80 }}
                              value={userData.rating}
                            />
                    </div>
                     
                    </div>
                ))} 
                {data.length === 0 && <div className="flex justify-center items-center text-sky-500/80">
                    <div>
                      <h2>No review In this product</h2>
                      <h2 >Your Feedback Matters – <span className="text-pink-500">Share Your Opinions or Inquiries</span></h2>
                    </div>
                    </div> }
                  
                </div>

              
     {/* <!-- post a review --> */}
                <div className=" w-full sm:w-96 md:w-11/12 md:mx-auto  lg:w-4/12 flex lg:flex-row flex-col lg:gap-8 sm:gap-6 gap-4">
                   <div className="w-full px-2 py-8 sm:px-6 lg:px-8 lg:py-8 mx-auto">
                    <div className="mx-auto max-w-2xl">
                        <div className="text-center">
                        
                        <div className="bg-sky-100/60 shadow-lg flex justify-between  my-2 py-1 rounded-2xl items-center lg:px-8 md:px-4 px-2"> 
                        <GiPlainCircle className="text-[#B0DDEF] text-sm"/>
                          <h2 className="font-medium  tracking-wide font-[Montserrat] lg:mx-6 md:mx-3 mx-2 lg:text-xl mdLtext-lg text-md  text-pink-500">Rate and Review</h2>
                        <GiPlainCircle className="text-[#B0DDEF] text-sm"/>
                      </div>

                        </div>
    {/* review post form */}
                        <div className="mt-1 p-2 relative z-1 bg-sky-50 border rounded-xl sm:mt-10 md:p-10 ">
                        
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Rating
                              style={{ maxWidth: 100 }}
                              value={rating}
                              onChange={setRating}
                            />
                            <div>
                            <label htmlFor="hs-feedback-post-comment-textarea-1" className="block my-2 text-sm font-medium text-sky-600/80 ">Please Share your review </label>
                            <div className="mt-1">
                                <textarea    {...register("message", { required: true })}
                              className="py-3 px-4 block w-full b bg-sky-100 order-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 sm:p-4  " placeholder="Leave your comment here..."></textarea>
                            </div>
                            </div>

                               <div className="mt-6 grid">
                             <div className="flex items-start justify-center mb-2">
                                <label htmlFor="dropzone-file"  className="flex flex-col items-center justify-center w-full h-[3rem] border-2 border-sky-200 rounded-lg cursor-pointer hover:bg-sky-100 bg-sky-50">
                                <div className="flex  items-center justify-center pt-2 pb-2 gap-2 ">
                                <h2 className="text-pink-500 font-medium text-sm">Upload</h2>
                                <BiImageAdd className="text-pink-500 "/>
                                </div>
                                <input
                                id="dropzone-file"
                                type="file"
                                {...register("image", { required: true })}
                                onChange={handleImageChange}
                                className="hidden"
                                />
                                
                            </label>
                            </div>
                            {selectedImage && (
                                <div className="mb-4 relative bg-sky-100">
                                <img
                                    src={URL.createObjectURL(selectedImage)}
                                    alt="Selected"
                                    className="w-[8rem]  h-[8rem] object-cover mx-auto "
                                />
                                <button
                                    type="button"
                                    title="change image"
                                    className="h-[1.2rem]  w-[1.2rem] text-sm rounded-sm  font-semibold bg-sky-800/70 text-white hover:bg-blue-800 shadow-sm  shadow-sky-200  absolute top-2 right-24"
                                    onClick={handleImageDelete}
                                >
                                  X
                                </button>
                                </div>
                            )}
                            {errors.image && (
                                <span className="text-pink-500 text-base mt-1">
                                Please Upload at least One Image :) .
                                </span>
                            )}
                            <button type="submit" value="Add Item" className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md font-semibold bg-sky-700/60 text-white hover:bg-sky-600/60">Submit</button>
                            </div>
                             
                        </form>
                        </div>

                    </div>
                    </div>
                </div>
            </div>
            
       
        </div> 
        </div></ScrollToTop>
    );
};

export default ProductDetails;
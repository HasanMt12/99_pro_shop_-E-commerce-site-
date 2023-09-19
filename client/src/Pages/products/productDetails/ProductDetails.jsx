import { useContext } from "react";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthProvider";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import ScrollToTop from "../../../hooks/ScrollToTop";

const ProductDetails = () => {
    const productDetails = useLoaderData()
    const {user} = useContext(AuthContext)
    const {name, price ,_id, categoryId ,photo } = productDetails;
    const [count, setCount] = useState(0);
const url = `https://99-pro-shop-server.vercel.app/review/${_id}`;
  const {data: data = [] , refetch} = useQuery({
    queryKey: ['product'],
    queryFn: async () => {
      const res = await fetch(url);
      const data = await res.json();
      return data
    }
  })
    const addCount = () => {
        setCount((prev) => prev + 1);
    };

    const minusCount = () => {
        if (count > 0) {
            setCount((prev) => prev - 1);
        }
    };

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
            <div className=" flex justify-center items-start lg:flex-row  flex-col gap-8">
                {/* <!-- Description Div --> */}

                <div className="lg:h-[30rem] bg-sky-50 p-4 shadow-sm rounded-lg shadow-sky-300 w-full sm:w-96 md:w-11/12 md:mx-auto lg:w-6/12 items-center">
                    <p className=" focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 font-normal text-base leading-4 text-gray-600">Home <span className="text-pink-500"> / </span> {categoryId} <span className="text-pink-500">/</span> {name}</p>
                    <h2 className="font-semibold lg:text-4xl text-3xl lg:leading-9 leading-7 text-pink-500 mt-4">{name}</h2>

                    <div className=" flex flex-row justify-between  mt-5">
                        {/*TO DO: I will show review average each product  */}
                        {/* <div className=" flex flex-row space-x-3">
                            
                        </div> */}
                        <p className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 font-normal text-base leading-4 text-gray-700 hover:underline hover:text-pink-500 duration-100 cursor-pointer">22 reviews</p>
                    </div>

                    <p className=" font-normal text-base leading-6 text-gray-600 mt-7">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using. Lorem Ipsum is that it has a more-or-less normal distribution of letters.</p>
                    <p className=" font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 mt-6 ">$ {price}</p>

                    <div className="lg:mt-11 mt-10">
                        <div className="flex flex-row justify-between">
                            <p className=" font-medium text-base leading-4 text-gray-600">Select quantity</p>
                            <div className="flex">
                                <span onClick={minusCount} className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer border border-gray-300 border-r-0 w-7 h-7 flex items-center justify-center pb-1">
                                    -
                                </span>
                                    <input id="counter" aria-label="input" className="border border-gray-300 h-full text-center w-14 pb-1" type="tex                               t" value={count} onChange={(e) => e.target.value} />
                                <span onClick={addCount} className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer border border-gray-300 border-l-0 w-7 h-7 flex items-center justify-center pb-1 ">
                                    +
                                </span>
                            </div>
                        </div>
                        <hr className=" bg-gray-200 w-full my-2" />
                   
                    </div>

                    <button className="focus:outline-none focus:ring-2 hover:bg-sky-300/90 focus:ring-offset-2 focus:ring-gray-800 font-medium text-base leading-4 text-sky-800/80 bg-sky-300/30 w-full py-5 lg:mt-12 mt-6">Add to shopping bag</button>
                </div>

    {/* <!-- Preview Images Div For larger Screen--> */}

                <div className="w-full lg:h-[30rem] sm:w-96 md:w-11/12 md:mx-auto bg-sky-50 p-4 shadow-sm rounded-lg shadow-sky-300 lg:w-6/12 flex lg:flex-row flex-col lg:gap-8 sm:gap-6 gap-4">
                    <div className=" w-full lg:w-8/12 px-2 bg-sky-100 flex justify-center items-center">
                        <img src={photo} alt={name} />
                    </div>
                    <div className=" w-full lg:w-4/12 grid lg:grid-cols-1 sm:grid-cols-4 grid-cols-2 gap-6">
                        <div className="bg-gray-100 flex justify-center items-center py-1">
                            <img src={photo} className="object-cover  w-[80%]"/>
                        </div>
                        <div className="bg-gray-100 flex justify-center items-center py-1">
                            <img src={photo} className="object-cover  w-[80%]" />
                        </div>
                       
                    </div>
                </div>
            </div>

             <div className="flex justify-center items-star  lg:flex-row flex-col gap-8">
    {/* <!-- user Review show Div --> */}
               
                <div className="mt-20 h-[30rem] bg-sky-100/50  px-4 overflow-y-scroll w-full sm:w-96 md:w-11/12 md:mx-auto lg:w-8/12 items-center">
                 <div className="text-sky-600/70 text-md font-semibold p-4 sticky top-0 bg-sky-100 mb-4">Users review in this product</div>
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
                    <dev className="h-[6rem] ">
                        <img src={userData.photo} className="w-[6rem] h-[8rem] object-contain"></img>
                    </dev>
                    </div>
                ))}    
                </div>

              
     {/* <!-- post a review --> */}
                <div className=" w-full sm:w-96 md:w-11/12 md:mx-auto  lg:w-4/12 flex lg:flex-row flex-col lg:gap-8 sm:gap-6 gap-4">
                   <div className="w-full px-2 py-8 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                    <div className="mx-auto max-w-2xl">
                        <div className="text-center">
                        <h2 className="text-xl text-pink-500 font-bold sm:text-3xl ">
                            Post a Review 
                        </h2>
                        </div>
    {/* review post form */}
                        <div className="mt-1 p-2 relative z-1 bg-sky-50 border rounded-xl sm:mt-10 md:p-10 ">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div>
                            <label htmlFor="hs-feedback-post-comment-textarea-1" className="block mb-2 text-sm font-medium text-sky-600/80 ">Please Share your review </label>
                            <div className="mt-1">
                                <textarea    {...register("message", { required: true })}
                              className="py-3 px-4 block w-full b bg-sky-100 order-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 sm:p-4  " placeholder="Leave your comment here..."></textarea>
                            </div>
                            </div>

                               <div className="mt-6 grid">
                             <div className="flex items-start justify-center mb-2">
                                <label htmlFor="dropzone-file"  className="flex flex-col items-center justify-center w-full h-[3rem] border-2 border-sky-200 rounded-lg cursor-pointer hover:bg-sky-100 bg-sky-50">
                                <div className="flex flex-col items-center justify-center pt-2 pb-2 ">
                                <h2 className="text-pink-500/80 font-semibold text-sm">Upload a Image</h2>
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
                                <div className="mb-4 relative">
                                <img
                                    src={URL.createObjectURL(selectedImage)}
                                    alt="Selected"
                                    className="max-w-full h-auto object-contain mx-auto "
                                />
                                <button
                                    type="button"
                                    title="change image"
                                    className="h-[2.375rem]  w-[2.375rem] rounded-full  font-semibold bg-blue-500 text-white hover:bg-blue-600 shadow-sm  shadow-sky-200  absolute top-1 right-2"
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
import { useContext } from "react";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthProvider";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";

const ProductDetails = () => {
    const productDetails = useLoaderData()
    const {user} = useContext(AuthContext)
    const {name, price ,_id, categoryId ,photo } = productDetails;
    const [count, setCount] = useState(0);
const url = `http://localhost:5000/review/${_id}`;
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
//  const [rating, setRating] = useState(0);

//   const handleStarClick = (newRating) => {
//     setRating(newRating);
//   };


const img_hosting_token = import.meta.env.VITE_Image_Upload_token;
  const { register, handleSubmit,reset , formState: { errors } } = useForm();

    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`
    // submit post
    const onSubmit = data => {
    toast.loading('Please Wait!',{style: {color: '#00cbfe', },})
         
        // get date 
    const date = new Date()
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}-${month}-${year}`;
    let hour = date.getHours()
    let minutes = date.getMinutes();
    const currentTime = `${hour}:${minutes}`
// user post time send in database
    const time = currentTime;
    const postDate = currentDate;

// image post
        const formData = new FormData();
        formData.append('image', data.image[0])
        fetch(img_hosting_url, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(imgResponse => {
            console.log(imgResponse)
            if(imgResponse.success){
                const imgURL = imgResponse.data.display_url;
                const {message } = data;
                const newItem = {message, id: productDetails._id,   photo:imgURL ,  email: user.email, customerName: user.displayName, postTime: time , postDate: postDate}
                console.log(newItem)
                  fetch('http://localhost:5000/review', {
						method: 'POST',
						headers: {
							'content-type': 'application/json'
						},
						body: JSON.stringify(newItem)
					})
					.then(res => res.json())
					.then(result =>{
						console.log(result);
                        reset()
						toast.dismiss()
                        toast.success('You added a review :)', { style: { color: '#00cbfe',}},{duration:4000});
						refetch();
					}).catch(error => console.log(error))
                refetch();
            }
        })
    };

    return (
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
                                <input id="counter" aria-label="input" className="border border-gray-300 h-full text-center w-14 pb-1" type="text" value={count} onChange={(e) => e.target.value} />
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
               
                <div className="mt-20 h-[25rem] bg-sky-100/50 p-4 overflow-y-scroll w-full sm:w-96 md:w-11/12 md:mx-auto lg:w-8/12 items-center">
                 <p className="text-sky-600/70 text-md font-semibold my-1">Users review in this product</p>
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
                                <span className="block text-sm text-gray-500">{userData.email}</span>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div>
                             <p className=" text-xs leading-4 text-pink-700 hover:underline hover:text-pink-500  ">{userData.postTime}</p>
                         <p className=" text-xs leading-4 text-pink-700 hover:underline hover:text-pink-500  ">{userData.postDate}</p>
                        </div>
                       
                    </div>
                    <p className=" font-normal text-base leading-6 text-gray-600 mt-2 bg-sky-50"><span className="text-sky-600">Review: </span> lore {userData.message}</p>
                    <dev className="h-[6rem] ">
                        <img src={userData.photo} className="w-[6rem]"></img>
                    </dev>
                    </div>
                ))}    
                </div>

              
     {/* <!-- post a review --> */}
                <div className=" w-full sm:w-96 md:w-11/12 md:mx-auto  lg:w-4/12 flex lg:flex-row flex-col lg:gap-8 sm:gap-6 gap-4">
                   <div className="w-full px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                    <div className="mx-auto max-w-2xl">
                        <div className="text-center">
                        <h2 className="text-xl text-pink-500 font-bold sm:text-3xl ">
                            Post a comment
                        </h2>
                        </div>
    {/* review post form */}
                        <div className="mt-5 p-4 relative z-1 bg-sky-50 border rounded-xl sm:mt-10 md:p-10 ">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* <div>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                key={star}
                                className={star <= rating ? 'star filled' : 'star'}
                                onClick={() => handleStarClick(star)}
                                >
                            &#9733;
                                </span>
                                
                            ))}
                            </div> */}
                            <div>
                            <label htmlFor="hs-feedback-post-comment-textarea-1" className="block mb-2 text-sm font-medium text-sky-600/80 ">Please Share your review </label>
                            <div className="mt-1">
                                <textarea    {...register("message", { required: true })}
                              className="py-3 px-4 block w-full b bg-sky-100 order-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 sm:p-4  " placeholder="Leave your comment here..."></textarea>
                            </div>
                            </div>

                            <div className="mt-6 grid">
                                
                                 <div className="flex items-start justify-center mb-2">
                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-[4rem] border-2 border-sky-200 rounded-lg cursor-pointer bg-white" >
                               
                                <div className="flex flex-col items-center justify-center pt-2 pb-2">
                                    <svg width="20" height="18" viewBox="0 0 42 39" fill="none" >
                                    <path d="M40.4711 24.5342C40.0656 24.5342 39.6767 24.6953 39.3899 24.982C39.1032 25.2687 38.9421 25.6576 38.9421 26.0631V31.2845C38.9421 32.5151 38.4532 33.6954 37.583 34.5657C36.7128 35.4359 35.5325 35.9248 34.3018 35.9248H7.69822C6.46752 35.9248 5.28724 35.4359 4.417 34.5657C3.54677 33.6954 3.05788 32.5151 3.05788 31.2845V26.0631C3.05788 25.6576 2.8968 25.2687 2.61006 24.982C2.32333 24.6953 1.93444 24.5342 1.52894 24.5342C1.12344 24.5342 0.734548 24.6953 0.447816 24.982C0.161084 25.2687 0 25.6576 0 26.0631V31.2845C0.00202387 33.3255 0.813733 35.2824 2.25699 36.7257C3.70025 38.1689 5.65714 38.9806 7.69822 38.9827H34.3018C36.3429 38.9806 38.2998 38.1689 39.743 36.7257C41.1863 35.2824 41.998 33.3255 42 31.2845V26.0631C42 25.6576 41.8389 25.2687 41.5522 24.982C41.2654 24.6953 40.8766 24.5342 40.4711 24.5342Z" fill="#6B6F86"/>
                                    <path d="M13.3559 11.3096L19.4716 5.19384V27.8986C19.4716 28.3041 19.6327 28.693 19.9195 28.9797C20.2062 29.2665 20.5951 29.4276 21.0006 29.4276C21.4061 29.4276 21.795 29.2665 22.0817 28.9797C22.3684 28.693 22.5295 28.3041 22.5295 27.8986V5.21678L28.6453 11.3325C28.7873 11.4746 28.956 11.5873 29.1416 11.6642C29.3272 11.741 29.5261 11.7806 29.727 11.7806C29.9279 11.7806 30.1268 11.741 30.3124 11.6642C30.498 11.5873 30.6667 11.4746 30.8087 11.3325C30.9508 11.1905 31.0635 11.0218 31.1404 10.8362C31.2172 10.6506 31.2568 10.4517 31.2568 10.2508C31.2568 10.0499 31.2172 9.85099 31.1404 9.66539C31.0635 9.47978 30.9508 9.31114 30.8087 9.16909L22.0861 0.446481C21.8736 0.240325 21.6096 0.095103 21.3217 0.0260223C21.0742 -0.0195292 20.8194 -0.00512474 20.5787 0.0680291C20.338 0.141183 20.1183 0.270956 19.938 0.446481L11.2154 9.14615C10.9726 9.43823 10.8473 9.8102 10.8637 10.1896C10.8802 10.569 11.0373 10.9288 11.3044 11.1987C11.5715 11.4687 11.9295 11.6296 12.3087 11.6501C12.688 11.6706 13.0612 11.5492 13.3559 11.3096Z" fill="#6B6F86"/>
                                    </svg>  
                                    <h2 className="text-pink-400/80 text-xs">Upload a Image</h2>   
                                </div>
                                <input id="dropzone-file" type="file" {...register("image", { required: true })} className="hidden" />
                            </label>
                        </div> 
                        {errors.image && (
                      <span className="text-pink-500 text-base mt-1">
                        Please Upload at least One Image :) .
                      </span>
                 )}
                            <button type="submit" value="Add Item" className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-sky-600/80 text-white hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all dark:focus:ring-offset-gray-800">Submit</button>
                            </div>
                             
                        </form>
                        </div>

                    </div>
                    </div>
                </div>
            </div>
            
       
        </div> 
        </div>
    );
};

export default ProductDetails;
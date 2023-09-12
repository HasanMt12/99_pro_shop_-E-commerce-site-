import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAdmin from "../../../hooks/useAdmin";
// import { useNavigate } from "react-router-dom";
  const img_hosting_token = import.meta.env.VITE_Image_Upload_token;
//  const imgHostKey = "7fc170eeeed4d0d447f69385bf859c8c";
const AddProducts = () => {
    const [isAdmin] = useAdmin();
    const [axiosSecure] = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm();

    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`

    const onSubmit = data => {
        const formData = new FormData();
        formData.append('image', data.image[0])
        fetch(img_hosting_url, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(imgResponse => {
            if(imgResponse.success){
                const imgURL = imgResponse.data.display_url;
                const {name, price, categoryId, productDetails} = data;
                const newItem = {name, price, categoryId, productDetails, photo:imgURL}
                console.log(newItem)
                 axiosSecure.post('/categories', newItem)
                .then(data => {
                    console.log('after posting new item', data.data)
                    if(data.data.insertedId){
                        reset();
                       toast.success('product added successfully')
                    }
                })
            }
        })

    };
    return (
        <>
        
        {isAdmin &&(
            <div className="w-full px-10">
   
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className=" w-full mb-4">
                    <label className="label">
                        <span className="label-text font-semibold">Product Name*</span>
                    </label>
                    <input type="text" placeholder="Product Name"
                        {...register("name", { required: true, maxLength: 120 })}
                        className="py-3 px-4 block w-full border-pink-300 border-2 rounded-md text-sm" />
                </div>
                <div className="flex my-4">
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Category*</span>
                        </label>
                        <select defaultValue = "Pick One" {
                            ...register("categoryId", {
                                required: true
                            })
                        }
                        className = "select select-bordered cursor-pointer py-3 px-4 block w-full border-pink-300 border-2 rounded-md " >
                            <option disabled>Pick One</option>
                            <option className="my-2 bg-pink-100 text-md cursor-pointer hover:bg-sky-400">BeautyProducts</option>
                            <option className="my-2 bg-pink-100 text-md cursor-pointer hover:bg-sky-400">HomeAndKitchen</option>
                            <option className="my-2 bg-pink-100 text-md cursor-pointer hover:bg-sky-400">PetItems</option>
                            <option className="my-2 bg-pink-100 text-md cursor-pointer hover:bg-sky-400">Gadgets</option>
                            <option className="my-2 bg-pink-100 text-md cursor-pointer hover:bg-sky-400">BabyProduct</option>
                        </select>
                    </div>
                    <div className="form-control w-full ml-4">
                        <label className="label">
                            <span className="label-text font-semibold">Price*</span>
                        </label>
                        <input type="number" defaultValue={0} {...register("price", { required: true })} placeholder="Type here" className="py-3 px-4 block w-full border-pink-300 border-2 rounded-md text-sm" />
                    </div>
                </div>
                <div className="form-control">
                <span className="">product Details*</span>
                    <textarea {...register("productDetails", { required: true })} className="textarea textarea-bordered py-3 px-4 block w-full border-pink-300 border-2 rounded-md text-sm" placeholder="Bio"></textarea>
                </div>
                 <span className="label-text">Item Image*</span>
                <div className="flex items-start justify-center w-6/12 ">
                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-[80px] border-2 border-pink-200 rounded-lg cursor-pointer bg-white" >
                               
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg width="42" height="39" viewBox="0 0 42 39" fill="none" >
                                    <path d="M40.4711 24.5342C40.0656 24.5342 39.6767 24.6953 39.3899 24.982C39.1032 25.2687 38.9421 25.6576 38.9421 26.0631V31.2845C38.9421 32.5151 38.4532 33.6954 37.583 34.5657C36.7128 35.4359 35.5325 35.9248 34.3018 35.9248H7.69822C6.46752 35.9248 5.28724 35.4359 4.417 34.5657C3.54677 33.6954 3.05788 32.5151 3.05788 31.2845V26.0631C3.05788 25.6576 2.8968 25.2687 2.61006 24.982C2.32333 24.6953 1.93444 24.5342 1.52894 24.5342C1.12344 24.5342 0.734548 24.6953 0.447816 24.982C0.161084 25.2687 0 25.6576 0 26.0631V31.2845C0.00202387 33.3255 0.813733 35.2824 2.25699 36.7257C3.70025 38.1689 5.65714 38.9806 7.69822 38.9827H34.3018C36.3429 38.9806 38.2998 38.1689 39.743 36.7257C41.1863 35.2824 41.998 33.3255 42 31.2845V26.0631C42 25.6576 41.8389 25.2687 41.5522 24.982C41.2654 24.6953 40.8766 24.5342 40.4711 24.5342Z" fill="#6B6F86"/>
                                    <path d="M13.3559 11.3096L19.4716 5.19384V27.8986C19.4716 28.3041 19.6327 28.693 19.9195 28.9797C20.2062 29.2665 20.5951 29.4276 21.0006 29.4276C21.4061 29.4276 21.795 29.2665 22.0817 28.9797C22.3684 28.693 22.5295 28.3041 22.5295 27.8986V5.21678L28.6453 11.3325C28.7873 11.4746 28.956 11.5873 29.1416 11.6642C29.3272 11.741 29.5261 11.7806 29.727 11.7806C29.9279 11.7806 30.1268 11.741 30.3124 11.6642C30.498 11.5873 30.6667 11.4746 30.8087 11.3325C30.9508 11.1905 31.0635 11.0218 31.1404 10.8362C31.2172 10.6506 31.2568 10.4517 31.2568 10.2508C31.2568 10.0499 31.2172 9.85099 31.1404 9.66539C31.0635 9.47978 30.9508 9.31114 30.8087 9.16909L22.0861 0.446481C21.8736 0.240325 21.6096 0.095103 21.3217 0.0260223C21.0742 -0.0195292 20.8194 -0.00512474 20.5787 0.0680291C20.338 0.141183 20.1183 0.270956 19.938 0.446481L11.2154 9.14615C10.9726 9.43823 10.8473 9.8102 10.8637 10.1896C10.8802 10.569 11.0373 10.9288 11.3044 11.1987C11.5715 11.4687 11.9295 11.6296 12.3087 11.6501C12.688 11.6706 13.0612 11.5492 13.3559 11.3096Z" fill="#6B6F86"/>
                                    </svg>     
                                </div>
                                <input id="dropzone-file" type="file" {...register("image", { required: true })} className="hidden" />
                            </label>
                        </div> 
                          {/* <div className="form-control w-full my-4">
                    <label className="label">
                        <span className="label-text">Item Image*</span>
                    </label>
                    <input type="file" {...register("image", { required: true })} className="file-input file-input-bordered w-full " />
                </div> */}
                <input 
                  style={{ boxShadow:  "0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0)",   }}
                  className="flex text-[#EEF2F5] my-2 cursor-pointer justify-center transition duration-200 ease-in-out transform px-5 py-1 w-30 border-b-4 border-[#df81a5] hover:border-b-2 bg-gradient-to-t from-[#cc5a86]  via-[#EA0F62] to-[#e2a1ba] rounded-2xl hover:translate-y-px "
                  type="submit" value="Add Item" />
            </form>
        </div>
        )}
        </>  
    );
};

export default AddProducts;
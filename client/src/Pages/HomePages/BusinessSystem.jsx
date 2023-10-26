
const System = () => {
  return ( 
    <div>
        <div className="grid lg:grid-cols-3 md:grid-cols-1 grid-cols-1  my-6 lg:mx-[8rem] rounded-md shadow-sm shadow-[#b4cbda] bg-[#f3f6f8] divide-x  divide-sky-400 py-6">
          
            <div className="flex justify-center items-start gap-6 pt-2 md:shadow-sm lg:shadow-none sm:shadow-sm ">
                <div>
                    <img src="https://i.ibb.co/zxkWyrx/images-removebg-preview.png" className="w-[54px] h-[54px]"></img>
                </div>
                <div className=" h-[54px] text-sm py-1">
                    <h2>FREE SHIPPING</h2>
                    <p>For all 3 products</p>
                </div>

            </div>
            <div className="flex justify-center items-start gap-6 py-2 md:shadow-sm lg:shadow-none sm:shadow-sm">
                <div>
                    <img src="https://i.ibb.co/3dkr3k1/images-removebg-preview-1.png" className="w-[54px] h-[54px]"></img>
                </div>
                <div className=" h-[54px] text-sm py-1">
                    <h2>DELIVERY ON TIME</h2>
                    <p>If good have problems</p>
                </div>

            </div>
            <div className="flex justify-center items-start gap-6  pt-2">
                <div>
                    <img src="https://i.ibb.co/4Rmn3YH/payment-removebg-preview.png"  className="w-[54px] h-[54px]"></img>
                </div>
                <div className=" h-[54px] text-sm py-1">
                    <h2>SECURE PAYMENT</h2>
                    <p>100% secure payment</p>
                </div>

            </div>

        </div>
    </div>
  );
};

export default System;
function Stats({ critere, stat, icon }) {
  return (
    <div className="flex items-cente justify-start bg-white pl-6 py-6 w-[20rem] rounded-[20px] max-[600px]:w-full">
      <div className="bg-[#2185D5] rounded-[50%] p-1 h-[5rem] w-[5rem] flex items-center justify-center">
        {icon}
      </div>
      <div className="flex flex-col ml-6">
        <span className="font-poppins text-[#888] font-normal text-[1.5rem]">
          {critere}
        </span>
        <span className="font-poppins text-[1.6rem] font-bold text-[#1B2559] ">
          {stat}
        </span>
      </div>
    </div>
  );
}

export default Stats;

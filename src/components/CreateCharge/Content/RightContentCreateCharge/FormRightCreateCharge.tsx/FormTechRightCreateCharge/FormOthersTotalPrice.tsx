function Others() {
  let ListPrice = [
    {
      Name: "Check",
      Price: "$0",
      id: 1,
    },
    {
      Name: "Cash",
      Price: "$0",
      id: 2,
    },
    {
      Name: "test",
      Price: "$0",
      id: 3,
    },
    {
      Name: "etst 2",
      Price: "$0",
      id: 4,
    },
  ];

  return (
    <div className="animate__animated animate__backInUp flex justify-center flex-col items-center py-14">
      <span className=" text-[#00bed6] font-bold  xl:text-[17px] text-[15px] xl:my-4 my-2 ">
        OTHERS PAYMENTS
      </span>
      {ListPrice.map((post) => {
        return (
          <div
            key={post.id}
            className="flex flex-col justify-center items-start 2xl:w-[270px] xl:w-[240px] w-[200px] 
            xl:h-[70px] h-[55px]  border-[1px] rounded-md border-zinc-700 xl:mb-[10px] mb-2 shadow-md"
          >
            <span className="ml-4 mb-[2px] font-semibold xl:text-[14px] text-[12px] text-[#505050]">
              {post.Name}
            </span>
            <span
              className="ml-4 font-semibold border-zinc-400  border-b-[1px] flex justify-start
              items-start w-[60px] xl:text-[14px] text-[12px]  text-[#505050]"
            >
              {post.Price}
            </span>
          </div>
        );
      })}
    </div>
  );
}
export default Others;

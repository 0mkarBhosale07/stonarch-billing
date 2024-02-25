import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex justify-center ">
        <h1 className="pt-10 text-xl font-bold">
          Stonarch Infra Construction PVT. LTD.
        </h1>
      </div>
      <div className="btn text-center mt-20">
        <Link
          href="/vehical"
          className="py-2 px-4 m-5 w-40 bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
        >
          Vehical Billing
        </Link>
        <Link
          href="/customer"
          className="py-2 px-4 m-5 bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-40 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
        >
          Customer Billing
        </Link>
      </div>
    </>
  );
}

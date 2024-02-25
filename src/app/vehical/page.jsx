"use client";

import { useEffect, useState } from "react";

const App = () => {
  const [name, setName] = useState("");
  const [cNum, setCNum] = useState("");

  const [items, setItems] = useState([
    {
      productName: "",
      quantity: 1,
      trip: 1,
      price: 0,
      totalPrice: 0,
      date: "",
      vehical: "",
    },
  ]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Dynamically import html2pdf library only on the client-side
    import("html2pdf.js").then((module) => {
      const html2pdf = module.default;
      window.html2pdf = html2pdf; // Expose html2pdf to the global scope
    });
  }, []);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newItems = [...items];
    newItems[index][name] = value;

    if (name === "quantity" || name === "price" || name === "trip") {
      newItems[index].totalPrice =
        newItems[index].quantity * newItems[index].price * newItems[index].trip;
    }

    setItems(newItems);

    const newTotalPrice = newItems.reduce(
      (acc, item) => acc + item.totalPrice,
      0
    );
    setTotal(newTotalPrice);
  };

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        productName: "",
        quantity: 1,
        trip: 1,
        price: 0,
        totalPrice: 0,
        date: "",
        vehical: "",
      },
    ]);
  };

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = dd + "/" + mm + "/" + yyyy;

  const generatePDF = () => {
    const element = document.getElementById("pdf-content");

    if (element) {
      window.html2pdf().from(element).save(`${name}-bill.pdf`);
    } else {
      console.error("Element not found.");
    }
  };

  const handlePrint = () => {
    window.print();
  };
  return (
    <>
      <div className="billing-area hide-on-print flex justify-center mt-2">
        <div className="flex flex-col justify-center px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
          <div className="self-center mb-2 text-xl font-light text-gray-800 sm:text-2xl dark:text-white">
            Stonarch Infra Construction PVT. LTD.
          </div>
          <div className="p-6 mt-8">
            <div className="flex flex-col mb-2">
              <div className=" relative ">
                <input
                  type="text"
                  id="create-account-email"
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Customer Name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>
            </div>

            <div className="flex flex-col mb-2">
              <div className=" relative ">
                <input
                  type="number"
                  id="create-account-pseudo"
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  name="pseudo"
                  placeholder="Contact Number"
                  onChange={(e) => setCNum(e.target.value)}
                  value={cNum}
                />
              </div>
            </div>

            <p className="text-white  my-5 font-bold text-center">Add</p>
            <div>
              <div className="grid grid-cols-2 gap-2 lg:grid-cols-3">
                {items.map((item, index) => (
                  <div key={index}>
                    <div className="bill my-5">
                      <div className="relative w-full lg:max-w-sm mb-2">
                        <select
                          className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
                          onChange={(e) => handleInputChange(index, e)}
                          name="productName"
                          value={item.productName}
                        >
                          <option>Select Items</option>
                          <option>{`1/2" inchi`}</option>
                          <option>{`1/2"| 1/3" inchi`}</option>
                          <option>{`3/8" inchi`}</option>
                          <option>{`1 1/2" inchi`}</option>
                          <option>{`M Sand`}</option>
                          <option>{`C Sand`}</option>
                        </select>
                      </div>
                      <div className="flex flex-col mb-2">
                        <div className="relative">
                          <input
                            type="text"
                            id={`quantity-${index}`}
                            className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                            name="vehical"
                            placeholder="Vehical No."
                            // value={item.quantity}
                            onChange={(e) => handleInputChange(index, e)}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col mb-2">
                        <div className="relative">
                          <input
                            type="number"
                            id={`quantity-${index}`}
                            className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                            name="quantity"
                            placeholder="Brass"
                            // value={item.quantity}
                            onChange={(e) => handleInputChange(index, e)}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col mb-2">
                        <div className="relative">
                          <input
                            type="number"
                            id={`quantity-${index}`}
                            className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                            name="trip"
                            placeholder="Trip"
                            // value={item.quantity}
                            onChange={(e) => handleInputChange(index, e)}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col mb-2">
                        <div className="relative">
                          <input
                            type="number"
                            id={`price-${index}`}
                            className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                            name="price"
                            placeholder="Rate"
                            // value={item.price}
                            onChange={(e) => handleInputChange(index, e)}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col mb-2">
                        <div className="relative">
                          <input
                            type="date"
                            id={`quantity-${index}`}
                            className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                            name="date"
                            placeholder="Date"
                            // value={item.quantity}
                            onChange={(e) => handleInputChange(index, e)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="btn text-center">
                <button
                  onClick={handleAddItem}
                  className="py-2 px-4 bg-orange-600 hover:bg-orange-700 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                >
                  Add Item
                </button>
              </div>
            </div>

            <div className="flex w-full my-4">
              <button
                onClick={generatePDF}
                className="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
              >
                Download Bill
              </button>
            </div>
            <div className="flex w-full my-4">
              <button
                onClick={handlePrint}
                className="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
              >
                Print Bill
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr className="h-1 bg-black" />
      <div
        id="pdf-content"
        className="print-content border border-black py-2 mt-3"
      >
        {/* Your HTML content to convert to PDF goes here */}
        <div className="header text-center my-2 border border-b-2 border-black py-1">
          <p className="font-bold">STONARCH INFRA CONSTRUCTION PVT. LTD</p>
          <p>
            Unit: Gate No. 256, Nandani-Kolhapur Road, Nandani - 416102, Dist-
            Kolhapur
          </p>
          <p>Mob-9822165484</p>
          <div className="infos flex justify-between items-center px-10">
            <p className="font-bold text-sm">GST TIN No: 27AAXCS5350B1Z4</p>
            <p className="font-bold ">GST INVOICE</p>
            <p className="font-bold text-sm">TIN No: 2789142657V</p>
          </div>
        </div>
        <div className="main px-2">
          <div className="upper-section flex justify-between px-5">
            <div className="receiver">
              <p className="font-bold">Details of Receiver / Bill No.</p>
              <p>
                <span className="font-bold">Name:</span> {name}
              </p>
              <p>
                <span className="font-bold">Contact:</span> {cNum}
              </p>
            </div>
            <div className="details">
              <p className="font-bold">
                State:27 <span className="">MAHARASHTRA</span>
              </p>
            </div>
            <div className="invoice-details">
              <p className="font-bold">Invoice No:</p>
              <p>
                <span className="font-bold">Date:</span> {today}
              </p>
            </div>
          </div>
          <div className="main-bill-header flex text-center mt-1">
            <div className="srno border-2 border-black w-52 px-3 py-2">
              <p className="text-sm font-bold">S No.</p>
            </div>
            <div className="p-name font-bold border-2 border-black w-full px-3 py-2">
              <p>Date</p>
            </div>
            <div className="p-name font-bold border-2 border-black w-80 px-3 py-2">
              <p>Vehical</p>
            </div>
            <div className="p-name font-bold border-2 border-black w-full px-3 py-2">
              <p>Product</p>
            </div>
            <div className="qty font-bold border-2 border-black w-52 px-3 py-2">
              <p>Trip</p>
            </div>
            <div className="qty font-bold border-2 border-black w-52 px-3 py-2">
              <p>Brass</p>
            </div>
            <div className="rate font-bold border-2 border-black w-72 px-3 py-2">
              <p>Rate</p>
            </div>
            <div className="total font-bold border-2 border-black w-full px-3 py-2">
              <p>Total</p>
            </div>
          </div>

          {items.map((item, index) => (
            <div className="main-bill-header flex text-center" key={index}>
              <div className="srno border-x-2 border-black w-52 px-3 py-2">
                <p className="text-sm font-bold">{index + 1}</p>
              </div>
              <div className="p-name font-bold border-x-2 border-black w-full px-3 py-2">
                <p>{item.date}</p>
              </div>
              <div className="p-name font-bold border-x-2 border-black w-80 px-3 py-2">
                <p>{item.vehical}</p>
              </div>
              <div className="p-name font-bold border-x-2 border-black w-full px-3 py-2">
                <p>{item.productName}</p>
              </div>
              <div className="qty font-bold border-x-2 border-black w-52 px-3 py-2">
                <p>{item.trip}</p>
              </div>
              <div className="qty font-bold border-x-2 border-black w-52 px-3 py-2">
                <p>{item.quantity}</p>
              </div>
              <div className="rate font-bold border-x-2 border-black w-72 px-3 py-2">
                <p>{item.price}</p>
              </div>
              <div className="total border-x-2 border-black w-full px-3 py-2">
                <p>₹ {item.quantity * item.price * item.trip}</p>
              </div>
            </div>
          ))}
          <div className="footer flex">
            <div className="blank border border-black w-full px-3 py-2 ">
              <div className="stamp text-center">
                <p className="text-xs mt-1">
                  Ceritified that the particulars given above are true and
                  correct
                </p>
                <p className="text-lg mt-2 font-bold">
                  {" "}
                  Stonarch Infra Construction PVT. LTD.
                </p>
                <p className="mt-10 font-bold text-sm ">Authorised Signatory</p>
              </div>
            </div>
            <div className="footer-main border border-black w-full px-3 py-2">
              <div className="total flex ">
                <p className="border border-black w-full px-3 py-2 font-bold text-sm">
                  Sub Total:
                </p>
                <p className="border border-black w-full px-3 py-2 font-bold text-center">
                  ₹ {total.toFixed(2)}
                </p>
              </div>
              <div className="total flex ">
                <p className="border border-black border-y-0 w-full px-3 py-2 font-bold text-sm">
                  Taxable Amount:
                </p>
                <p className="border border-black border-y-0 w-full px-3 py-2 font-bold text-center">
                  ₹ {total.toFixed(2)}
                </p>
              </div>
              <div className="total flex ">
                <p className="border border-black border-y-0 w-full px-3 py-2 font-bold text-sm">
                  2.5% CGST:
                </p>
                <p className="border border-black border-y-0 w-full px-3 py-2 font-bold text-center">
                  ₹ {((total * 2.5) / 100).toFixed(2)}
                </p>
              </div>
              <div className="total flex ">
                <p className="border border-black border-y-0 w-full px-3 py-2 font-bold text-sm">
                  2.5% SGST:
                </p>
                <p className="border border-black border-y-0 w-full px-3 py-2 font-bold text-center">
                  ₹ {((total * 2.5) / 100).toFixed(2)}
                </p>
              </div>
              <div className="total flex ">
                <p className="border border-black border-y-0 w-full px-3 py-2 font-bold text-sm">
                  IGST:
                </p>
                <p className="border border-black border-y-0 w-full px-3 py-2 font-bold text-center">
                  ₹ 0.00
                </p>
              </div>
              <div className="total flex ">
                <p className="border border-black w-full px-3 py-2 font-bold text-sm">
                  Grand Total:
                </p>
                <p className="border border-black w-full px-3 py-2 font-bold text-center">
                  ₹ {(total + (total * 5) / 100).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* ... */}
      </div>
    </>
  );
};

export default App;

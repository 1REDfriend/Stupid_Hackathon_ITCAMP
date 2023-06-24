import { useState } from "react";
import "./App.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function App() {
  const rewards = ["รางวัลที่1", "3 ตัวหน้า", "3 ตัวท้าย", "2 ตัวหลัง"];
  const [dataTable, setDataTable] = useState([
    { id: 0, reward: "รางวัลที่ 1", lottery: "XXXX", price: 60000 },
    { id: 1, reward: "3 ตัวหน้า", lottery: "XXX", price: 10000 },
    { id: 2, reward: "3 ตัวท้าย", lottery: "XXX", price: 10000 },
    { id: 3, reward: "2 ตัวหลัง", lottery: "XX", price: 10000 },
  ]);
  const [num, setNum] = useState(null);
  const [userLottery, setUserLottery] = useState("");
  const [newLottery, setNewLottery] = useState("");
  const [randomNumber, setRandomNumber] = useState(null);

  const MySwal = withReactContent(Swal);

  const handleChange = (e) => {
    const value = e.target.value;
    setUserLottery(value);
  };

  const handleClick = () => {
    const num = Math.floor(Math.random() * 4);
    if (userLottery.length != 6 || isNaN(userLottery)) {
      MySwal.fire({
        title: <strong>โปรดใส่ตัวเลขที่ถูกต้อง</strong>,
        html: <p>หวยต้องเป็นตัวเลข และมี 6 ตัว</p>,
        icon: "error",
      });
      return;
    }
    setNum(num);

    // if (num == 3) {
    //   const lastTwo = userLottery.slice(-2);
    //   setNewLottery(lastTwo);
    //   console.log(userLottery);
    // }
    // if (num == 2) {
    //   const lastThree = userLottery.slice(-3);
    //   setNewLottery(lastThree);
    // }
    // if (num == 1) {
    //   const firstThree = userLottery.slice(0, 3);
    //   setNewLottery(firstThree);
    // }
    // if (num == 0) {
    //   setNewLottery(userLottery);
    // }

    // Update DataTable
    setDataTable(
      dataTable.map((data) =>
        data.id == num ? { ...data, lottery: userLottery } : { ...data }
      )
    );

    MySwal.fire({
      title: <strong>ยินดีด้วย!</strong>,
      html: <i>คุณถูกรางวัล</i>,
    });
  };

  return (
    <>
      <h1 className="text-red-600">หวยจ้า</h1>
      <div className="card">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="lottery"
          >
            กรอกเลยจ้า
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:ring-1 focus:ring-[#646cff] leading-tight focus:outline-none focus:shadow-outline"
            id="lottery"
            type="tel"
            placeholder="กรอกเลยจ้า"
            maxLength="6"
            onChange={handleChange}
          />
        </div>

        <button onClick={handleClick}>OK</button>

        {/* <h1 className="text-xl">{userLottery}</h1> */}

        {/* Table */}
        <div className="relative overflow-x-auto pt-6">
          <table className="w-full text-m text-left text-gray-500 dark:text-gray-400">
            <thead className="text-m text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  รางวัล
                </th>
                <th scope="col" className="px-6 py-3">
                  เลขที่ออก
                </th>
                <th scope="col" className="px-6 py-3">
                  เงินรางวัล
                </th>
              </tr>
            </thead>
            {/* Content Body */}
            <tbody>
              {dataTable.map((data, index) => {
                return (
                  <>
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border boder-[#646cff]"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {data.reward}
                      </th>
                      <td
                        className={
                          index == num ? "px-6 py-4 text-red-500" : "px-6 py-4"
                        }
                      >
                        {data.lottery}
                      </td>
                      <td className="px-6 py-4 font-bold">{data.price}</td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* End Table */}
      </div>
    </>
  );
}

export default App;

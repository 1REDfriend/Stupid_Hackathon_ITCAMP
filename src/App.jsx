import { useState } from "react";
import "./App.css";
import Swal from "sweetalert2";
// import ParticleEffect from './ParticlesFX';
import withReactContent from "sweetalert2-react-content";

function App() {
  const [count, setCount] = useState(0);
  const [check, setCheck] = useState(false);
  const countClick = () => {
    const button = document.getElementById("btn");
    button.classList.add("animate-wiggle");
    setTimeout(() => {
      button.classList.remove("animate-wiggle");

    }, 300);
    setTimeout(() => {
      button.classList.remove("hidden");
    }, 1000)

    setCount((count) => count + 1);
    if (count == 19 && check == false) {
      MySwal.fire({
        title: <strong>อย่าโลภมากเว้ย !!!</strong>,
        icon: "error",
      });
      setCheck(true);
      console.log(check);
    } else if (count >= 20 && check == true) {
      button.classList.add("hidden");
      setCount(0);
      setCheck(false);
      console.log(check);
    }
  };

  const [dataTable, setDataTable] = useState([
    { id: 0, reward: "รางวัลที่ 1", lottery: "XXXX", price: 6000000 },
    { id: 1, reward: "3 ตัวหน้า", lottery: "XXX", price: 4000 },
    { id: 2, reward: "3 ตัวท้าย", lottery: "XXX", price: 4000 },
    { id: 3, reward: "2 ตัวหลัง", lottery: "XX", price: 2000 },
  ]);
  const [num, setNum] = useState(null);
  const [userLottery, setUserLottery] = useState("");
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

    let newLottery;
    if (num === 3) {
      const lastTwo = userLottery.slice(-2);
      newLottery = lastTwo;
    } else if (num === 2) {
      const lastThree = userLottery.slice(-3);
      newLottery = lastThree;
    } else if (num === 1) {
      const firstThree = userLottery.slice(0, 3);
      newLottery = firstThree;
    } else {
      newLottery = userLottery;
    }
    // Update DataTable
    setDataTable(
      dataTable.map((data) =>
        data.id == num ? { ...data, lottery: newLottery } : { ...data }
      )
    );

    MySwal.fire({
      title: <strong>ยินดีด้วย!</strong>,
      html: <i>คุณถูกรางวัล <b className=" duration-700 ease-in-out text-red-500 hover:text-orange-500">{dataTable[num].reward}</b></i>,
    });
  };

  return (
    <>
      <h1 className="animation-bg-palette font-bold">หวยจ้า</h1>
      <div className="card">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="lottery"
          >
            กรอกเลยจ้า
          </label>
          <input
            className=" duration-700 ease-in-out text-center shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:ring-1 focus:ring-[#646cff] leading-tight focus:outline-none focus:shadow-outline animation-bg-palette text-lg"
            id="lottery"
            type="tel"
            placeholder="กรอกเลยจ้า"
            maxLength="6"
            onChange={handleChange}

          />
        </div>

        <button onClick={handleClick}>OK</button>
        <button
          id="btn"
          onClick={countClick}
          className=" duration-700 ease-in-out ml-4 animate-wiggle inline-block align-middle"
        >
          กดปุ่มเพื่อเสริมดวง: {count} EA
        </button>
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

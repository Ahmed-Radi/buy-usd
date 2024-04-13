"use client"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import { object, number } from 'yup';
import { useEffect, useState } from "react";

// const EGY_TO_USD_RATE = 55.5;
const formBalance = object({
  egy: number().positive().integer().required().min(100, "Minimum amount that can be changed is 100 EGP."),
  usd: number().positive().integer().required().min(1.9, "Minimum amount that can be changed is 1.9 USD."),
}).required()

export default function Home() {
  // const [total, setTotal] = useState({ egy: 0, usd: 0 });
  const [totalEgy, setTotalEgy] = useState(0);
  const [totalUsd, setTotalUsd] = useState(0);

  const { register, watch, formState: { errors } } = useForm({
    resolver: yupResolver(formBalance),
    defaultValues: {
      egy: 0,
      usd: 0,
    }
  })

  const egy = watch("egy")
  const usd = watch("usd")

  useEffect(() => {
    const result: number = egy / 45
    const addPercentage: number = result + (result * 0.1)
    const totalEGP: number = addPercentage * 50.5
    setTotalEgy(totalEGP)
  }, [egy])

  useEffect(() => {
    const result: number = usd * 51.5
    const addPercentage: number = result + (result * 0.1)
    const totalUSD: number = addPercentage
    setTotalUsd(totalUSD)
  }, [usd])

  // // Convert EGP to USD and update state
  // useEffect(() => {
  //   const usdValue = egy / EGY_TO_USD_RATE;
  //   setTotal({ egy, usd: usdValue });
  // }, [egy]);

  // // Convert USD to EGP and update state
  // useEffect(() => {
  //   const egyValue = usd * EGY_TO_USD_RATE;
  //   setTotal({ usd, egy: egyValue });
  // }, [usd]);

  /**
   * Rounds a number to the nearest 0.5. If the decimal part of the number is less than 0.5,
   * it rounds down to the nearest 0.5 (e.g., 1.2 becomes 1.5). If the decimal part is 0.5 or
   * greater, the number remains unchanged.
   *
   * @param {number} num - The number to be rounded.
   * @returns {number} The rounded number to the nearest 0.5.
   */
  function roundToNearestHalf(num: number) {
    var integerPart = Math.floor(num);
    var decimalPart = num - integerPart;

    if (decimalPart < 0.5) {
      return integerPart + 0.5;
    } else {
      return num;
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center gap-5 px-2 py-24 sm:p-24">
      <div>BUY YOUR USD</div>
      <div className="flex flex-col gap-3 w-[98%] sm:w-fit">
        <div>
          <span className="text-red-500">*</span> <span>Minimum amount that can be changed is 100 EGP.</span>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <label htmlFor="egy">EGY:</label>
          <input
            id="egy"
            min="100"
            step={1}
            value={egy}
            type="number"
            {...register("egy")}
            placeholder="Enter you EGP balance"
            className="text-black p-1 rounded-md outline-none"
          />
          <p>Total in EGY: {totalEgy.toFixed(2)}</p>
        </div>
        <span>{errors.egy?.message}</span>
        <div>
          <span className="text-red-500">*</span> <span>Minimum amount that can be changed is 1.9 USD.</span>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <label htmlFor="usd">USD:</label>
          <input
            id="usd"
            min="1.9"
            step={0.1}
            value={usd}
            type="number"
            {...register("usd")}
            placeholder="Enter you USD balance"
            className="text-black p-1 rounded-md outline-none"
          />
          <p>Total in EGY: {totalUsd.toFixed(2)}</p>
        </div>
        <span>{errors.usd?.message}</span>
      </div>
    </main>
  );
}

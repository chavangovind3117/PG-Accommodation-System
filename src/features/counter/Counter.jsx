import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, incrementByAmount } from "./counterSlice";

function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  const isActive = count !== 0;

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        Counter: {count}
        {isActive && (
          <span className="text-green-600 text-xl" title="Redux state updated!">
            ✔️
          </span>
        )}
      </h2>
      <div className="flex gap-2">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
        <button
          className="px-4 py-2 bg-purple-500 text-white rounded"
          onClick={() => dispatch(incrementByAmount(5))}
        >
          +5
        </button>
      </div>
      {isActive && (
        <div className="mt-2 text-green-700 font-semibold">
          Redux state is changing!
        </div>
      )}
    </div>
  );
}

export default Counter;

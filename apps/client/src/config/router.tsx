import { createBrowserRouter } from "react-router-dom";
import Transaction from "@/pages/Transaction";
import MainLayout from "@/layouts/MainLayout";
import SendMoney from "@/pages/SendMoney";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <SendMoney />
      },
      {
        path: 'transaction',
        element: <Transaction />,
      },
      {
        path: 'transfer',
        element: <SendMoney />,
      },
    ]
  },
])